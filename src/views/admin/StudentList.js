import {React,useState,useEffect} from "react";
import { Link,Route} from 'react-router-dom';
import PanelHeader from "components/PanelHeader/PanelHeader.js";
import { loadStudentDetail } from '../../services/StudentService' 
import axios from "axios";
import  EditStudent  from './EditStudent';

function StudentList() {
  const [search, setSearch] = useState("");
  const [record, setRecord] = useState([]);

  const [student, setStudent] = useState({
    nom: "",
    prenom: "",
    email: "",
    cin: "",
  });

  //  Object Destructuring
  const { nom, prenom, email, cin } = student;
  const onInputChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  // On Page load display all records
  const loadStudentDetail = async () => {
    var response = fetch("http://localhost:5000/utilisateur/etudiants")
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        setRecord(myJson);
      });
  };
  useEffect(() => {
    loadStudentDetail();
  }, []);

  // Insert Student Records
  const submitStudentRecord = async (e) => {
    e.preventDefault();
    
    await axios.post("http://localhost:5000/utilisateur/student", student)
    .then(res =>{
       alert("Student was added successfully");
    }
    )
    .catch(err =>{
      alert("Email already exists")
    });
    setStudent({
      nom: "",
      prenom: "",
      email: "",
      cin: "",
    });
    
    loadStudentDetail();
  };

  // Search Records here
  const searchRecords = () => { 
    axios
      .get(`http://localhost:5000/utilisateur/student/${search}`)
      .then((response) => {
        setRecord(response.data);
      });
  };

  // Delete Student Record
  const deleteRecord = (Id) => {
    axios
      .delete(`http://localhost:5000/utilisateur/${Id}`)
      .then((result) => {
        loadStudentDetail();
      })
      .catch(() => {
        alert("Error in the Code");
      });
  };
  
  const banRecord = async (id) => {
    let student
    student = { banned: true}
    console.log(id)
    await axios.put(`http://localhost:5000/login/baaan/${id}`,student)
      .then((result) => {
        loadStudentDetail();
      })
      .catch(() => {
        alert("Error");
      });
  }
  return (
    <section>
      <PanelHeader size="sm" />
        <h4 className="mb-3 text-center mt-4">Student List </h4>
      <div className="container">
        <div className="row mt-4">
          <div className="col-sm-5">
            <div
              className="box p-3 mb-3 mt-5"
              style={{ border: "1px solid #d0d0d0" }}
            >
              <form onSubmit={submitStudentRecord}>
                <h5 className="mb-3 ">Insert Student </h5>
                
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control  mb-4"
                    name="prenom"
                    value={prenom}
                    onChange={(e) => onInputChange(e)}
                    placeholder="Enter first name"
                    required=""
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control  mb-4"
                    name="nom"
                    value={nom}
                    onChange={(e) => onInputChange(e)}
                    placeholder="Enter last name"
                    required=""
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control mb-4"
                    name="email"
                    value={email}
                    onChange={(e) => onInputChange(e)}
                    placeholder="Enter Email"
                    required=""
                  />
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    className="form-control mb-4"
                    name="cin"
                    value={cin}
                    onChange={(e) => onInputChange(e)}
                    placeholder="Enter CIN"
                    required=""
                  />
                </div>

                <button type="submit" className="btn btn-primary btn-block mt-4">
                  Insert 
                </button>
              </form>
            </div>
          </div>
          <div className="col-sm-12">
            <h5 className="text-center  ml-4 mt-4  mb-5">List Students</h5>
            <div className="input-group mb-4 mt-3">
              <div className="form-outline">
                <input
                  type="text"
                  id="form1"
                  onChange={(e) => setSearch(e.target.value)}
                  className="form-control"
                  placeholder="Search Student Here"
                  style={{ backgroundColor: "#ececec" }}
                />
              </div>
              <button
                type="button"
                onClick={searchRecords}
                className="btn btn-success"
              >
                <i className="fa fa-search" aria-hidden="true"></i>
              </button>
            </div>
            <table className="table table-hover table-striped table-bordered ml-4 ">
              <thead>
                <tr>
                  <th>First name</th>
                  <th>Last name</th>
                  <th>Email</th>
                  <th>CIN</th>
                  <th>Ban</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {record.map((item, key) => (
                  <tr key={key}>
                    <td> {item.prenom}</td>
                    <td style={{textTransform: 'uppercase'}}> {item.nom}</td>
                    <td> {item.email}</td>
                    <td> {item.cin}</td>
                    <td>  
                      <a
                        className="text-danger mr-2"
                        onClick={() => {
                          const confirmBox = window.confirm(
                            "Do you really want to ban " + item.prenom
                          );
                          if (confirmBox === true) {
                            banRecord(item._id);
                          }
                        }}
                      > 
                        <i
                          className="fa fa-ban"
                          style={{ fontSize: "18px", marginRight: "5px" }}
                        ></i>{" "}
                      </a>  
                      </td>
                    <td>
                       {/*  <a onClick={(() => {
                           <Route path={`/EditStudent/editID/${item._id}`} component={EditStudent} /> 
                        })()}> <i className="fa fa-edit" aria-hidden="true"></i> 
                      
                      </a> */}
                      <Link className=" mr-2" to={`/StudentDetails/${item._id}`}>
                        <i className="fa fa-eye" aria-hidden="true"></i>
                      </Link>
                      <Link
                        className=" mr-2"
                        to={`/EditStudent/editID/${item._id}`}
                      >
                        <i className="fa fa-edit" aria-hidden="true"></i>
                      </Link>
                      <a
                        className="text-danger mr-2"
                        onClick={() => {
                          const confirmBox = window.confirm(
                            "Do you really want to delete " + item.prenom
                          );
                          if (confirmBox === true) {
                            deleteRecord(item._id);
                          }
                        }}
                      > 
                        <i
                          className="far fa-trash-alt"
                          style={{ fontSize: "18px", marginRight: "5px" }}
                        ></i>{" "}
                      </a>
                      
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

export default StudentList;

