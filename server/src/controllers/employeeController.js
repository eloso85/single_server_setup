// src/controllers/employeeController.js
const EmployeeModel = require('../models/employeeModel');

const employeeController = {
  getEmployees(req, res) {
    try {
      const employees = EmployeeModel.getAll();
      res.status(200).json(employees);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  createEmployee(req, res) {
    const { first_name, last_name, role_id, manager_id } = req.body;

    if (!first_name || !last_name) {
      return res.status(400).json({ error: 'First and last names are required.' });
    }

    try {
      const newId = EmployeeModel.create(first_name, last_name, role_id, manager_id);
      res.status(201).json({ id: newId, first_name, last_name, role_id, manager_id });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  deleteEmployee(req, res){
    const { id } = req.params;

    try{
      const result = EmployeeModel.delete(id);

      if (result.changes === 0) {
        return res.status(404).json({error: 'Employee not found'})
      }

      res.status(200).json({message: 'Employee Deleted Sucessfully'})
    }catch (err){
      res.status(500).json({error: err.message})
    }
  }

};

module.exports = employeeController;