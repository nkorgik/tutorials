import React, { useState } from 'react';
import axios from 'axios';
import { Key } from 'lucide-react';
import AuthDemo from '../components/AuthDemo';

const Part4JWT = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [token, setToken] = useState(null);

    const handleLogin = async (credentials) => {
        try {
            setError(null);
            // OAuth2PasswordRequestForm expects form data, not JSON
            const formData = new FormData();
            formData.append('username', credentials.username);
            formData.append('password', credentials.password);

            const res = await axios.post('http://localhost:8004/token', formData);
            setToken(res.data.access_token);
        } catch (err) {
            setError("Login failed: " + (err.response?.data?.detail || err.message));
        }
    };

    const handleFetch = async () => {
        try {
            setError(null);
            const res = await axios.get('http://localhost:8004/protected', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setData(res.data);
        } catch (err) {
            setError(err.response?.data?.detail || err.message);
        }
    };

    return (
        <AuthDemo
            title="Part 4: JWT"
            description="Stateless authentication using signed JSON Web Tokens containing user data."
            icon={Key}
            color="border-orange-500"
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

export default Part4JWT;
