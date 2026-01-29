const express = require("express");
const {
  addEmployees,
  getAllEmployees,
  getEmployeeById,
  addLifecycleEvent,
  updateEmployeeStatus,
  updateEmployeeInfo,
} = require("../controllers/employee.controller");

const employeeRouter = express.Router();

// getting all employees
employeeRouter.get("/get-employees", getAllEmployees);

// getting employees by id(particular employee)
employeeRouter.get("/get-employee/:id", getEmployeeById);

// adding an employee
employeeRouter.post("/add-employees", addEmployees);

// add lifecycle event to event
employeeRouter.post("/employee/:id/lifecycle", addLifecycleEvent);

// update status
employeeRouter.patch("/employee/:id/status", updateEmployeeStatus);

// update employee info
employeeRouter.patch("/employee/:id", updateEmployeeInfo);

module.exports = employeeRouter;
