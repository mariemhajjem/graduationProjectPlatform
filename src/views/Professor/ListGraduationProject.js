import {React,useState,useEffect} from 'react'
import PanelHeader from "components/PanelHeader/PanelHeader.js";
import axios from "axios";

export default function ListGraduationProject() {
    const [search, setSearch] = useState("");
    const [record, setRecord] = useState([]);

  // On Page load display all records
    const loadProjects = async () => {
      var response = fetch("http://localhost:5000/pfe/Lists")
        .then(function (response) {
          return response.json();
        })
        .then(function (myJson) {
          setRecord(myJson);
        });
    };
    useEffect(() => {
      loadProjects();
    }, []);

    // Insert Student Records
    const submitStudentRecord = async (e) => {
      e.preventDefault();
      e.target.reset();
      await axios.post("http://localhost:5000/utilisateur/", student);
      alert("Data Inserted");

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
                <th>Titre</th>
                <th>Graduation project</th> 
                <th>Accept</th>
                <th>Decline</th>
              </tr>
            </thead>
            <tbody>
              {record.map((item) => (
                <tr>
                  <td> {item.title}</td>  
                  <td> {item.userId}</td> 
                  <td>
                    <a
                      className="text-danger mr-2"
                      onClick={() => {
                        const confirmBox = window.confirm(
                          "Do you really want to accept " + item.title
                        );
                        if (confirmBox === true) {
                          deleteRecord(item._id);
                        }
                      }}
                    >
                      {" "}
                      <i
                        class="far fa-trash-alt"
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
                          deleteRecord(item._id);
                        }
                      }}
                    >
                      {" "}
                      <i
                        class="far fa-trash-alt"
                        style={{ fontSize: "18px", marginRight: "5px" }}
                      ></i>{" "}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
}
