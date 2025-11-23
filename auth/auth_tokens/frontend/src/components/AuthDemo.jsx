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
            layout
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            className={`backdrop-blur-xl bg-slate-900/80 rounded-2xl overflow-hidden border border-slate-700/50 shadow-2xl ${color}`}
        >
            <div className="p-6 border-b border-slate-700/50 bg-slate-800/30">
                <div className="flex items-center gap-3 mb-2">
                    <div className={`p-2.5 rounded-xl bg-slate-800 shadow-inner ${color.replace('border-', 'text-')}`}>
                        <Icon size={24} />
                    </div>
                    <h2 className="text-xl font-bold text-white tracking-tight">{title}</h2>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
            </div>

            <div className="p-6 space-y-6">
                {requiresLogin && !isLoggedIn && (
                    <form onSubmit={handleLogin} className="space-y-4">
                        {loginFields.map(field => (
                            <div key={field.name}>
                                <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase tracking-wider">{field.label}</label>
                                <input
                                    type={field.type}
                                    name={field.name}
                                    placeholder={field.placeholder}
                                    onChange={handleInputChange}
                                    className="w-full bg-slate-950/50 border border-slate-700/50 rounded-xl px-4 py-2.5 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300"
                                />
                            </div>
                        ))}
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold py-2.5 rounded-xl shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
                        >
                            {loading ? 'Processing...' : 'Login'}
                        </motion.button>
                    </form>
                )}

                {(!requiresLogin || isLoggedIn) && (
                    <div className="space-y-4">
                        {isLoggedIn && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex items-center gap-2 text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 p-3 rounded-xl text-sm font-medium"
                            >
                                <CheckCircle size={16} />
                                <span>Authenticated Successfully</span>
                            </motion.div>
                        )}

                        {token && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-slate-950/80 rounded-xl p-4 border border-slate-800 shadow-inner group relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                <div className="flex items-center gap-2 text-slate-400 mb-2 text-xs uppercase font-bold tracking-wider">
                                    <Shield size={12} />
                                    <span>Active Session Token</span>
                                </div>
                                <code className="text-xs text-amber-400 break-all font-mono block leading-relaxed opacity-90">
                                    {token}
                                </code>
                            </motion.div>
                        )}

                        <div className="grid grid-cols-2 gap-3">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleFetch}
                                disabled={loading}
                                className="bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-semibold py-2.5 rounded-xl shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
                            >
                                {loading ? 'Fetching...' : 'Fetch Data'}
                            </motion.button>

                            {onLogout && (
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={onLogout}
                                    disabled={loading}
                                    className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-semibold py-2.5 rounded-xl shadow-lg shadow-red-500/20 transition-all flex items-center justify-center gap-2"
                                >
                                    Revoke Token
                                </motion.button>
                            )}
                        </div>
                    </div>
                )}

                <AnimatePresence mode="wait">
                    {error && (
                        <motion.div
                            layout
                            initial={{ opacity: 0, y: -10, height: 0 }}
                            animate={{ opacity: 1, y: 0, height: 'auto' }}
                            exit={{ opacity: 0, y: -10, height: 0 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="overflow-hidden"
                        >
                            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-red-400 text-sm flex items-start gap-3">
                                <AlertCircle size={18} className="mt-0.5 shrink-0" />
                                <div className="font-medium">{error}</div>
                            </div>
                        </motion.div>
                    )}

                    {responseData && (
                        <motion.div
                            layout
                            initial={{ opacity: 0, y: 10, height: 0 }}
                            animate={{ opacity: 1, y: 0, height: 'auto' }}
                            exit={{ opacity: 0, y: 10, height: 0 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden shadow-inner"
                        >
                            <div className="flex items-center gap-2 px-4 py-2 bg-slate-900 border-b border-slate-800 text-slate-400 text-xs font-mono uppercase tracking-wider">
                                <Terminal size={12} />
                                <span>Server Response</span>
                            </div>
                            <pre className="p-4 text-xs font-mono text-blue-300 overflow-x-auto custom-scrollbar">
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
