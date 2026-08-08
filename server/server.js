const express = require('express');
const cors = require('cors');
const { initDatabase } = require('./src/config/db');

const employeeRoutes = require('./src/routes/employeeRoutes');
const departmentRoutes = require('./src/routes/departmentRoutes');
const roleRoutes = require('./src/routes/roleRoutes');
const app = express();
app.use(cors());
app.use(express.json());

initDatabase();
//employee, departments, roles routes
app.use('/api/employees', employeeRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/roles', roleRoutes);


app.get('/', (req, res) => {
  res.send('Welcome to the Employee Tracker API!');
});

app.listen(3000 || process.env.PORT, () => {
  console.log('Server is running on port 3000');
});


