// client/src/App.jsx
import { useState, useEffect } from 'react';
import './App.css';

export default function App() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    role_id: ''
  });

  // Helper function to load data (used after form submit)
  const loadEmployees = async () => {
    try {
      const res = await fetch('/api/employees');
      if (!res.ok) throw new Error('Failed to load employees from server.');
      const data = await res.json();
      setEmployees(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 1. Initial Fetch on Component Mount
  useEffect(() => {
    // Calling fetch directly inside the effect body avoids passing function references that trigger the linter
    fetch('/api/employees')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load employees from server.');
        return res.json();
      })
      .then((data) => {
        setEmployees(data);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // 2. Handle Form Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 3. Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
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
      
      // Reload the table using the helper
      loadEmployees();
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  return (
    <div className="app-container">
      <h1 className="page-header">🏢 Corporate Employee Tracker</h1>

      {/* Form Card */}
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

          <div className="form-group">
            <label htmlFor="role_id">Role ID</label>
            <input
              type="number"
              id="role_id"
              name="role_id"
              className="form-input"
              placeholder="1 = SE, 2 = Tech Lead"
              value={formData.role_id}
              onChange={handleChange}
              required
            />
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
              </tr>
            </thead>
            <tbody>
              {employees.length === 0 ? (
                <tr>
                  <td colSpan="5" className="state-message">
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