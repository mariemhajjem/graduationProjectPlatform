import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import { Card, CardBody } from "reactstrap"; 
const EditProfessor = () => {
   
  let history = useHistory(); //The useHistory hook gives you access to the history instance that you may use to navigate.
  const { id } = useParams();  //The useParams() hook helps us to access the URL parameters from a current route. 
  console.log(id)
  const [professor, setProfessor] = useState({
    nom: "",
    prenom: "",
    email: "",
    cin: "" 
  });
  
    //  Object Destructuring 
    const { nom, prenom, email, cin} = professor;
 
  const onInputChange = e => {
    setProfessor({ ...professor,[e.target.name]: e.target.value });
  };
 
  useEffect(() => {
    loadUser();
  }, []);
 
   
  const updateProfessor = async e => {
    e.preventDefault();
    //await axios.put(`http://localhost:5000/utilisateur/${id}`, professor);
    history.push("/admin/ProfessorList");
  };
 
  const loadUser =  () => {
    fetch(`http://localhost:5000/utilisateur/id/${id}`,{
            method: "GET",
          })
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
        setProfessor({
                    id: id,
                    update: true,
                    nom: result.nom,
                    prenom: result.prenom,
                    email: result.email,
                    cin: result.cin 
 
                });
            })
            .catch((error) => console.log("error", error));
  };
 
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
            <h5 className="title">{nom}</h5>
            <h5 className="title">{prenom}</h5> 
          </div>
          <p className="description text-center">
          {email} <br />
          </p>
          <p className="description text-center">
          {cin}<br />
          </p>
          <button onClick={updateProfessor} className="btn btn-secondary btn-block">List Professor</button>
        </CardBody>
        
      </Card>
    </div>
  );
};
 
export default EditProfessor;
