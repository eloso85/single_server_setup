const express = require('express');
const cors = require('cors');
const { initDatabase } = require('./src/config/db');

const employeeRoutes = require('./src/routes/employeeRoutes');

const app = express();
app.use(cors());
app.use(express.json());

initDatabase();

app.use('/api/employees', employeeRoutes);
app.get('/', (req, res) => {
  res.send('Welcome to the Employee Tracker API!');
});

app.listen(3000 || process.env.PORT, () => {
  console.log('Server is running on port 3000');
});


