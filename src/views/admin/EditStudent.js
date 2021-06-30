import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
 
const EditStudent = () => {
   
  let history = useHistory(); //The useHistory hook gives you access to the history instance that you may use to navigate.
  const { id } = useParams();  //The useParams() hook helps us to access the URL parameters from a current route. 
  console.log(id)
  const [student, setStudent] = useState({
    nom: "",
    prenom: "",
    email: "",
    cin: "",
    password: ""
  });
  
    //  Object Destructuring 
    const { nom, prenom, email, cin, password} = student;
 
  const onInputChange = e => {
    setStudent({ ...student,[e.target.name]: e.target.value });
  };
 
  useEffect(() => {
    loadUser();
  }, []);
 
   
  const updateStudent = async e => {
    e.preventDefault();
    await axios.put(`http://localhost:5000/utilisateur/${id}`, student);
    history.push("/admin/StudentList");
  };
 
  const loadUser =  () => {
    fetch(`http://localhost:5000/utilisateur/id/${id}`,{
            method: "GET",
          })
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
        setStudent({
                    id: id,
                    update: true,
                    nom: result.nom,
                    prenom: result.prenom,
                    email: result.email,
                    cin: result.cin,
                    password: result.password,
 
                });
            })
            .catch((error) => console.log("error", error));
  };
 
  return (
    <>
    <div className="container">
      <div className="row mt-10">
          <h4 className="text-center mb-10">Edit A Student</h4>
      </div>
      
    </div>
    <div className="container">
    <div className="row mt-12">
    <div>
      <div className="form-group mb-12">
        <input
          type="text"
          className="form-control form-control-lg"
          placeholder="Enter Product Name"
          name="nom"
          value={nom}
          onChange={(e) => onInputChange(e)}
        />
      </div>
      <div className="form-group mb-6">
        <input
          type="text"
          className="form-control form-control-lg"
          placeholder="Enter Product Price"
          name="prenom"
          value={prenom}
          onChange={(e) => onInputChange(e)}
        />
      </div>
      <div className="form-group mb-6">
        <input
          type="text"
          className="form-control form-control-lg"
          placeholder="Enter Product Description"
          name="email"
          value={email}
          onChange={(e) => onInputChange(e)}
        />
      </div>
      <div className="form-group mb-6">
        <input
          type="text"
          className="form-control form-control-lg"
          placeholder="Enter Product Description"
          name="cin"
          value={cin}
          onChange={(e) => onInputChange(e)}
        />
      </div>
      <div className="form-group mb-6">
        <input
          type="text"
          className="form-control form-control-lg"
          placeholder="Enter Product Description"
          name="password"
          value={password}
          onChange={(e) => onInputChange(e)}
        />
      </div>

      <button
        onClick={updateStudent}
        className="btn btn-secondary btn-block"
      >
        Update Student
      </button>
    </div>
  </div>
  </div>
  </>
  );
};
 
export default EditStudent;
