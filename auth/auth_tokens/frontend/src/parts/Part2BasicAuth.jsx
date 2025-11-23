import React, { useState } from 'react';
import axios from 'axios';
import { Lock } from 'lucide-react';
import AuthDemo from '../components/AuthDemo';

const Part2BasicAuth = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const handleFetch = async (credentials) => {
        try {
            setError(null);
            // For Basic Auth, we send credentials with every request
            // In this demo UI, we'll just ask for them when clicking fetch if we wanted to be strict,
            // but to fit the pattern, let's treat "Login" as just saving the creds in state to use.
            // However, Basic Auth is stateless. So we'll just use the form values directly.

            // Actually, let's make the "Login" button just validate the creds by making a request.
        } catch (err) {
            setError(err.message);
        }
    };

    // Modified approach for Basic Auth to fit the UI pattern:
    // User enters creds -> "Login" (which just stores them in React state for this demo) -> Then "Fetch" uses them.
    const [creds, setCreds] = useState(null);

    const handleLogin = async (credentials) => {
        // Verify credentials immediately by trying to fetch
        try {
            setError(null);
            const auth = { username: credentials.username, password: credentials.password };
            await axios.get('http://localhost:8002/protected', { auth });
            setCreds(auth); // Store if successful
        } catch (err) {
            setError("Login failed: " + (err.response?.data?.detail || err.message));
            setCreds(null);
        }
    };

    const handleFetchProtected = async () => {
        try {
            setError(null);
            const res = await axios.get('http://localhost:8002/protected', { auth: creds });
            setData(res.data);
        } catch (err) {
            setError(err.response?.data?.detail || err.message);
        }
    };

    return (
        <AuthDemo
            title="Part 2: Basic Auth"
            description="Credentials sent with every request in the Authorization header (base64 encoded)."
            icon={Lock}
            color="border-blue-500"
            onLogin={handleLogin}
            onFetch={handleFetchProtected}
            requiresLogin={true}
            isLoggedIn={!!creds}
            loginFields={[
                { name: 'username', label: 'Username', type: 'text', placeholder: 'basic_user' },
                { name: 'password', label: 'Password', type: 'password', placeholder: 'password' }
            ]}
            responseData={data}
            error={error}
        />
    );
};

export default Part2BasicAuth;
