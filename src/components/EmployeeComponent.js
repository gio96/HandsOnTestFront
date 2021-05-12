import React, { useEffect, useState } from "react";
import { clientService, getEmployee } from "../services/EmployeeService";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import "../styles/EmployeeComponent.css";
import * as ReactBootStrap from "react-bootstrap";

export const EmployeeComponent = () => {
  const [state, setState] = useState([]);

  const [text, setText] = useState("");

  const searchAllEmployees = () => {
    clientService()
        .then((res) => res.json())
        .then((data) => {
          setState(data);
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
  }

  const searchIdEmployee = () => {
    getEmployee(text)
    .then((res) => res.json())
    .then((data) => {
      setState([data]);
    })
    .catch((error) => {
      console.error("There was an error!", error);
    });
  }

  const onSubmit = (evt) => {
    evt.preventDefault();
    text === "" ? searchAllEmployees() : searchIdEmployee()
  };

  const onChange = (evt) => setText(evt.target.value);

  const renderEmployee = (employee, index) => {
    return (
      <tr key={index}>
        <td>{employee.id}</td>
        <td>{employee.name}</td>
        <td>{employee.contractTypeName}</td>
        <td>{employee.roleId}</td>
        <td>{employee.roleName}</td>
        <td>{employee.roleDescription}</td>
        <td>${Intl.NumberFormat().format(employee.hourlySalary)}</td>
        <td>${Intl.NumberFormat().format(employee.monthlySalary)}</td>
        <td>${Intl.NumberFormat().format(employee.totalSalary)}</td>
      </tr>
    );
  };

  return (
    <div>
      <div class="row justify-content-md-center">
        <InputGroup className="col-4" style={{ paddingTop: "1em" }}>
          <FormControl
            placeholder="Search"
            aria-label="Search"
            aria-describedby="basic-addon2"
            value={text}
            onChange={onChange}
          />
          <InputGroup.Append>
            <Button variant="outline-secondary" onClick={onSubmit}>
              Search
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </div>
      <div style={{ paddingTop: "1em" }}>
        <ReactBootStrap.Table
          hidden={state.length === 0}
          striped
          bordered
          hover
          variant="dark">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>ContractTypeName</th>
              <th>RoleId</th>
              <th>RoleName</th>
              <th>RoleDescription</th>
              <th>HourlySalary</th>
              <th>MonthlySalary</th>
              <th>TotalSalary</th>
            </tr>
          </thead>
          <tbody>{state.map(renderEmployee)}</tbody>
        </ReactBootStrap.Table>
      </div>
    </div>
  );
};
