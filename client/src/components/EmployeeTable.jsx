// client/src/components/EmployeeTable.jsx

export default function EmployeeTable({employees, onDeleteEmployee}){
    return (
        <div className="table-container">
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
                            <td colSpan="6" className="state-message">No Employees Resgistered Yet.</td>
                        </tr>
                    ):(
                        employees.map((emp)=>(
                            <tr key={emp.id}>
                                <td>{emp.id}</td>
                                <td><strong>{emp.first_name} {emp.last_name}</strong></td>
                                <td>{emp.role || 'Unassigned'}</td>
                                <td>{emp.department || 'Unassigned'}</td>
                                <td>{emp.salary ? `$${emp.salary.toLocaleString()}` : 'N/A'}</td>
                                <td>
                                    <button className="btn-danger" onClick={()=> onDeleteEmployee(emp.id, `${emp.first_name} ${emp.last_name}`)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    )
}