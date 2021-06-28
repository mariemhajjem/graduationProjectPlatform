import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
 
const EditProfessor = () => {
   
  let history = useHistory(); //The useHistory hook gives you access to the history instance that you may use to navigate.
  const { id } = useParams();  //The useParams() hook helps us to access the URL parameters from a current route. 
  console.log(id)
  const [professor, setProfessor] = useState({
    nom: "",
    prenom: "",
    email: "",
    cin: "", 
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
    await axios.put(`http://localhost:5000/utilisateur/${id}`, professor);
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
        <div className="row mt-4"> 
        <div className="col-sm-5 col-offset-3 mx-auto shadow p-5">
        <h4 className="text-center mb-4">Edit A Professor</h4>
        
          <h4 className="text-success">Professor ID : {id} </h4>
          </div>
          </div>
     <div className="row mt-6"> 
      
          <div>
          <div className="form-group mb-3" >
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Product Name"
              name="nom"
              value={nom}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Product Price"
              name="prenom"
              value={prenom}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Product Description"
              name="email"
              value={email}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Product Description"
              name="cin"
              value={cin}
              onChange={e => onInputChange(e)}
            />
          </div> 
          
          <button onClick={updateProfessor} className="btn btn-secondary btn-block">Update Professor</button>
          </div>
       </div>
      </div> 
     
  );
};
 
export default EditProfessor;
