export const getInitialData = async () =>{
    const [empRes, rolesRes] = await Promise.all([
        fetch('/api/employees'),
        fetch('/api/roles')
    ]);
    if (!empRes.ok || !rolesRes.ok) throw new Error(' Failed to fetch data')
    
    return {
        employees: await empRes.json(),
        roles: await rolesRes.json()
    };
};

export const createEmployee = async (employeeData) => {
    const res = await fetch('/api/employees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(employeeData)
    });
    if (!res.ok){ throw new Error('Failed to Create Employee')}
    return res.json();

};

export const deleteEmployee = async (id) => {
    const res = await fetch(`/api/employees/${id}`, {method: 'DELETE'});
    if(!res.ok){ throw new Error('Failed to Delete Employee')}
        // Safely parse JSON only if the server sent a response body
  const text = await res.text();
  return text ? JSON.parse(text) : {};
}