const RoleModel = require('../models/roleModel');

exports.getRoles = (req, res) => {
    try {
        const roles = RoleModel.getAll();
        res.json(roles)
    } catch (err){
        res.status(500).json({ error: err.message})
    }
}