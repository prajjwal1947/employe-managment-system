import { React, useEffect, useState } from 'react'
import { useNavigate } from "react-router";
import {
  deleteEmployee,
  getAllEmployees,
} from "../services/EmployeeService";
import { isAdminUser } from "../services/AuthService";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { CiViewList } from "react-icons/ci";

const EmployeeList = () => {

  const [employeeList, setEmployeeList] = useState([]);
  const navigate = useNavigate();
  const isAdmin = isAdminUser();

  useEffect(() => {
    getEmployeeList();
  }, []);

  const getEmployeeList = async () => {
    try {
      const response = await getAllEmployees();
      setEmployeeList(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  function addEmployee() {
    navigate("/add");
  }

  function updateEmployee(id) {
    navigate(`/update/${id}`);
  }

  function viewEmployee(id) {
    navigate(`/view/${id}`);
  }

  const removeEmployee = async (id) => {
    try {
      const response = await deleteEmployee(id);
      getEmployeeList();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="content">
      <div className="container">
        <div className="title">
          <h1>Employee List</h1>
          {isAdmin && (
            <button className="btn btn-primary" onClick={addEmployee}>Add Employee</button>
          )}
        </div>
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody id="tableContent">
              {employeeList.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.firstName}</td>
                  <td>{employee.lastName}</td>
                  <td>{employee.email}</td>
                  <td className="action-icons text-center">
                    {isAdmin && (
                      <span className="edit tooltip">
                        <button
                          onClick={() => updateEmployee(employee.id)}
                        >
                          <span className='icon'><FaRegEdit /></span>
                          <span className="tooltiptext">Update</span>
                        </button>
                      </span>
                    )}
                    {isAdmin && (
                      <span className="delete tooltip">
                        <button
                          onClick={() => removeEmployee(employee.id)}
                        >
                          <span className='icon'><MdDeleteOutline /></span>
                          <span className="tooltiptext">Delete</span>
                        </button>
                      </span>
                    )}
                    <span className="view tooltip">
                      <button
                        onClick={() => viewEmployee(employee.id)}
                      >
                        <span className='icon'><CiViewList /></span>
                        <span className="tooltiptext">View</span>
                      </button>
                    </span>
                  </td>
                </tr>
              ))}

            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

export default EmployeeList