import React, { useState, useEffect, useCallback } from 'react'
import PanelHeader from "components/PanelHeader/PanelHeader.js"; 
import { useLocation } from "react-router-dom"
import { Table, Modal, Button, Form } from "react-bootstrap" 
import * as AiIcons from "react-icons/ai"
import axios from "axios"
import jwt from 'jwt-decode'
import {useDropzone} from 'react-dropzone' 
 
export default function GraduationProject(props) {
    const location = useLocation()
    const token = localStorage.getItem('token');
    const decoded=jwt(token);
    const [show, setShow] = useState(false)
    const [pfeupdate, setPfeupdate] = useState({})
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    const [pfe, setPFE] = useState({})
    const [pfeDetails, setPfe] = useState({ rapport: ""})
    const [error, setError] = useState("")
    const [rapport, setUploadedFile] = useState ('');
    const [title, setFileTitle] = useState (''); 
    const [professor,setProfessor] = useState([]);
    const [prof, setProf] = useState('');
 
    function handleprofChange(e) {
      setProf(e.target.value);
      console.log(prof);
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
    useEffect(() => {
      loadProfessors();
    }, []);

    function handle(e) {
        const newdata = { ...pfeupdate }
        newdata[e.target.id] = e.target.value
        setPfeupdate(newdata)
        console.log(newdata)
    }
    const suppPfe = async (id) => {
        console.log(id)
        const res = await axios.delete(`http://localhost:5000/pfe/DeleteOne/${id}`)
        fetchpfe() 
    }
    const fetchpfe = async () => {
        const id=decoded.id;
        const res = await axios.get(`http://localhost:5000/pfe/List/${id}`)
        console.log(res.data )
        setPFE(res.data)
        
    }
    const { rapportUpdate, titleUpdate, profId} = pfeupdate;
    const onInputChange = e => {
        setPfeupdate({ ...pfeupdate,[e.target.name]: e.target.value });
    };
    
    const updateProject = async e => {
        let form = document.getElementById ('formUpdate');
        let formData = new FormData (form);
        formData.append("id",profId)
        e.preventDefault();
        await axios.put(`http://localhost:5000/pfe/update/${pfe._id}`, pfeupdate);
         
    };
    const update_pfe = async (e, idPfe) => {
        setPfeupdate({
            rapportUpdate : pfe.rapport,
            titleUpdate : pfe.title,
            profId : prof._id
        })
        handleShow()
        /* try {
            const res = await axios.put(`http://localhost:5000/pfe/update/${idPfe}`, request)
            if (res.data.type === "error" || res.data.type === "délais") {
                alert(res.data.error)
            }
            setPfeupdate(res.data) 
            handleClose()
        } catch (err) {
            console.log(err)
            alert("erreur")
        } */
    }
    useEffect(() => {
        fetchpfe()
    }, [])
 
    function clearData(e) {
        e.preventDefault()
        setPfe({})
    }
    
    function handle(e) {
        var file = e.target.files[0];
        var reader = new FileReader();
        reader.onload = function(event) {
            console.log( event.target.result)
        };
        reader.readAsDataURL(file);
        setPfe({ ...pfeDetails ,[e.target.id]:e.target.value})
         
    }
    const onDrop = useCallback(acceptedFiles => {
        pfeDetails.rapport = acceptedFiles
        console.log(pfeDetails.rapport  )
      }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
    
    async function add_pfe(e) {
        e.preventDefault()
        const id=decoded.id;
        let request = { 
            rapport: this.state.file,
            etudiant: id,
        }
        const res = await axios.post(`http://localhost:5000/pfe/Create/${id}`, request)
        try {
            if (res.data.type === "error" || res.data.type === "délais") {
                setError(res.data.error)
            } else { 
                clearData(e)
            }
        } catch (err) {
            setError("erreur")
        }
    }
    
    function handleFormSubmittion (e) {
        e.preventDefault ();
        let form = document.getElementById ('form');
        let formData = new FormData (form);
        formData.append("id",prof)
        axios.post(`http://localhost:5000/pfe/Create/`, formData, { headers: {"Authorization" : `Bearer ${token}`}})
        console.log("Form submitted")
        fetchpfe() 
      }
    function handleUploadedFile (e) {
        setUploadedFile (e.target.value);
      }
    function handleFileTitle (e) {
        setFileTitle (e.target.value);
      }  
    return (
      <React.Fragment>
        <PanelHeader size="sm" />
        <Form
          onSubmit={(e) => handleFormSubmittion(e)}
          enctype="multipart/form-data"
          id="form"
        >
          <h3 className="date">Heure: {new Date().toLocaleTimeString()}</h3>
          <legend style={{ fontFamily: "bold" }}>
            {" "}
            Ajouter votre projet de fin d'étude{" "}
          </legend>
          <div className="col">
            <Form.Control
              size="lg"
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
          <Button variant="warning" type="reset" onClick={clearData}>
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
        <br />
        <br />
        <Table size="lg" bordered bordered variant="dark">
          <thead>
            <tr>
              <th scope="col"> Name</th>
              <th scope="col"> Graduation project report</th>
              <th scope="col"> Confirmed</th>
              <th scope="col"> Action</th>
            </tr>
          </thead>
          {pfe && (
            <tbody>
              <tr>
                <td> {pfe.title}</td>
                <td> {pfe.rapport}</td>
                <td> 
                  {(() => {
                    if (pfe.confirmed==1) {
                      return  "Yes";
                    } else if (pfe.confirmed==0) {
                      return "No";
                    } else {
                      return "Not yet";
                    }
                  })()}
                </td>
                <td width="5px">
                   
                  <span
                    style={{ fontSize: "18px" }}
                    onClick={() => update_pfe(pfe._id)}
                  >
                      <AiIcons.AiFillEdit />
                    
                  </span>
                  <span
                    style={{ fontSize: "18px" }}
                    onClick={() => {
                        const confirmBox = window.confirm(
                          "Do you really want to delete " + pfe.title
                        );
                        if (confirmBox === true) {suppPfe(pfe._id)}}}
                  >
                    <i
                          class="far fa-trash-alt"
                          style={{ fontSize: "18px", marginRight: "5px" }}
                        ></i>
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
          enctype="multipart/form-data"
          id="formUpdate"
        > 
          <div className="col">
            <Form.Control
              size="lg"
              type="text"
              placeholder="Graduation project title"
              name="titleUpdate"
              onChange={e => onInputChange(e)}
              value={titleUpdate}
            />

            <Form.File
              className="position-relative"
              required
              name="rapportUpdate" 
              onChange={e => onInputChange(e)}
            />
            <br />
            <Form.Control
              as="select"
              name="profId"
              value={profId}
              defaultValue={profId}
              onChange={e => onInputChange(e)}
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
          <Button variant="warning" type="reset" onClick={clearData}>
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
      </React.Fragment>
    );
}
