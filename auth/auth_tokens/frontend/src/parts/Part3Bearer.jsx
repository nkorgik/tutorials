import React, { useState } from 'react';
import axios from 'axios';
import { Ticket } from 'lucide-react';
import AuthDemo from '../components/AuthDemo';

const Part3Bearer = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [token, setToken] = useState(null);

    const handleLogin = async (credentials) => {
        try {
            setError(null);
            const res = await axios.post('http://localhost:8003/login', credentials);
            setToken(res.data.access_token);
        } catch (err) {
            setError("Login failed: " + (err.response?.data?.detail || err.message));
        }
    };

    const handleFetch = async () => {
        try {
            setError(null);
            const res = await axios.get('http://localhost:8003/protected', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setData(res.data);
        } catch (err) {
            setError(err.response?.data?.detail || err.message);
        }
    };

    return (
        <AuthDemo
            title="Part 3: Bearer Token"
            description="Exchange credentials for a random token. Token is sent in header for subsequent requests."
            icon={Ticket}
            color="border-purple-500"
            onLogin={handleLogin}
            onFetch={handleFetch}
            requiresLogin={true}
            isLoggedIn={!!token}
            token={token}
            loginFields={[
                { name: 'username', label: 'Username', type: 'text', placeholder: 'user' },
                { name: 'password', label: 'Password', type: 'password', placeholder: 'password' }
            ]}
            responseData={data}
            error={error}
        />
    );
};

export default Part3Bearer;
