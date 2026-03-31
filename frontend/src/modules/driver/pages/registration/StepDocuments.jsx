import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
    ArrowLeft, 
    Upload, 
    CheckCircle2, 
    FileText, 
    X, 
    Eye, 
    AlertCircle, 
    Camera, 
    ShieldCheck, 
    ChevronRight,
    Save
} from 'lucide-react';
import RegistrationProgress from '../../../shared/components/RegistrationProgress';

const StepDocuments = () => {
    const navigate = useNavigate();
    const [docs, setDocs] = useState([
        { id: 'license', title: 'Driving License', sub: 'Front side view', status: 'completed' },
        { id: 'aadhar', title: 'Aadhar Card', sub: 'Front & Back', status: 'not_started' },
        { id: 'pan', title: 'PAN Card', sub: 'Clearly visible name & number', status: 'not_started' },
        { id: 'rc', title: 'Vehicle RC', sub: 'Registration certificate', status: 'not_started' },
        { id: 'insure', title: 'Insurance', sub: 'Valid insurance policy', status: 'not_started' }
    ]);

    const handleSave = () => {
        navigate('/taxi/driver/step-selfie');
    };

    return (
        <div className="min-h-screen bg-taxi-bg font-sans select-none overflow-x-hidden p-8 pb-32 flex flex-col pt-6">
            <header className="flex items-center justify-between mb-2">
                <button 
                    onClick={() => navigate(-1)}
                    className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center text-taxi-text active:scale-90 transition-transform"
                >
                    <ArrowLeft size={20} strokeWidth={2.5} />
                </button>
                <div className="text-center">
                    <h1 className="text-xl font-black text-taxi-text tracking-tight uppercase">Registration</h1>
                </div>
                <div className="w-12" />
            </header>

            <RegistrationProgress currentStep={3} />

            <main className="flex-1 space-y-8 flex flex-col pt-4">
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-3"
                >
                    <h2 className="text-3xl font-black text-taxi-text leading-tight tracking-tight">
                        KYC Documents
                    </h2>
                    <p className="text-[14px] font-bold text-slate-400">
                        Upload clear photos of your original documents for verification.
                    </p>
                </motion.div>

                {/* Secure Badge */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center gap-3 bg-emerald-50 rounded-[2.2rem] p-5 border border-emerald-100/50 mx-1 shadow-sm"
                >
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-emerald-500 shadow-sm">
                        <ShieldCheck size={24} />
                    </div>
                    <div className="space-y-0.5">
                        <h4 className="text-[13px] font-black text-emerald-900 leading-none">Safe & Secure</h4>
                        <p className="text-[10px] font-bold text-emerald-600/70 uppercase tracking-tighter">Your data is encrypted & protected.</p>
                    </div>
                </motion.div>

                {/* List of Documents */}
                <div className="space-y-4 pb-10">
                    {docs.map((doc, index) => (
                        <motion.div 
                            key={doc.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 * index }}
                            className="bg-white p-5 rounded-[2.2rem] shadow-sm border border-slate-50 flex items-center justify-between group active:scale-98 transition-all hover:border-taxi-primary/20"
                        >
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-105 shadow-sm border border-slate-50 ${doc.status === 'completed' ? 'bg-emerald-50 text-emerald-500' : 'bg-slate-50 text-slate-400'}`}>
                                    <FileText size={20} />
                                </div>
                                <div className="space-y-0.5">
                                    <h4 className="text-[15px] font-black text-taxi-text leading-tight tracking-tight">{doc.title}</h4>
                                    <p className="text-[10px] font-bold text-slate-400 opacity-60 uppercase tracking-tighter">{doc.sub}</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-2">
                                {doc.status === 'completed' ? (
                                    <div className="flex items-center gap-2">
                                         <button className="w-9 h-9 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-slate-100 active:scale-95 transition-all shadow-sm border border-slate-100">
                                             <Eye size={16} />
                                         </button>
                                         <CheckCircle2 size={24} className="text-emerald-500" strokeWidth={3} />
                                    </div>
                                ) : (
                                    <button className="h-10 px-4 bg-taxi-primary/10 text-taxi-secondary rounded-xl flex items-center justify-center gap-2 text-[12px] font-black uppercase tracking-wider active:scale-95 transition-all border border-taxi-primary/10 hover:bg-taxi-primary hover:text-taxi-text shadow-sm transition-colors">
                                         <Camera size={16} strokeWidth={2.5} />
                                         Upload
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </main>

            {/* Bottom Panel */}
            <div className="fixed bottom-0 left-0 right-0 p-8 pt-4 pb-12 bg-white/50 backdrop-blur-xl z-50">
                <motion.button 
                    whileTap={{ scale: 0.96 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={handleSave}
                    className="w-full h-18 bg-taxi-primary text-taxi-text py-4 rounded-3xl flex items-center justify-center gap-3 text-[18px] font-black shadow-xl shadow-taxi-primary/10 border border-taxi-primary/80 active:scale-95 transition-all tracking-tight uppercase"
                >
                    Save & Continue <ChevronRight size={22} strokeWidth={3} />
                </motion.button>
            </div>
        </div>
    );
};

export default StepDocuments;
