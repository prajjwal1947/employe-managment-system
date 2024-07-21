import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { loginAPICall, storeToken, saveLoggedInUser } from "../services/AuthService";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import AlertComponent from "./AlertComponent";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false);
  const alertValues = {
    show: false,
    variant: '',
    description: ''
  };
  const [alert, setAlert] = useState(alertValues);
  const [error, isError] = useState(false);
  const navigate = useNavigate();

  async function handleLogin(e) {

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true);
    if(form.checkValidity() === true) {
      e.preventDefault();
      try {
        const response = await loginAPICall(username, password);
        if (response.status === 200) {
          const token = "Bearer " + response.data.accessToken;
          const role = response.data.role;
          storeToken(token);
          saveLoggedInUser(username, role);
          navigate("/list");
        } else {
          isError(true);
          alertValues.show = true;
          alertValues.variant = 'danger';
          alertValues.description = response.data.message;
          setAlert(alertValues);
        }
      } catch (error) {
        isError(true);
        alertValues.show = true;
        alertValues.variant = 'danger';
        alertValues.description = error.response.data.message;
        setAlert(alertValues);
      }
    }
  }


  return (

    <section className="content">
      {error && <AlertComponent data={alert} />}
      <div className="container">
        <div className="loginForm">
          <h3>Sign In</h3>
          <Form noValidate validated={validated} onSubmit={handleLogin}>
            <div className="form-group">
              <Form.Group as={Col} md="12" controlId="validationCustom01">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  isInvalid={
                    validated &&
                    !/^[a-zA-Z]+$/.test(username)
                  }
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a valid username (alphanumeric
                  characters only).
                </Form.Control.Feedback>
              </Form.Group>
            </div>
            <div className="form-group mt-3">
              <Form.Group as={Col} md="12" controlId="validationCustom02">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minLength={4}
                  required
                  isInvalid={
                    validated && password.length < 4
                  }
                />
                <Form.Control.Feedback type="invalid">
                  Password must be at least 4 characters long.
                </Form.Control.Feedback>
              </Form.Group>
            </div>
            <div className="text-center mt-3">
              <Button type="submit" className="btn btn-primary">Submit</Button>
            </div>
          </Form>
        </div>
      </div>
    </section>
  )
}

export default Login