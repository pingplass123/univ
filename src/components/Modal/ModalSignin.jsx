import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import ModalSignup from './ModalSignup'
import './ModalSignin.css';
import swal from "sweetalert";

export default function ModalSignin(props) {
  const [modalShowSignup, setModalShowSignup] = React.useState(false);

  async function loginUser(credentials) {
    return fetch("https://univelear.herokuapp.com/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(credentials)
    }).then(data => data.json());
  }

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const classes = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const response = await loginUser({
      email,
      password
    });
    console.log(response);
    if (response.success) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", response.data.name);
      localStorage.setItem("userID", response.data.id);
      window.location.reload();
    } else {
      swal("Failed", response.message, "error").then(console.log(response));
    }
  };
  
  return (
   <Modal 
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Sign in
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="text" placeholder="Enter email" required onChange={e => setEmail(e.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" required onChange={e => setPassword(e.target.value)} />
        </Form.Group>
        <Form.Text className="text-muted" closeButton>
          I Don't Have an Account Yet?, Please Click Join us before
        </Form.Text> 
        <br/><br/>
        <ModalSignup show={modalShowSignup} onHide={() => setModalShowSignup(false)}/>
        <div className="text-end">
          <Button variant="primary" type="submit">Sign in</Button>
        </div>
      </Form>
      </Modal.Body>
    </Modal>
  );
}