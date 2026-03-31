import React from 'react';
import { motion } from 'framer-motion';

const RegistrationProgress = ({ currentStep, totalSteps = 5 }) => {
    const steps = [
        { label: 'Personal' },
        { label: 'Vehicle' },
        { label: 'Documents' },
        { label: 'Selfie' },
        { label: 'Bank' }
    ];

    const progress = (currentStep / totalSteps) * 100;

    return (
        <div className="w-full mb-8 pt-4">
            <div className="flex items-center justify-between mb-3 px-2">
                <span className="text-[10px] font-black text-taxi-primary uppercase tracking-[0.2em]">Step {currentStep} of {totalSteps}</span>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{Math.round(progress)}% Complete</span>
            </div>
            
            <div className="relative h-2.5 w-full bg-slate-100/50 rounded-full overflow-hidden shadow-inner border border-slate-50">
                <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-taxi-primary to-orange-400 rounded-full shadow-[0_0_15px_rgba(240,196,25,0.4)]"
                />
            </div>

            <div className="flex justify-between mt-3 px-1">
                {steps.map((step, idx) => {
                    const isCompleted = idx + 1 < currentStep;
                    const isActive = idx + 1 === currentStep;
                    return (
                        <div key={idx} className="flex flex-col items-center gap-1.5 min-w-[50px]">
                            <div className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
                                isCompleted ? 'bg-emerald-500 scale-125' : 
                                isActive ? 'bg-taxi-primary scale-150 ring-4 ring-taxi-primary/20' : 
                                'bg-slate-200'
                            }`} />
                            <span className={`text-[8px] font-black uppercase tracking-tighter transition-colors duration-300 ${
                                isActive ? 'text-taxi-text' : 
                                isCompleted ? 'text-emerald-500/70' : 
                                'text-slate-300'
                            }`}>
                                {step.label}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default RegistrationProgress;
