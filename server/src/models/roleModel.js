const { db } = require('../config/db');

const RoleModel = {
    getAll(){
        return db.prepare(`
            SELECT roles.id, roles.title, roles.salary, departments.name AS department_name
            FROM roles
            LEFT JOIN departments ON roles.department_id = departments.id
        `).all()
    }
};

module.exports = RoleModel;