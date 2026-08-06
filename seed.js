const { db, initDatabase } = require('./src/config/db');

initDatabase();

console.log('Seeding the database with initial data...');

const insertDept = db.prepare('INSERT OR IGNORE INTO departments (id, name) VALUES (?, ?)');
insertDept.run(1, "Engineering");
insertDept.run(2, "Marketing");

const insertRole = db.prepare('INSERT OR IGNORE INTO roles (id, title, salary, department_id) VALUES (?, ?, ?, ?)');
insertRole.run(1, 'Software Engineer', 95000, 1);
insertRole.run(2, 'Tech Lead', 120000, 1);
insertRole.run(3, 'Marketing Lead', 85000, 2);

console.log('✅ Database seeded with initial departments and roles!');
