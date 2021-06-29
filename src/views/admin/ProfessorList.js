/* import React from "react"; 
// reactstrap components
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";

// core components
import PanelHeader from "components/PanelHeader/PanelHeader.js";

import { thead, tbody } from "variables/general";  */
import {React,useState,useEffect} from "react";
import { Link} from 'react-router-dom';
import PanelHeader from "components/PanelHeader/PanelHeader.js"; 
import axios from "axios";

function ProfessorList() {
  const [search, setSearch] = useState("");
  const [record, setRecord] = useState([]);

  const [professor, setProfessor] = useState({
    nom: "",
    prenom: "",
    email: "",
    cin: "",
  });

  //  Object Destructuring
  const { nom, prenom, email, cin } = professor;
  const onInputChange = (e) => {
    setProfessor({ ...professor, [e.target.name]: e.target.value });
  };

  // On Page load display all records
  const loadProfessorDetail = async () => {
    var response = fetch("http://localhost:5000/utilisateur/professor")
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        setRecord(myJson);
      });
  };
  useEffect(() => {
    loadProfessorDetail();
  }, []);

  // Insert professor Records
  const submitProfessorRecord = async (e) => {
    e.preventDefault();
    e.target.reset();
    await axios.post("http://localhost:5000/utilisateur/professor", professor);
    alert("Data Inserted");

    loadProfessorDetail();
  };

  // Search Records here
  const searchRecords = () => {
     
    axios
      .get(`http://localhost:5000/utilisateur/prof/${search}`)
      .then((response) => {
        setRecord(response.data);
      });
  };

  // Delete professor Record
  const deleteRecord = (Id) => {
    axios
      .delete(`http://localhost:5000/utilisateur/${Id}`)
      .then((result) => {
        loadprofessorDetail();
      })
      .catch(() => {
        alert("Error in the Code");
      });
  };

  return (
    /*{ <>
      <PanelHeader size="sm" />
      <div className="content">
        <Row>
          <Col xs={12}>
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Simple Table</CardTitle>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      {thead.map((prop, key) => {
                        if (key === thead.length - 1)
                          return (
                            <th key={key} className="text-right">
                              {prop}
                            </th>
                          );
                        return <th key={key}>{prop}</th>;
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {tbody.map((prop, key) => {
                      return (
                        <tr key={key}>
                          {prop.data.map((prop, key) => {
                            if (key === thead.length - 1)
                              return (
                                <td key={key} className="text-right">
                                  {prop}
                                </td>
                              );
                            return <td key={key}>{prop}</td>;
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
           
        </Row>
      </div>
    </> }*/
    <section>
      <PanelHeader size="sm" /> 
      <div class="container">
        
        <div class="row mt-3">
          <div class="col-sm-5">
            <div
              className="box p-3 mb-3 mt-5"
              style={{ border: "1px solid #d0d0d0" }}
            >
              <form onSubmit={submitProfessorRecord}>
                <h5 className="mb-3 ">Insert Professor </h5>
                <div class="form-group">
                  <input
                    type="text"
                    class="form-control  mb-4"
                    name="nom"
                    value={nom}
                    onChange={(e) => onInputChange(e)}
                    placeholder="Enter name"
                    required=""
                  />
                </div>

                <div class="form-group">
                  <input
                    type="text"
                    class="form-control  mb-4"
                    name="prenom"
                    value={prenom}
                    onChange={(e) => onInputChange(e)}
                    placeholder="Enter Sirname"
                    required=""
                  />
                </div>

                <div class="form-group">
                  <input
                    type="text"
                    class="form-control mb-4"
                    name="email"
                    value={email}
                    onChange={(e) => onInputChange(e)}
                    placeholder="Enter Email"
                    required=""
                  />
                </div>

                <div class="form-group">
                  <input
                    type="text"
                    class="form-control mb-4"
                    name="cin"
                    value={cin}
                    onChange={(e) => onInputChange(e)}
                    placeholder="Enter cin"
                    required=""
                  />
                </div>

                <button type="submit" class="btn btn-primary btn-block mt-4">
                  Insert{" "}
                </button>
              </form>
            </div>
          </div>
          <div class="col-sm-10">
            <h5 class="text-center  ml-4 mt-4  mb-5">List Professors</h5>
            <div class="input-group mb-4 mt-3">
              <div class="form-outline">
                <input
                  type="text"
                  id="form1"
                  onChange={(e) => setSearch(e.target.value)}
                  class="form-control"
                  placeholder="Search professor Here"
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
            <table class="table table-hover  table-striped table-bordered ml-6 ">
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Prenom</th>
                  <th>Email</th>
                  <th>cin</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {record.map((item, key) => (
                  <tr value={key}>
                    <td> {item.nom}</td>
                    <td> {item.prenom}</td>
                    <td> {item.email}</td>
                    <td> {item.cin}</td>
                    <td >
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
                          class="far fa-trash-alt"
                          style={{ fontSize: "18px", marginRight: "5px" }}
                        ></i> 
                      </a>

                      <Link
                        class=" mr-2"
                        to={`/EditProfessor/editID/${item._id}`}
                      >
                        <i class="fa fa-edit" aria-hidden="true"></i>
                      </Link>
                      <Link class=" mr-2" to={`/ProfessorDetails/${item._id}`}>
                        <i class="fa fa-eye" aria-hidden="true"></i>
                      </Link>
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

export default ProfessorList;
