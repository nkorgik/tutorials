import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, Shield, AlertCircle, CheckCircle, Terminal } from 'lucide-react';

const AuthDemo = ({
    title,
    description,
    icon: Icon,
    color,
    onFetch,
    onLogin,
    loginFields,
    requiresLogin,
    isLoggedIn,
    responseData,
    error,
    token,
    onLogout
}) => {
    const [credentials, setCredentials] = useState({});
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        await onLogin(credentials);
        setLoading(false);
    };

    const handleFetch = async () => {
        setLoading(true);
        await onFetch();
        setLoading(false);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`bg-slate-800 rounded-xl overflow-hidden border border-slate-700 shadow-xl ${color}`}
        >
            <div className="p-6 border-b border-slate-700 bg-slate-800/50">
                <div className="flex items-center gap-3 mb-2">
                    <div className={`p-2 rounded-lg bg-slate-700 ${color.replace('border-', 'text-')}`}>
                        <Icon size={24} />
                    </div>
                    <h2 className="text-xl font-bold text-white">{title}</h2>
                </div>
                <p className="text-slate-400 text-sm">{description}</p>
            </div>

            <div className="p-6 space-y-6">
                {requiresLogin && !isLoggedIn && (
                    <form onSubmit={handleLogin} className="space-y-4">
                        {loginFields.map(field => (
                            <div key={field.name}>
                                <label className="block text-xs font-medium text-slate-400 mb-1 uppercase">{field.label}</label>
                                <input
                                    type={field.type}
                                    name={field.name}
                                    placeholder={field.placeholder}
                                    onChange={handleInputChange}
                                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                />
                            </div>
                        ))}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                        >
                            {loading ? 'Processing...' : 'Login'}
                        </button>
                    </form>
                )}

                {(!requiresLogin || isLoggedIn) && (
                    <div className="space-y-4">
                        {isLoggedIn && (
                            <div className="flex items-center gap-2 text-green-400 bg-green-400/10 p-3 rounded-lg text-sm">
                                <CheckCircle size={16} />
                                <span>Authenticated</span>
                            </div>
                        )}

                        {token && (
                            <div className="bg-slate-950 rounded-lg p-3 border border-slate-800">
                                <div className="flex items-center gap-2 text-slate-400 mb-2 text-xs uppercase font-bold">
                                    <Shield size={12} />
                                    <span>Current Token</span>
                                </div>
                                <code className="text-xs text-yellow-500 break-all font-mono block">
                                    {token}
                                </code>
                            </div>
                        )}

                        <div className="grid grid-cols-2 gap-3">
                            <button
                                onClick={handleFetch}
                                disabled={loading}
                                className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                            >
                                {loading ? 'Fetching...' : 'Fetch Data'}
                            </button>

                            {onLogout && (
                                <button
                                    onClick={onLogout}
                                    disabled={loading}
                                    className="bg-red-600 hover:bg-red-500 text-white font-medium py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                                >
                                    Revoke Token
                                </button>
                            )}
                        </div>
                    </div>
                )}

                <AnimatePresence mode="wait">
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-400 text-sm flex items-start gap-3"
                        >
                            <AlertCircle size={18} className="mt-0.5 shrink-0" />
                            <div>{error}</div>
                        </motion.div>
                    )}

                    {responseData && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="bg-slate-950 rounded-lg border border-slate-800 overflow-hidden"
                        >
                            <div className="flex items-center gap-2 px-4 py-2 bg-slate-900 border-b border-slate-800 text-slate-400 text-xs font-mono">
                                <Terminal size={12} />
                                <span>Response</span>
                            </div>
                            <pre className="p-4 text-xs font-mono text-blue-300 overflow-x-auto">
                                {JSON.stringify(responseData, null, 2)}
                            </pre>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default AuthDemo;
