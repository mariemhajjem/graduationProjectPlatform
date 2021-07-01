import { React, useState, useEffect } from "react";
import axios from "axios";
import PanelHeader from "components/PanelHeader/PanelHeader.js";
import { Container, Row, Col, Modal, Button, Form } from "react-bootstrap";
import "./AcademicYear.css";
/* import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import AdapterDateFns from "@material-ui/lab/AdapterDateFns";
import LocalizationProvider from "@material-ui/lab/LocalizationProvider";
import DateRangePicker from "@material-ui/lab/DateRangePicker";
import Box from "@material-ui/core/Box"; */

function AcademicYear() {
  
  const [data, setData] = useState({
    nom: "",
    DateDepotPFE: "",
  });
  const [record, setRecord] = useState([]);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const [details, setDetails] = useState(false);
  const handleClose = () => {
    setShow(false);
    setDetails(false);
  };
  const [updatedYear, setUpdatedYear] = useState("");
  const [updateLimitDate, setUpdateLimitDate] = useState("");
  const [updatedYearId, setUpdatedYearId] = useState("");
  const [value, setValue] = useState([null, null]);

  const showUpdate = (id, Annee, DateDepotPFE) => {
    setUpdatedYear(Annee);
    setUpdateLimitDate(DateDepotPFE);
    setUpdatedYearId(id);
    handleShow();
  };
  const showYear = (Annee, DateDepotPFE) => {
    setUpdatedYear(Annee);
    setUpdateLimitDate(DateDepotPFE);
    handleShow();
    setDetails(true);
  };

  const loadYears = async () => {
    var response = fetch("http://localhost:5000/annee/List")
      .then(function (response) {
        return response.json();
      })
      .then(function (myJson) {
        setRecord(myJson);
      });
  };
  const updateYear = async (e) => {
    let form = document.getElementById("formUpdate");
    let formData = new FormData(form);
    formData.append("updatedYear", updatedYear);
    formData.append("updateLimitDate", updateLimitDate);
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5000/annee/update/${updatedYearId}`,
        formData
      );
      e.preventDefault();
      if (res.data.type === "error") {
        alert(res.data.error);
      }
      loadYears();
      handleClose();
    } catch (err) {
      console.log(err);
      alert("erreur");
    }
  };
  function handleUpdatedYear(e) {
    setUpdatedYear(e.target.value);
    console.log(updatedYear);
  }
  function handleUpdateLimitDate(e) {
    setUpdateLimitDate(e.target.value);
    console.log(updateLimitDate);
  }
  useEffect(() => {
    loadYears();
  }, []);

  // Delete Student Record
  const deleteRecord = (Id) => {
    axios
      .delete(`http://localhost:5000/annee/DeleteOne/${Id}`)
      .then((result) => {
        loadYears();
      })
      .catch(() => {
        alert("Error in the Code");
      });
  };
  const [error, setError] = useState("");
  function handle(e) {
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
  }
  function handleSelect(e) {
    console.log(e.target?.value);
  }
  function clearData(e) {
    e.preventDefault();
    setData({
      nom: "",
      DateDepotPFE: "",
    });
  }
  async function add_academic_year(e) {
    e.preventDefault();
    let request = {
      nomAnnee: data.nom,
      DateDepotPFE: data.DateDepotPFE,
    };
    const res = await axios.post("http://localhost:5000/annee/Create", request);
    try {
      
      if (res.data.type === "error") {
        setError(res.data.error);
      } else {
        loadYears();
        clearData(e);
      }
    } catch (err) {
      setError("bad request");
    }
  }
  return (
    <>
      <PanelHeader size="sm" />
      <div className="container">
        <div className="col-sm-4">
          <form onSubmit={(e) => add_academic_year(e)} className="form-sm">
            <h3
              className="text-center ml-4 mt-4  mb-5"
              style={{ fontFamily: "bold" }}
            >
              Academic year
            </h3>

            <p> Year</p>
            <input
              type="number"
              min="2000"
              max="2099"
              step="1"
              value={data.nom}
              onChange={(e) => handle(e)}
              id="nom"
              className="form-control"
              placeholder="Academic year"
            ></input>
            <br />
            {/* <p> Exams Period</p>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Box>
                <Typography sx={{ mt: 2, mb: 1 }}>1 calendar </Typography>
                <DateRangePicker
                  calendars={1}
                  value={value}
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                  renderInput={(startProps, endProps) => (
                    <React.Fragment>
                      <TextField {...startProps} />
                      <Box sx={{ mx: 2 }}> to </Box>
                      <TextField {...endProps} />
                    </React.Fragment>
                  )}
                />
              </Box>
            </LocalizationProvider> */}
            <p> Limit date</p>
            <input
              type="date"
              value={data.DateDepotPFE}
              onChange={(e) => handle(e)}
              id="DateDepotPFE"
              className="form-control"
              placeholder="Graduaton project Date"
            ></input>

            <br></br>
            <div className="button">
              <button type="submit" className="btn btn-success">
                Ajouter
              </button>
              &nbsp;&nbsp;&nbsp;
              <button
                type="reset"
                className="btn btn-warning "
                onClick={clearData}
              >
                Annuler
              </button>
            </div>
            <br></br>
            {error && (
              <div
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
          </form>
        </div>
        <div className="col-sm-8">
          <h3
            className="text-center  ml-4 mt-4  mb-5"
            style={{ fontFamily: "bold" }}
          >
            {" "}
            List Academic Year{" "}
          </h3>
          <table className="table table-hover  table-striped table-bordered ml-4 ">
            <thead>
              <tr>
                <th>Year</th>
                <th>Limit Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {record.map((item, key) => (
                <tr key={key} value={key}>
                  <td>
                    {" "}
                    <a onClick={() => showYear(item.Annee, item.DateDepotPFE)}>
                      {item.Annee}
                    </a>
                  </td>
                  <td>
                    {" "}
                    {item.DateDepotPFE
                      ? item.DateDepotPFE.slice(0, 10)
                      : "----"}
                  </td>
                  <td>
                    {/* <span
                      style={{ fontSize: "18px" }}
                      onClick={() =>
                        showUpdate(item._id, item.Annee, item.DateDepotPFE)
                      }
                    >
                      <AiIcons.AiFillEdit />
                    </span> */}
                    <a
                      onClick={() => {
                        const confirmBox = window.confirm(
                          "Do you really want to delete " + item.Annee
                        );
                        if (confirmBox === true) {
                          deleteRecord(item._id);
                        }
                      }}
                    >
                      <i
                        className="far fa-trash-alt"
                        style={{ fontSize: "18px", marginRight: "5px" }}
                      ></i>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Modal show={show} onHide={handleClose} size="lg" centered>
        {details ? (
          <>
            <Modal.Header closeButton>
              <Modal.Title>Academic Year</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Container fluid>
                <Row className="justify-content-md-center">
                  <Col>
                    <h5>Year : {updatedYear}</h5>
                  </Col>
                </Row>
                <Row className="justify-content-md-center">
                  <Col>
                    <h5>
                      The limit date of deposit : {updateLimitDate.slice(0, 10)}
                    </h5>
                  </Col>
                </Row>
                <br />
              </Container>
            </Modal.Body>
          </>
        ) : (
          <>
            <Modal.Header closeButton>
              <Modal.Title>Update Year</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={(e) => updateYear(e)} id="formUpdate">
                <div className="col">
                  <Form.Control
                    size="lg"
                    type="number"
                    min="2000"
                    max="2099"
                    step="1"
                    placeholder="Year"
                    name="updatedYear"
                    defaultValue={updatedYear}
                    onChange={(e) => handleUpdatedYear(e)}
                  />
                  <br />
                  <Form.Control
                    type="date"
                    placeholder="limitDate"
                    name="updateLimitDate"
                    defaultValue={updateLimitDate}
                    onChange={(e) => handleUpdateLimitDate(e)}
                  />
                  <br />
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
                    setUpdateLimitDate("");
                    setUpdatedYear("");
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
          </>
        )}
      </Modal>
    </>
  );
}

export default AcademicYear;
