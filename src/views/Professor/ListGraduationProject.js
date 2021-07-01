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
      await axios.put("http://localhost:5000/utilisateur/"); 
      loadProjects();
    };
    const DeclineProject = async (id) => { 

      await axios.put("http://localhost:5000/utilisateur/"); 
      loadProjects();
    };
    // Search Records here
    const searchRecords = () => {
      alert(search);
      axios
        .get(`http://localhost:5000/utilisateur/${search}`)
        .then((response) => {
          setRecord(response.data);
        });
    };
    
    useEffect(() => {
      loadProjects();
    }, []);
    return (
      <>
        <PanelHeader size="sm" />
        <div class="col-sm-8">
          <h5 class="text-center  ml-4 mt-4  mb-5">List Graduation Projects</h5>
          <div class="input-group mb-4 mt-3">
            <div class="form-outline">
              <input
                type="text"
                id="form1"
                onChange={(e) => setSearch(e.target.value)}
                class="form-control"
                placeholder="Search Student Here"
                style={{ backgroundColor: "#ececec" }}
              />
            </div>
            <button
              type="button"
              onClick={searchRecords}
              class="btn btn-success"
            >
              <i class="fa fa-search" aria-hidden="true"></i>
            </button>
          </div>
          <table class="table table-hover  table-striped table-bordered ml-4 ">
            <thead>
              <tr>
                <th>Graduation project's title</th>
                <th>Student</th> 
                <th>Accept</th>
                <th>Decline</th>
              </tr>
            </thead>
            <tbody>
              {record ? record.map((item) => (
                <tr>
                  <td> {item.title}</td>  
                  <td> {item.userId[0].prenom} {item.userId[0].nom} </td> 
                  <td>
                    <a
                      className="text-danger mr-2"
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
                    </a>
                  </td>
                  <td>
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
                    </a>
                  </td>
                </tr>
              )):"No data found"}
            </tbody>
          </table>
        </div>
      </>
    );
}
