const { db } = require('../config/db');

const EmployeeModel = {
    getAll(){
        const query = `
            SELECT
                e.id,
                e.first_name,
                r.title AS role,
                r.salary,
                d.name AS department,
                (m.first_name || ' ' || m.last_name) AS manager
            FROM employees e
            LEFT JOIN roles r ON e.role_id = r.id
            LEFT JOIN departments d ON r.department_id = d.id
            LEFT JOIN employees m ON e.manager_id = m.id
            
        `;
        return db.prepare(query).all();

    },

    create(firstName, lastName, roleId, managerId){
        const stmt = db.prepare(`
            INSERT INTO employees (first_name, last_name, role_id, manager_id) 
            VALUES (?, ?, ?, ?)
        `);

        const info = stmt.run(firstName, lastName, roleId || null, managerId || null);
        return info.lastInsertRowid;
    }
};

module.exports = EmployeeModel;