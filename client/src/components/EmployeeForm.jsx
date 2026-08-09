// client/src/components/EmployeeForm.jsx
import { useState } from "react";

export default function EmployeeForm({ roles, onAddEmployee }) {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    role_id: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.role_id) return alert("Select a Role");
    // Pass data up to App.jsx to handle the api call
    onAddEmployee({
      first_name: formData.first_name,
      last_name: formData.last_name,
      role_id: parseInt(formData.role_id),
    });

    setFormData({ first_name: "", last_name: "", role_id: "" });
  };

  return(
    <div className="card">
    <h2 className="section-title">Add New Employees</h2>
    <form onSubmit={handleSubmit}>
        <div className="form-group">
            <label htmlFor="">First Name</label>
            <input 
            type="text"
            name="first_name"
            className="form-input"
            value={formData.first_name}
            onChange={handleChange}
            required 
            />
        </div>
    </form>
  </div>

  
  ) 
  
}
