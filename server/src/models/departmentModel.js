const { db } = require('../config/db')

const DepartmentModel = {
    getAll() {
        return db.prepare('SELECT * FROM departments').all();
    }
};

module.exports = DepartmentModel;