// src/config/db.js
const Database = require('better-sqlite3');
const path = require('path');

// Open or create the database file in the project root
const db = new Database(path.join(__dirname, '../../employee_tracker.db'));

// Enforce foreign key rules
db.pragma('foreign_keys = ON');

function initDatabase() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS departments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE
    );

    CREATE TABLE IF NOT EXISTS roles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      salary REAL NOT NULL,
      department_id INTEGER,
      FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL
    );

    CREATE TABLE IF NOT EXISTS employees (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      role_id INTEGER,
      manager_id INTEGER,
      FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE SET NULL,
      FOREIGN KEY (manager_id) REFERENCES employees(id) ON DELETE SET NULL
    );
  `);

  console.log('⚡ SQLite database and tables initialized!');
}

module.exports = { db, initDatabase };