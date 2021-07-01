import { React, useState, useEffect,useRef } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap"; 
import PanelHeader from "components/PanelHeader/PanelHeader.js";
import jwt from "jwt-decode"
import axios from"axios"

export default function ChangePassword() {
    const token = localStorage.getItem('token');
    const decoded=jwt(token);
    const id=decoded.id 
    const [password,setPassword]=useState('')
    const form = useRef(null)
     
    const updateUser = async e => { 
        e.preventDefault(); 
        const formData = new FormData (form.current); 
        //formData.append("password",password)
        await axios.post(
            `http://localhost:5000/utilisateur/reset/${token}`,
            formData
          );
        try {
          
          if (res.data.type === "error") {
            alert(res.data.error);
          }
        } catch (err) {
          console.log(err);
          alert("erreur");
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
                    <img
                      alt="..."
                      src={require("assets/img/bg5.jpg").default}
                    />
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
                    <p className="description text-center">
                      {decoded.email} <br />
                    </p>
                  </CardBody>
                </Card>
              </Col>
              <Col md="4">
                <Card>
                  <CardHeader>
                    <h5 className="title">Edit Password</h5>
                  </CardHeader>
                  <CardBody>
                    <Form ref={form} onSubmit={updateUser}>
                      <label>Password</label>
                      <Input
                        placeholder="Password"
                        type="password"
                        name="oldpassword"
                        disabled
                      />
                      <label>New password</label>
                      <Input
                        placeholder="type new password"
                        type="text"
                        name="password"
                        defaultValue={password}
                      />
                      <Button type="submit" variant="primary">
                        Send
                      </Button>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </>
      );
}
