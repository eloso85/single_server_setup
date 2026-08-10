// client/src/App.jsx
import { useState, useEffect } from 'react';
import { getInitialData, createEmployee, deleteEmployee } from './api/employeeApi';
import EmployeeForm from './components/EmployeeForm';
import EmployeeTable from './components/EmployeeTable';
import './App.css';

export default function App() {
  const [employees, setEmployees] = useState([]);
  const [roles, setRoles] = useState([]); // Array to store SQLite roles
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  

  // Fetch initial data (employees & roles)
  const loadData = async () => {
    try {
      setLoading(true);
      const data = await getInitialData();
      setEmployees(data.employees);
      setRoles(data.roles);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);
  
  const handleAddEmployee = async (newEmp) =>{
    try {
      await createEmployee(newEmp);
      loadData();
    } catch (err){
      alert(err.message)
    }
  };

 const handleDeleteEmployee = async (id, name) => {
  if (!window.confirm(`Delete ${name}`)) return;
  try {
    await deleteEmployee(id);
    console.log('Backend deletion succeeded. Updating React state...');
    setEmployees((prev) => prev.filter((emp) => emp.id != id));
  } catch (err) {
    console.error('Delete caught an error:', err);
    alert(err.message);
  }
};

  
  

  return (
    <div className="app-container">
      <h1 className="page-header">🏢 Corporate Employee Tracker</h1>
        <EmployeeForm roles={roles} onAddEmployee={handleAddEmployee} />

        <h2 className="section-title">Current Employees</h2>
        {error && <div className='error-message'>{error}</div>}

        {loading ?(
          <p className='state-message'>Loading...</p>
        ) :(
          <EmployeeTable employees={employees} onDeleteEmployee={handleDeleteEmployee} />
        )}
      
      </div>
    
  );
}