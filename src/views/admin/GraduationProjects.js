import { React, useState, useEffect } from "react";
import PanelHeader from "components/PanelHeader/PanelHeader.js";
import axios from "axios";
import { Container, Row, Col, Modal, Button, Form } from "react-bootstrap";
import { Document, Page } from "react-pdf";

function GraduationProjects() {
  const [record, setRecord] = useState([]);
  const [show, setShow] = useState(false);
  const [details, setDetails] = useState();
  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    setDetails({});
  };
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  /*To Prevent right click on screen*/
  document.addEventListener("contextmenu", (event) => {
    event.preventDefault();
  });

  /*When document gets loaded successfully*/
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  // On Page load display all records
  const loadProjects = async () => {
    var response = await fetch("http://localhost:5000/pfe/Lists")
      .then(function (response) {
        //console.log(response.clone().json())
        return response.json();
      })
      .catch((err) => {
        console.log("fail", err);
      });
    console.log(response);
    setRecord(response);
  };

  const loadProjectDetails = async (id) => {
    const res = await axios
      .get(`http://localhost:5000/pfe/OpenFile/${id}`)
      .then(function (res) {
        /* 
          var blob = new Blob([res], {type: 'application/pdf'});
          if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(blob);
            return;
          }
          var data = window.URL.createObjectURL(blob);
          var link = document.createElement("a");
          document.body.appendChild(link);
          link.href = data;
          link.download = "file.pdf";
          link.click();
          window.URL.revokeObjectURL(data);
          link.remove(); */
        return res;
      });
    /* .catch(() => {
          console.log("fail");
        });  */
    base64toPDF(res);
  };
  function base64toPDF(res) {
    // var bufferArray = base64ToArrayBuffer(res);
    var blobStore = new Blob([res], { type: "application/pdf" });
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(blobStore);
      return;
    }
    var data = window.URL.createObjectURL(blobStore);
    var link = document.createElement("a");
    document.body.appendChild(link);
    link.href = data;
    link.download = "file.pdf";
    link.click();
    window.URL.revokeObjectURL(data);
    link.remove();
  }
  function base64ToArrayBuffer(data) {
    var bString = decodeURIComponent(escape(window.atob(data)));
    var bLength = bString.length;
    var bytes = new Uint8Array(bLength);
    for (var i = 0; i < bLength; i++) {
      var ascii = bString.charCodeAt(i);
      bytes[i] = ascii;
    }
    return bytes;
  }
  const showProject = (id) => {
    handleShow();
    //loadProjectDetails(id);
  };

  useEffect(() => {
    loadProjects();
  }, []);
  return (
    <>
      <PanelHeader size="sm" />
      <div className="col-sm-8">
        <h5 className="text-center  ml-4 mt-4  mb-5">
          List Graduation Projects
        </h5>

        <table className="table table-hover  table-striped table-bordered ml-4 ">
          <thead>
            <tr>
              <th>Graduation project's title</th>
              <th>Student</th>
              <th>Professor</th>
            </tr>
          </thead>
          <tbody>
            {record.map((item, key) => (
              <tr key={key}>
                <td>
                  <a onClick={() => showProject(item._id)}>{item.title}</a>
                </td>
                <td>
                  {" "}
                  {item.userId[0].prenom} {item.userId[0].nom}
                </td>
                <td>
                  {" "}
                  {item.enseignantId.prenom} {item.enseignantId.nom}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* { details ? <div className="main">
          <Document file={details} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={pageNumber} />
          </Document>
          <div>
            <div className="pagec">
              Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
            </div>
            <div className="buttonc">
              <button
                type="button"
                disabled={pageNumber <= 1}
                onClick={previousPage}
                className="Pre"
              >
                Previous
              </button>
              <button
                type="button"
                disabled={pageNumber >= numPages}
                onClick={nextPage}
              >
                Next
              </button>
            </div>
          </div>
        </div>: <br />} */}
      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Graduation Project </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container fluid>
            <Row className="justify-content-md-center">
              <Col>
                <h5>Report : </h5>
              </Col>
            </Row>
            <Row className="justify-content-md-center">
              <Document file={details} onLoadSuccess={onDocumentLoadSuccess}>
                <Page pageNumber={pageNumber} />
              </Document>
            </Row>
            <br />
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default GraduationProjects;
