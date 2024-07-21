import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { updateEmployee, saveEmployee, getEmployee } from "../services/EmployeeService.js";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import AlertComponent from "./AlertComponent";

const EmployeeForm = () => {
  const { id } = useParams();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [mobileNo, setMobileNo] = useState();
  const [validated, setValidated] = useState(false);


  const alertValues = {
    show: false,
    variant: '',
    description: ''
  };
  const [alert, setAlert] = useState(alertValues);
  const [error, isError] = useState(false);

  const navigate = useNavigate();

  const pageTitle = () => {
    return id ? (
      <h2 className="text-center">Update Employee</h2>
    ) : (
      <h2 className="text-center">Add Employee</h2>
    );
  };

  async function saveOrUpdateEmployee(e) {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    setValidated(true);
    if (form.checkValidity() === true) {
      e.preventDefault();
      try {
        const employee = { firstName, lastName, email, mobileNo };
        console.log(employee, id);
        if (id) {
          const response = await updateEmployee(id, employee);
          if (response.status === 200 || response.status === 201) {
            navigate("/list");
          } else {
            isError(true);
            alertValues.show = true;
            alertValues.variant = 'danger';
            alertValues.description = response.data.message;
            setAlert(alertValues);
          }
        } else {
          const response = await saveEmployee(employee);
          console.log(response.status)
          if (response.status === 200 || response.status === 201) {
           
            navigate("/list");
          } else {
            isError(true);
            alertValues.show = true;
            alertValues.variant = 'danger';
            alertValues.description = response.data.message;
            setAlert(alertValues);
          }
        }
      } catch (error) {
        isError(true);
        alertValues.show = true;
        alertValues.variant = 'danger';
        alertValues.description = error.response.data.message;
        setAlert(alertValues);
      }
    }

  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const response = await getEmployee(id);
          console.log(response.data);
          setFirstName(response.data.firstName);
          setLastName(response.data.lastName);
          setEmail(response.data.email);
          setMobileNo(response.data.mobileNo);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div className="formUI">
      {error && <AlertComponent data={alert} />}
      <h2 className="fs-4 text-center mb-4">{pageTitle()}</h2>
      <div className="card-body">
        <Form noValidate validated={validated} onSubmit={saveOrUpdateEmployee}>
          <div className="form-group">
            <Form.Group as={Col} md="12" controlId="validationCustom01">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Full Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                isInvalid={
                  validated &&
                  !/^[a-zA-Z]+$/.test(firstName)
                }
              />
              <Form.Control.Feedback type="invalid">
                Required
              </Form.Control.Feedback>
            </Form.Group>
          </div>
          <div className="form-group mt-3">
            <Form.Group as={Col} md="12" controlId="validationCustom02">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                isInvalid={
                  validated &&
                  !/^[a-zA-Z]+$/.test(lastName)
                }
              />
              <Form.Control.Feedback type="invalid">
                Required
              </Form.Control.Feedback>
            </Form.Group>
          </div>
          <div className="form-group mt-3">
            <Form.Group as={Col} md="12" controlId="validationCustom03">
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                isInvalid={
                  validated &&
                  !/^\S+@\S+\.\S+$/.test(email)
                }
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid email address.
              </Form.Control.Feedback>
            </Form.Group>
          </div>
          <div className="form-group mt-3">
            <Form.Group as={Col} md="12" controlId="validationCustom04">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control
                type="text"
                name="mobileNo"
                placeholder='Mobile Number'
                pattern="^\d{10}$"
                required
                value={mobileNo}
                onChange={(e) => setMobileNo(e.target.value)}
                isInvalid={
                  validated &&
                  !/^\d{10}$/.test(mobileNo)
                }
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid 10-digit phone number.
              </Form.Control.Feedback>
            </Form.Group>
          </div>
          <div className="text-center mt-3">
            <Button type="submit" className="btn btn-primary">Submit</Button>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default EmployeeForm