// client/src/App.jsx

import { useState, useEffect } from 'react';
import './App.css';

export default function App() {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        role_id: '',
    });

    
}