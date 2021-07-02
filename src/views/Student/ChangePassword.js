import { React, useState, useEffect } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody, 
  Form,
  Input,
  Row,
  Col,
  Toast,
  ToastHeader,
  ToastBody
} from "reactstrap";
import PanelHeader from "components/PanelHeader/PanelHeader.js";
import jwt from "jwt-decode";
import axios from "axios";

export default function ChangePassword() {
  const token = localStorage.getItem("token");
  const decoded = jwt(token);
  const [show, setShow] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [student, setStudent] = useState({
    oldpassword: "",
    password: "",
  });
  const [visible, setVisible] = useState(false);
  const onDismiss = () => setVisible(false);
  //object destructuring
  const { oldpassword, password } = student;
  const onInputChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };
  const onConfirm = (e) => {
    setConfirmPassword(e.target.value);
  };

  const editPassword = () => {
    setShow(true);
  };
  const handleClose = () => {
    setVisible(true);
    setShow(false); 
  };

  const updateUser = async (e) => {
    e.preventDefault();
    if (confirmPassword !== password) {
      alert("Check your new password!!");
      setConfirmPassword("");
    } else {
      await axios
        .post(`http://localhost:5000/utilisateur/reset/${decoded.id}`, student)
        .then((result) => {
          console.log(result);
          setConfirmPassword("");
          setStudent({
            oldpassword: "",
            password: "",
          }); 
          handleClose();
        });
      /* .catch((err)=> { 
            alert("Error", err);
          })  */ 
          
        setTimeout(()=>setVisible(false), 2000);
    }
    
  };
  return (
    <>
      <PanelHeader size="sm" />
      <div className="content">
        <Row>
          <Col md="4">
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
                  <h5 className="title">
                    {decoded.prenom} {decoded.nom}
                  </h5>
                </div>
                <div className="description text-center">
                  <p className="description text-center">
                    {decoded.email} <br />
                  </p>
                  <Button
                    type="button"
                    variant="primary"
                    onClick={editPassword}
                  >
                    Change password
                  </Button>
                </div>
              </CardBody>
            </Card>
          </Col>
          {show && (<>
             <Col md="4">
              <Card>
                <CardHeader>
                  <h5 className="title">Edit Password</h5>
                </CardHeader>
                <CardBody>
                  <Form onSubmit={updateUser}>
                    <label>Current password</label>
                    <Input
                      placeholder="type your password"
                      type="text"
                      name="oldpassword"
                      value={oldpassword}
                      onChange={(e) => onInputChange(e)}
                    />
                    <label>New password</label>
                    <Input
                      placeholder="type your new password"
                      type="text"
                      name="password"
                      value={password}
                      onChange={(e) => onInputChange(e)}
                    />
                    <label>Confirm password</label>
                    <Input
                      placeholder="type your new password"
                      type="text"
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => onConfirm(e)}
                    />
                    <Button type="submit" variant="primary">
                      Send
                    </Button>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </>)}
          {visible && (
              <Col md="4"> 
              <Toast>
                <ToastHeader>Success</ToastHeader>
                <ToastBody>
                  Password added successfully!
                </ToastBody>
              </Toast>
              </Col>)}
        </Row>
      </div>
    </>
  );
}
