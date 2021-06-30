import React, { useState, useEffect, useCallback } from 'react'
import PanelHeader from "components/PanelHeader/PanelHeader.js"; 
import { useLocation } from "react-router-dom"
import { Table, Modal, Button, Form } from "react-bootstrap" 
import * as AiIcons from "react-icons/ai"
import axios from "axios"
import jwt from 'jwt-decode' 
import "./GraduationProject.css" 
export default function GraduationProject(props) {
    const location = useLocation()
    const token = localStorage.getItem('token');
    const decoded=jwt(token);
    const [show, setShow] = useState(false) 
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    const [pfe, setPFE] = useState({}) 
    const [error, setError] = useState("")
    const [rapport, setUploadedFile] = useState ('');
    const [title, setFileTitle] = useState (''); 
    const [professor,setProfessor] = useState([]);
    const [prof, setProf] = useState('');
    const [UpdatedFile, setUpdatedFile] = useState ('');
    const [titleUpdate, setTitleUpdate] = useState ('');
    const [profId, setprofId] = useState ('');
    const [date, setDate] = useState ('');
    
    const fetchpfe = async () => {
      const id=decoded.id;
      const res = await axios.get(`http://localhost:5000/pfe/List/${id}`)
      console.log(res.data )
      setPFE(res.data)
    }
    function getCurrentYear() {
      let newDate = new Date(); 
      let year = newDate.getFullYear();
      return `${year}`;
    }
    const fetchYear = async () => { 
      const year = getCurrentYear() 
      const res = await axios.get(`http://localhost:5000/annee/GetOne/${year.toString()}`)
      console.log(res.data )
      setDate(res.data.DateDepotPFE)
    }
    const loadProfessors = async () => {
      var response = fetch("http://localhost:5000/utilisateur/professor")
        .then(function (response) {
          return response.json();
        })
        .then(function (myJson) {
          setProfessor(myJson);
        });
    };
    function handleprofChange(e) {
      setProf(e.target.value);
      console.log(prof);
    }
    
    const suppPfe = async (id) => {
        console.log(id)
        await axios.delete(`http://localhost:5000/pfe/DeleteOne/${id}`)
        fetchpfe() 
    } 
        
    function handleUpdatedFile (e) {
      setUpdatedFile (e.target.value);
    }
    const updateProject = async e => {
        let form = document.getElementById ('formUpdate');
        let formData = new FormData (form); 
        e.preventDefault();
        try {
          await axios.put(
            `http://localhost:5000/pfe/update/${pfe._id}`,
            formData
          );
          if (res.data.type === "error") {
            alert(res.data.error);
          }
          /* fetchpfe();
          handleClose()  */
        } catch (err) {
          console.log(err);
          alert("erreur");
        }
    };
    const showUpdate = () => {  
        setTitleUpdate(pfe.title)
        setprofId(prof._id)
        handleShow() 
    }

    useEffect(() => {
      loadProfessors();
      fetchpfe()
      fetchYear()
    }, [])
  
    function handleFormSubmittion (e) {
        e.preventDefault ();
        let form = document.getElementById ('form');
        let formData = new FormData (form);
        formData.append("id",prof)
        
            axios.post(`http://localhost:5000/pfe/Create/`, formData, {
              headers: { Authorization: `Bearer ${token}` },
            }).then((response,err) =>
               console.log(response),
               setFileTitle(""),
               setUploadedFile(""),
               fetchpfe()
              ).catch(err=>{
                if(err.status!==200) { 
                alert("There was a problem adding the project to the database.")
                }
              })
      }

    function handleUploadedFile(e) {
      setUploadedFile(e.target.value);
    }
    function handleFileTitle(e) {
      setFileTitle(e.target.value);
    }
    function getCurrentDate(separator = "-") {
      let newDate = new Date();
      let date = newDate.getDate();
      let month = newDate.getMonth() + 1;
      let year = newDate.getFullYear();

      return `${year}${separator}${
        month < 10 ? `0${month}` : `${month}`
      }${separator}${date}`;
    }
    
    return (
      <React.Fragment>
        <PanelHeader size="sm" />
        <div className="pfe-container">
          <h3 className="date">
            Date: {getCurrentDate()} <br />  {date.slice(0, 10)?  <>Limit Date : { date.slice(0, 10) } </>: ""} 
          </h3>
          {getCurrentDate() < date ? (
            <>
              <Form
                onSubmit={(e) => handleFormSubmittion(e)}
                encType="multipart/form-data"
                id="form"
              >
                <legend style={{ fontFamily: "bold" }}> Ajouter votre projet de fin d'étude </legend>
                <div className="col">
                  <Form.Control
                    size="lg"
                    required
                    type="text"
                    placeholder="Graduation project title"
                    name="title"
                    onChange={handleFileTitle}
                    value={title}
                  />

                  <Form.File
                    className="position-relative"
                    required
                    name="rapport"
                    value={rapport}
                    onChange={handleUploadedFile}
                  />
                  <br />
                  <Form.Control
                    as="select"
                    required
                    onChange={handleprofChange}
                    className="browser-default custom-select"
                  >
                    {professor.map((item, key) => (
                      <option key={key} value={item._id}>
                        {item.nom} {item.prenom}
                      </option>
                    ))}
                  </Form.Control>
                </div>
                <br />
                <Button type="submit" variant="primary">
                  Add
                </Button>
                &nbsp;&nbsp;&nbsp;
                <Button
                  variant="warning"
                  type="reset"
                  onClick={() => {
                    setFileTitle("");
                    setUploadedFile("");
                  }}
                >
                  Cancel
                </Button>
                <br></br>
                <br></br>
              </Form>{" "}
            </>
          ) : (
            <h3>Sorry, you can't deposit.</h3>
          )}

          <br />
          <br />
          <Table size="lg" bordered bordered variant="dark">
            <thead>
              <tr>
                <th scope="col"> Name</th>
                <th scope="col"> Graduation project report</th>
                <th scope="col"> Confirmed</th>
                {getCurrentDate() < date && <th scope="col"> Update</th>}
                <th scope="col"> Delete</th>
              </tr>
            </thead>
            {pfe && (
              <tbody>
                <tr>
                  <td> {pfe.title}</td>
                  <td> {pfe.rapport}</td>
                  <td>
                    {(() => {
                      if (pfe.confirmed == 1) {
                        return "Yes";
                      } else if (pfe.confirmed == 0) {
                        return "No";
                      } else {
                        return "Not yet";
                      }
                    })()}
                  </td>
                  {getCurrentDate() < date && (
                    <td>
                      <span
                        style={{ fontSize: "18px" }}
                        onClick={() => showUpdate()}
                      >
                        <AiIcons.AiFillEdit />
                      </span>
                    </td>
                  )}
                  <td>
                    <span
                      onClick={() => {
                        const confirmBox = window.confirm(
                          "Do you really want to delete " + pfe.title
                        );
                        if (confirmBox === true) {
                          suppPfe(pfe._id);
                        }
                      }}
                    >
                      <i className="far fa-trash-alt"></i>
                    </span>
                  </td>
                </tr>
              </tbody>
            )}
          </Table>
          <Modal show={show} onHide={handleClose} size="lg" centered>
            <Modal.Header closeButton>
              <Modal.Title>Update Graduation project</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form
                onSubmit={(e) => updateProject(e)}
                encType="multipart/form-data"
                id="formUpdate"
              >
                <div className="col">
                  <Form.Control
                    size="lg"
                    type="text"
                    placeholder="Graduation project title"
                    name="titleUpdate"
                    defaultValue={titleUpdate}
                  />

                  <Form.File
                    className="position-relative"
                    required
                    name="UpdatedFile"
                    defaultValue={UpdatedFile}
                    onChange={handleUpdatedFile}
                  />
                  <br />
                  <Form.Control
                    as="select"
                    required
                    name="profId"
                    defaultValue={profId}
                    className="browser-default custom-select"
                  >
                    {professor.map((item, key) => (
                      <option key={key} value={item._id}>
                        {item.nom} {item.prenom}
                      </option>
                    ))}
                  </Form.Control>
                </div>
                <br />
                <Button type="submit" variant="primary">
                  Add
                </Button>
                &nbsp;&nbsp;&nbsp;
                <Button
                  variant="warning"
                  type="reset"
                  onClick={() => {
                    setUpdatedFile("");
                    setTitleUpdate("");
                  }}
                >
                  Cancel
                </Button>
                <br></br>
                <br></br>
                {error && (
                  <div
                    className="error"
                    style={{
                      color: "red",
                      fontWeight: "bold",
                      fontFamily: "monospace",
                      fontSize: "17px",
                    }}
                    severity="error"
                    onClick={() => setError(null)}
                  >
                    {props.error || error}
                  </div>
                )}
              </Form>
            </Modal.Body>
          </Modal>
        </div>
      </React.Fragment>
    );
}
