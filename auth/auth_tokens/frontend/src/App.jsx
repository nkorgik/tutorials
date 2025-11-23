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
        <div className="min-h-screen bg-slate-950 p-8 flex flex-col items-center justify-center">
            <div className="w-full max-w-2xl space-y-8">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        Authentication Evolution
                    </h1>
                    <p className="text-slate-400">
                        Step {currentStep + 1} of {STEPS.length}: {STEPS[currentStep].title}
                    </p>

                    {/* Progress Bar */}
                    <div className="flex justify-center gap-2 mt-4">
                        {STEPS.map((_, idx) => (
                            <div
                                key={idx}
                                className={`h-2 rounded-full transition-all duration-300 ${idx === currentStep ? 'w-8 bg-blue-500' : 'w-2 bg-slate-700'
                                    }`}
                            />
                        ))}
                    </div>
                </div>

                <div className="relative min-h-[500px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentStep}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
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
                        className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${currentStep === 0
                                ? 'text-slate-600 cursor-not-allowed'
                                : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                            }`}
                    >
                        <ChevronLeft size={20} />
                        Previous
                    </button>

                    <button
                        onClick={nextStep}
                        disabled={currentStep === STEPS.length - 1}
                        className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${currentStep === STEPS.length - 1
                                ? 'text-slate-600 cursor-not-allowed'
                                : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20'
                            }`}
                    >
                        Next Level
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default App;
