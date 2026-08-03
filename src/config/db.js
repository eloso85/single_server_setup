const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, '../../employees.db'), { verbose: console.log });

db.pragma('foreign_keys = ON');

function initDAatabase() {
    db.exec(`
        CREATE TABLE IF NOT EXISTS departments (
            id INTERGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL
            );

        CREATE TABLE IF NOT EXISTS roles (
            id INTERGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            salary REAL NOT NULL,
            department_id INTERGER NOT NULL,
            FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL
            );
            
        CREATE TABLE IF NOT EXISTS employees (
            id INTERGER PRIMARY KEY AUTOINCREMENT,
            first_name TEXT NOT NULL,
            last_name TEXT NOT NULL,
            role_id INTEGER,
            manager_id INTEGER,
            FORREIGN KEY (role_id) REFERENCES roles(id) ON DELETE SET NULL,
            FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL
            );    

        `);

        console.log(' SQLite database and tables created successfully');
}

module.exports = {db, initDAatabase};