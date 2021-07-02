import {React,useState,useEffect} from 'react'
import PanelHeader from "components/PanelHeader/PanelHeader.js";
import axios from "axios";
import jwt from 'jwt-decode' 

export default function ListGraduationProject() {
    const token = localStorage.getItem('token');
    const decoded=jwt(token);
    const [search, setSearch] = useState("");
    const [record, setRecord] = useState([]);

  // On Page load display all records
    const loadProjects = async () => {
      var response = await fetch(`http://localhost:5000/utilisateur/projects/${decoded.id}`)
        .then(function (response) {
          return response.json();
        })
        .catch(function (err) {
          console.log("fail",err);
        });
        console.log(response);
        setRecord(response);
    };
    
   
    const AcceptProject = async (id) => { 
      await axios.post(`http://localhost:5000/pfe/accept/${id}`); 
      loadProjects();
    };
    const DeclineProject = async (id) => { 

      await axios.post(`http://localhost:5000/pfe/decline/${id}`); 
      loadProjects();
    };
     
    useEffect(() => {
      loadProjects();
    }, []);
    return (
      <>
        <PanelHeader size="sm" />
        <div class="col-sm-8">
          <h5 class="text-center  ml-4 mt-4  mb-5">List Graduation Projects</h5>
          
          <table class="table table-hover  table-striped table-bordered ml-4 ">
            <thead>
              <tr>
                <th>Graduation project's title</th>
                <th>Student</th> 
                <th>State</th> 
                <th>Accept</th>
                <th>Decline</th>
              </tr>
            </thead>
            <tbody>
              {record ? record.map((item,key) => (
                <tr key={key}>
                  <td> {item.title}</td>  
                  <td> {item.userId[0].prenom} {item.userId[0].nom} </td> 
                  <td> {item.confirmed==-1 ? "No response": item.confirmed==0 ? "Declined":"Accepted"} </td>
                  <td>
                    {item.confirmed==-1 ?
                    <a
                      className="mr-2"
                      onClick={() => {
                        const confirmBox = window.confirm(
                          "Do you really want to accept " + item.title
                        );
                        if (confirmBox === true) {
                          AcceptProject(item._id);
                        }
                      }}
                    >
                      {" "}
                      <i
                        class="fa fa-check-circle"
                        style={{ fontSize: "18px", marginRight: "5px" }}
                      ></i>{" "}
                    </a>: item.confirmed==0 ?
                    <a
                    className="mr-2"
                    onClick={() => {
                      const confirmBox = window.confirm(
                        "Do you really want to accept " + item.title
                      );
                      if (confirmBox === true) {
                        AcceptProject(item._id);
                      }
                    }}
                  >
                    {" "}
                    <i
                      class="fa fa-check-circle"
                      style={{ fontSize: "18px", marginRight: "5px" }}
                    ></i>{" "}
                  </a> :"Already accepted"}
                  </td>
                  <td>
                    {item.confirmed==-1 ?<a
                      className="text-danger mr-2"
                      onClick={() => {
                        const confirmBox = window.confirm(
                          "Do you really want to decline " + item.title
                        );
                        if (confirmBox === true) {
                          DeclineProject(item._id);
                        }
                      }}
                    >
                      {" "}
                      <i
                        class="fa fa-window-close"
                        style={{ fontSize: "18px", marginRight: "5px" }}
                      ></i>{" "}
                    </a>: item.confirmed==0 ? "Declined": 
                    <a
                    className="text-danger mr-2"
                    onClick={() => {
                      const confirmBox = window.confirm(
                        "Do you really want to decline " + item.title
                      );
                      if (confirmBox === true) {
                        DeclineProject(item._id);
                      }
                    }}
                  >
                    {" "}
                    <i
                      class="fa fa-window-close"
                      style={{ fontSize: "18px", marginRight: "5px" }}
                    ></i>{" "}
                  </a>}
                  </td>
                </tr>
              )):"No data found"}
            </tbody>
          </table>
        </div>
      </>
    );
}
