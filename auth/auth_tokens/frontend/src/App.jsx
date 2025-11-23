import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import Part1NoAuth from './parts/Part1NoAuth';
import Part2BasicAuth from './parts/Part2BasicAuth';
import Part3Bearer from './parts/Part3Bearer';
import Part4JWT from './parts/Part4JWT';

const STEPS = [
    { component: Part1NoAuth, title: "Level 1: No Authentication" },
    { component: Part2BasicAuth, title: "Level 2: Basic Auth" },
    { component: Part3Bearer, title: "Level 3: Bearer Token" },
    { component: Part4JWT, title: "Level 4: JWT" }
];

function App() {
    const [currentStep, setCurrentStep] = useState(0);

    const nextStep = () => {
        if (currentStep < STEPS.length - 1) setCurrentStep(c => c + 1);
    };

    const prevStep = () => {
        if (currentStep > 0) setCurrentStep(c => c - 1);
    };

    const CurrentComponent = STEPS[currentStep].component;

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 p-8 flex flex-col items-center justify-center relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px]" />
            </div>

            <div className="w-full max-w-2xl space-y-8 relative z-10">
                <div className="text-center space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent tracking-tight mb-2">
                            Authentication Evolution
                        </h1>
                        <p className="text-slate-400 text-lg">
                            Mastering security patterns from open access to JWTs
                        </p>
                    </motion.div>

                    {/* Progress Bar */}
                    <div className="flex flex-col items-center gap-3">
                        <div className="flex justify-center gap-2">
                            {STEPS.map((step, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={false}
                                    animate={{
                                        width: idx === currentStep ? 32 : 8,
                                        backgroundColor: idx === currentStep ? '#60A5FA' : '#334155'
                                    }}
                                    className={`h-2 rounded-full transition-colors duration-300`}
                                />
                            ))}
                        </div>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                            {STEPS[currentStep].title}
                        </p>
                    </div>
                </div>

                <div className="relative min-h-[500px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentStep}
                            initial={{ opacity: 0, x: 20, filter: 'blur(10px)' }}
                            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, x: -20, filter: 'blur(10px)' }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="w-full"
                        >
                            <CurrentComponent />
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div className="flex justify-between items-center pt-4">
                    <button
                        onClick={prevStep}
                        disabled={currentStep === 0}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${currentStep === 0
                            ? 'text-slate-700 cursor-not-allowed'
                            : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                            }`}
                    >
                        <ChevronLeft size={20} />
                        Previous
                    </button>

                    <button
                        onClick={nextStep}
                        disabled={currentStep === STEPS.length - 1}
                        className={`flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold transition-all duration-300 shadow-lg ${currentStep === STEPS.length - 1
                            ? 'bg-slate-800 text-slate-600 cursor-not-allowed shadow-none'
                            : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5'
                            }`}
                    >
                        Next Level
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>
            {/* Security Level Indicator (Horizontal) */}
            <div className="fixed bottom-8 left-8 hidden xl:flex flex-col gap-3 items-start">
                <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                        Security Level
                    </span>
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`text-sm font-bold ${currentStep === 0 ? 'text-red-400' :
                                currentStep === 1 ? 'text-orange-400' :
                                    currentStep === 2 ? 'text-purple-400' :
                                        'text-emerald-400'
                            }`}
                    >
                        {currentStep === 0 ? 'NONE' :
                            currentStep === 1 ? 'LOW' :
                                currentStep === 2 ? 'MEDIUM' :
                                    'HIGH'}
                    </motion.div>
                </div>
                <div className="w-64 h-3 bg-slate-800 rounded-full relative overflow-hidden">
                    <motion.div
                        className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-red-500 via-yellow-500 to-emerald-500"
                        initial={false}
                        animate={{ width: `${(currentStep + 1) * 25}%` }}
                        transition={{ duration: 0.8, type: "spring" }}
                    />
                </div>
            </div>

            {/* Decorative SVG */}
            <div className="absolute bottom-0 right-0 pointer-events-none opacity-20">
                <svg width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="350" cy="350" r="150" stroke="url(#paint0_linear)" strokeWidth="2" strokeDasharray="10 10" />
                    <circle cx="350" cy="350" r="100" stroke="url(#paint1_linear)" strokeWidth="40" strokeOpacity="0.2" />
                    <circle cx="350" cy="350" r="50" fill="url(#paint2_radial)" />
                    <defs>
                        <linearGradient id="paint0_linear" x1="200" y1="200" x2="500" y2="500" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#60A5FA" />
                            <stop offset="1" stopColor="#A855F7" />
                        </linearGradient>
                        <linearGradient id="paint1_linear" x1="350" y1="250" x2="350" y2="450" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#60A5FA" />
                            <stop offset="1" stopColor="#A855F7" />
                        </linearGradient>
                        <radialGradient id="paint2_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(350 350) rotate(90) scale(50)">
                            <stop stopColor="#F59E0B" />
                            <stop offset="1" stopColor="#F59E0B" stopOpacity="0" />
                        </radialGradient>
                    </defs>
                </svg>
            </div>
        </div>
    );
}

export default App;
