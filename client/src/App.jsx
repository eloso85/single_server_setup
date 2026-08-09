// client/src/App.jsx
import { useState, useEffect } from 'react';
import './App.css';

export default function App() {
  const [employees, setEmployees] = useState([]);
  const [roles, setRoles] = useState([]); // Array to store SQLite roles
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    role_id: ''
  });

  // Fetch initial data (employees & roles)
  const loadInitialData = async () => {
    try {
      setLoading(true);

      // Fetch employees and roles in parallel
      const [empRes, rolesRes] = await Promise.all([
        fetch('/api/employees'),
        fetch('/api/roles')
      ]);

      if (!empRes.ok || !rolesRes.ok) {
        throw new Error('Failed to load initial data from server.');
      }

      const empData = await empRes.json();
      const rolesData = await rolesRes.json();

      setEmployees(empData);
      setRoles(rolesData);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    loadInitialData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.role_id) {
      alert('Please select a role.');
      return;
    }

    try {
      const res = await fetch('/api/employees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          first_name: formData.first_name,
          last_name: formData.last_name,
          role_id: parseInt(formData.role_id)
        })
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to add employee');
      }

      setFormData({ first_name: '', last_name: '', role_id: '' });
      loadInitialData(); // Refresh employee list
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete ${name}?`)) return;

    try {
      const res = await fetch(`/api/employees/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete employee');

      setEmployees((prev) => prev.filter((emp) => emp.id !== id));
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  return (
    <div className="app-container">
      <h1 className="page-header">🏢 Corporate Employee Tracker</h1>

      {/* Add Employee Form Card */}
      <div className="card">
        <h2 className="section-title">Add New Employee</h2>
        <form onSubmit={handleSubmit} className="employee-form">
          <div className="form-group">
            <label htmlFor="first_name">First Name</label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              className="form-input"
              placeholder="e.g. Jane"
              value={formData.first_name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="last_name">Last Name</label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              className="form-input"
              placeholder="e.g. Doe"
              value={formData.last_name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Dynamic Role Select Dropdown */}
          <div className="form-group">
            <label htmlFor="role_id">Select Role</label>
            <select
              id="role_id"
              name="role_id"
              className="form-input"
              value={formData.role_id}
              onChange={handleChange}
              required
            >
              <option value="">-- Choose a Role --</option>
              {roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.title} ({role.department_name || 'General'})
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="btn-primary">
            Save Employee
          </button>
        </form>
      </div>

      {/* Employee List Table */}
      <h2 className="section-title">Current Employees</h2>

      {error && <div className="error-message">{error}</div>}

      <div className="table-container">
        {loading ? (
          <p className="state-message">Loading employee directory...</p>
        ) : (
          <table className="employee-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Role</th>
                <th>Department</th>
                <th>Salary</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.length === 0 ? (
                <tr>
                  <td colSpan="6" className="state-message">
                    No employees registered yet.
                  </td>
                </tr>
              ) : (
                employees.map((emp) => (
                  <tr key={emp.id}>
                    <td>{emp.id}</td>
                    <td>
                      <strong>
                        {emp.first_name} {emp.last_name}
                      </strong>
                    </td>
                    <td>{emp.role || 'Unassigned'}</td>
                    <td>{emp.department || 'Unassigned'}</td>
                    <td>{emp.salary ? `$${emp.salary.toLocaleString()}` : 'N/A'}</td>
                    <td>
                      <button
                        className="btn-danger"
                        onClick={() => handleDelete(emp.id, `${emp.first_name} ${emp.last_name}`)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}