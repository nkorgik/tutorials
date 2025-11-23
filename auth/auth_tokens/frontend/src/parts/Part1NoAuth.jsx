import React, { useState } from 'react';
import axios from 'axios';
import { Unlock } from 'lucide-react';
import AuthDemo from '../components/AuthDemo';

const Part1NoAuth = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const handleFetch = async () => {
        try {
            setError(null);
            const res = await axios.get('http://localhost:8001/public');
            setData(res.data);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <AuthDemo
            title="Part 1: No Auth"
            description="Public endpoint accessible by anyone without credentials."
            icon={Unlock}
            color="border-slate-600"
            onFetch={handleFetch}
            requiresLogin={false}
            responseData={data}
            error={error}
        />
    );
};

export default Part1NoAuth;
