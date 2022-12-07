import React,{useState} from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import swal from "sweetalert";

export default function ModalSignup(props) {

  async function Register(credentials) {
    return fetch("https://univelear.herokuapp.com/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(credentials)
    })
    .then(data => data.json())
    .then(console.log(credentials));
  }

  const classes = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const response = await Register({
      email,
      password,
      name
    });
    if (response.success) {
      swal("Success", response.message, "User register successfully.", {
        buttons: false,
        icon: "success",
        timer: 2000
      }).then(value => {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", response.data.name);
        localStorage.setItem("userID", response.data.id);
        window.location.reload();
      });
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
          Sign up
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Username</Form.Label>
          <Form.Control type="username" placeholder="Enter Username" required onChange={e => setName(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" required onChange={e => setEmail(e.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" required onChange={e => setPassword(e.target.value)}/>
        </Form.Group>
        <div className="text-end">
          <Button variant="primary" type="submit">Sign up</Button>
        </div>
      </Form>
      </Modal.Body>
    </Modal>
  );
}