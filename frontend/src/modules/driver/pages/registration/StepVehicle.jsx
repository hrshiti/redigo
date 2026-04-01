import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Car, Bike, Info, Save, ChevronRight, Hash, Database, Palette } from 'lucide-react';
import RegistrationProgress from '../../../shared/components/RegistrationProgress';

const StepVehicle = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        type: 'bike',
        brand: '',
        model: '',
        plate: '',
        color: ''
    });

    const vehicleTypes = [
        { id: 'bike', label: 'Bike', icon: <Bike size={24} />, sub: 'Quick & Agile' },
        { id: 'auto', label: 'Auto', icon: <div className="text-2xl">🛺</div>, sub: 'Local Transit' },
        { id: 'cab', label: 'Cab', icon: <Car size={24} />, sub: 'City Comfort' }
    ];

    const handleSave = () => {
        navigate('/taxi/driver/step-documents');
    };

    return (
        <div className="min-h-screen bg-taxi-bg font-sans select-none overflow-x-hidden p-6 pb-28 flex flex-col pt-4">
            <div className="sticky top-0 z-50 bg-taxi-bg/95 backdrop-blur-md -mx-6 px-6 pt-4 border-b border-slate-100/50 mb-2">
                <header className="flex items-center justify-between mb-2">
                    <button 
                        onClick={() => navigate(-1)}
                        className="w-10 h-10 bg-white rounded-xl shadow-sm border border-slate-100 flex items-center justify-center text-taxi-text active:scale-90 transition-transform"
                    >
                        <ArrowLeft size={18} strokeWidth={2.5} />
                    </button>
                    <div className="text-center">
                        <h1 className="text-lg font-black text-taxi-text tracking-tight uppercase">Registration</h1>
                    </div>
                    <div className="w-10" />
                </header>

                <RegistrationProgress currentStep={2} totalSteps={4} />
            </div>

            <main className="flex-1 space-y-8 flex flex-col pt-4">
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-3"
                >
                    <h2 className="text-2xl font-black text-taxi-text leading-tight tracking-tight">
                        Vehicle Details
                    </h2>
                    <p className="text-[14px] font-bold text-slate-400">
                        Choose the primary vehicle you'll use for rides with Redigo.
                    </p>
                </motion.div>

                <div className="space-y-10 pb-10">
                    {/* Vehicle Type Grid Selector */}
                    <div className="space-y-4">
                        <label className="text-[12px] font-black text-slate-400 uppercase tracking-widest pl-2 opacity-60">Choose Vehicle Type</label>
                        <div className="grid grid-cols-3 gap-3">
                             {vehicleTypes.map((v, index) => (
                                 <motion.button 
                                    key={v.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.1 * index }}
                                    onClick={() => setFormData({...formData, type: v.id})}
                                    className={`flex flex-col items-center justify-center p-3 rounded-2xl border-2 transition-all gap-1 h-28 ${
                                        formData.type === v.id 
                                        ? 'bg-taxi-primary border-taxi-primary shadow-xl shadow-taxi-primary/20 scale-105' 
                                        : 'bg-white border-slate-50 text-slate-400'
                                    }`}
                                 >
                                     <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform ${formData.type === v.id ? 'bg-white/20 text-taxi-text' : 'bg-slate-50 text-slate-300'}`}>
                                         {v.icon}
                                     </div>
                                     <div className="text-center pt-2">
                                         <h4 className={`text-[13px] font-black tracking-tight leading-none ${formData.type === v.id ? 'text-taxi-text' : 'text-taxi-text/60'}`}>{v.label}</h4>
                                         <p className={`text-[8px] font-bold mt-1 uppercase tracking-tighter ${formData.type === v.id ? 'text-taxi-text/80' : 'text-slate-400'}`}>{v.sub}</p>
                                     </div>
                                 </motion.button>
                             ))}
                        </div>
                    </div>

                    {/* Detailed Row Inputs */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="space-y-6"
                    >
                        <div className="space-y-2">
                            <label className="text-[12px] font-black text-slate-400 uppercase tracking-widest pl-2 opacity-60">Vehicle Brand & Model</label>
                            <div className="relative group">
                                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 transition-colors group-focus-within:text-taxi-primary">
                                    <Database size={20} />
                                </div>
                                <input 
                                    type="text" 
                                    placeholder="e.g. Maruti Suzuki WagonR"
                                    value={formData.brand}
                                    onChange={(e) => setFormData({...formData, brand: e.target.value})}
                                    className="w-full h-14 bg-white border-2 border-slate-100 rounded-2xl pl-16 pr-6 text-[15px] font-black text-taxi-text focus:outline-none focus:border-taxi-primary transition-all shadow-sm focus:shadow-xl focus:shadow-taxi-primary/10"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                             <label className="text-[12px] font-black text-slate-400 uppercase tracking-widest pl-2 opacity-60">Number Plate</label>
                             <div className="relative group">
                                 <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 transition-colors group-focus-within:text-taxi-primary">
                                     <Hash size={20} />
                                 </div>
                                 <input 
                                    type="text" 
                                    placeholder="MP 09 AB 1234"
                                    value={formData.plate}
                                    onChange={(e) => setFormData({...formData, plate: e.target.value})}
                                    className="w-full h-14 bg-white border-2 border-slate-100 rounded-2xl pl-16 pr-6 text-base font-black text-taxi-text focus:outline-none focus:border-taxi-primary transition-all shadow-sm font-mono uppercase placeholder:normal-case placeholder:text-slate-200 placeholder:text-[14px] focus:shadow-xl focus:shadow-taxi-primary/10"
                                 />
                             </div>
                        </div>

                        <div className="space-y-2">
                             <label className="text-[12px] font-black text-slate-400 uppercase tracking-widest pl-2 opacity-60">Color</label>
                             <div className="relative group">
                                 <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 transition-colors group-focus-within:text-taxi-primary">
                                     <Palette size={20} />
                                 </div>
                                 <input 
                                    type="text" 
                                    placeholder="White, Silver, etc."
                                    value={formData.color}
                                    onChange={(e) => setFormData({...formData, color: e.target.value})}
                                    className="w-full h-14 bg-white border-2 border-slate-100 rounded-2xl pl-16 pr-6 text-[15px] font-black text-taxi-text focus:outline-none focus:border-taxi-primary transition-all shadow-sm focus:shadow-xl focus:shadow-taxi-primary/10"
                                 />
                             </div>
                        </div>

                        {/* Notice */}
                        <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100 flex items-start gap-4 mx-1">
                            <Info size={18} className="text-blue-500 flex-shrink-0 mt-0.5" />
                            <p className="text-[11px] font-bold text-blue-700/70 leading-relaxed">
                                Ensure the number plate matches your RC. Incorrect information may delay your application approval by up to 3 days.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </main>

            <div className="fixed bottom-0 left-0 right-0 p-6 pt-3 pb-8 bg-white/80 backdrop-blur-xl z-50 border-t border-slate-50">
                <motion.button 
                    whileTap={{ scale: 0.96 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={handleSave}
                    className="w-full h-14 bg-taxi-primary text-taxi-text py-4 rounded-2xl flex items-center justify-center gap-3 text-[17px] font-black shadow-xl shadow-taxi-primary/10 border border-taxi-primary/80 active:scale-95 transition-all tracking-tight uppercase"
                >
                    Save & Continue <ChevronRight size={22} strokeWidth={3} />
                </motion.button>
            </div>
        </div>
    );
};

export default StepVehicle;
