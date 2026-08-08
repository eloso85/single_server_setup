const DepartmentModel = require('../models/departmentModel')

exports.getDepartments = (req, res) =>{
    try {
        const departments = DepartmentModel.getAll();
        res.json(departments);
    } catch (err) {
        res.status(500).json({error: err. message});
    }
};