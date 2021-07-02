import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import { Card, CardBody } from "reactstrap";
 
const EditProfessor = () => {
  let history = useHistory(); //The useHistory hook gives you access to the history instance that you may use to navigate.
  const { id } = useParams();  //The useParams() hook helps us to access the URL parameters from a current route. 
  const [professor, setProfessor] = useState({
    nom: "",
    prenom: "",
    email: "",
    cin: "" 
  });
  const [record, setRecord] = useState([]);
   
  const updateProfessor = async e => {
    e.preventDefault(); 
    history.push("/admin/ProfessorList");
  };
  const loadProf = async () => {
    await fetch(`http://localhost:5000/utilisateur/user/${id}`)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setProfessor({
          id: id,
          update: true,
          nom: result.nom,
          prenom: result.prenom,
          email: result.email,
          cin: result.cin,
        });
      })
      .catch((error) => console.log("error", error));
  };
  const loadUser =  async() => {
    var response = await fetch(`http://localhost:5000/utilisateur/id/${id}`) 
          .then((res) => {
            return res.json();
          }) 
          .catch((error) => console.log("error", error));
          console.log(response);
          setRecord(response);
  };
  useEffect(() => {
    loadUser();
    loadProf();
  }, []);
  return (
    <div className="container">
      <Card className="card-user">
        <div className="image">
          <img alt="..." src={require("assets/img/bg5.jpg").default} />
        </div>
        <CardBody>
          <div className="author">
            <img
              alt="..."
              className="avatar border-gray"
              src={require("assets/img/mike.jpg").default}
            />
            <h4 className="text-center mb-4"> Professor Details</h4>
             
                <h5 className="title">
                  {professor.prenom} {professor.nom}
                </h5>
                <p className="description text-center">
                  {professor.email}
                  <br />
                </p>
               
          </div>
          <button
            onClick={updateProfessor}
            className="btn btn-secondary btn-block"
          >
            List Professor
          </button>
        </CardBody>
      </Card>
      <div className="col-sm-8">
        <h5 className="text-center  ml-4 mt-4  mb-5">
          List Graduation Projects
        </h5>

        <table className="table table-hover  table-striped table-bordered ml-4 ">
          <thead>
            <tr>
              <th>Graduation project's title</th>
              <th>Student</th>
              <th>Date of acceptance </th>
            </tr>
          </thead>
          <tbody>
            {record.map((item, key) => (
               <tr key={key}>
                <td>
                   {item.title} 
                </td>
                <td> 
                  {item.userId[0].prenom} {item.userId[0].nom}
                </td>
                <td> 
                  {item.confirmationDate.slice(0, 10)}  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>  
    </div>
  );
};
 
export default EditProfessor;
