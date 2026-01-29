const employeeModel = require("../models/employee.models");

const getAllEmployees = async (req, res) => {
  try {
    const employees = await employeeModel.find();
    res.status(200).json({ message: "List of employees", employees });
  } catch (error) {
    res.status(500).json({ message: "Error is getting employees" });
    console.log("Error in getting employees:", error);
  }
};

const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const employeeById = await employeeModel.findById(id);
    res.status(200).json({ message: "Employee Detail", employeeById });
  } catch (error) {
    res.status(500).json({ message: "Error in getting employee by id" });
    console.log("Error in getting employee by id", error);
  }
};

const addEmployees = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if employee with this email already exists
    const existingEmployee = await employeeModel.findOne({ email });
    if (existingEmployee) {
      return res
        .status(409)
        .json({ message: "Employee with this email already exists" });
    }

    const employeeAdded = await employeeModel.create({ ...req.body });
    res
      .status(201)
      .json({
        message: "Employee is created successfully",
        employee: employeeAdded,
      });
  } catch (error) {
    res.status(500).json({ message: "Error in creating Employees" });
    console.log("Error while creating employees:", error);
  }
};

const addLifecycleEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { eventType, description, effectiveDate } = req.body;

    if (!eventType || !effectiveDate) {
      return res.status(400).json({
        message: "eventType and effectiveDate are required",
      });
    }

    const employee = await employeeModel.findById(id);

    if (!employee) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }

    // append the event
    employee.lifecycle.push({
      eventType,
      description,
      effectiveDate,
    });

    await employee.save();

    res
      .status(200)
      .json({ message: "Lifecycle event added successfully", employee });
  } catch (error) {
    res.status(500).json({ message: "Error in adding lifecycle event" });
    console.log("Error is adding lifecycle event:", error);
  }
};

const updateEmployeeStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const employee = await employeeModel.findByIdAndUpdate(
      id,
      { status },
      { new: true },
    );

    if (!employee) {
      return res.status(404).json({ message: "Employee Not Found" });
    }

    res.status(200).json({ message: "Status Updated", employee });
  } catch (error) {
    res.status(500).json({ message: "Error in updating status" });
    console.log("Error in updating status", error);
  }
};

const updateEmployeeInfo = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, department, role } = req.body;

    if (!name && !email && !department && !role) {
      return res.status(400).json({
        message: "At least one field is required to update",
      });
    }

    if (email) {
      const existingEmployee = await employeeModel.findOne({ email });
      if (existingEmployee && existingEmployee._id.toString() !== id) {
        return res.status(409).json({
          message: "Email already in use by another employee",
        });
      }
    }

    const updatedEmployee = await employeeModel.findByIdAndUpdate(
      id,
      { name, email, department, role },
      { new: true, runValidators: true },
    );

    if (!updatedEmployee) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }

    res.status(200).json({
      message: "Employee info updated successfully",
      employee: updatedEmployee,
    });
  } catch (error) {
    console.log("Error updating employee info:", error);
    res.status(500).json({
      message: "Error updating employee info",
    });
  }
};

module.exports = {
  addEmployees,
  getAllEmployees,
  getEmployeeById,
  addLifecycleEvent,
  updateEmployeeStatus,
  updateEmployeeInfo,
};
