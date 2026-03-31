import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Box, ShieldCheck, ChevronRight, Scale, AlertTriangle } from 'lucide-react';

const ParcelDetails = () => {
  const [weight, setWeight] = useState('Under 5kg');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F9F9F9] max-w-lg mx-auto flex flex-col font-sans relative">
      <header className="bg-white px-5 py-6 flex items-center gap-6 border-b border-gray-50 shadow-sm sticky top-0 z-20">
         <button onClick={() => navigate(-1)} className="p-2 -ml-2 active:scale-90 transition-all">
            <ArrowLeft size={24} className="text-gray-900" strokeWidth={3} />
         </button>
         <div>
            <h1 className="text-[20px] font-extrabold text-gray-900 tracking-tight leading-none">Parcel Details</h1>
            <p className="text-[12px] font-bold text-gray-400 mt-1 uppercase tracking-widest">Weight & Item Info</p>
         </div>
      </header>

      <div className="flex-1 p-5 space-y-8">
         {/* Weight Toggle Area */}
         <div className="space-y-4">
             <h3 className="text-[16px] font-black text-gray-900 ml-1">Approximate Weight</h3>
             <div className="grid grid-cols-2 gap-3 bg-white p-2 rounded-[28px] border border-gray-50 shadow-sm">
                <button 
                   onClick={() => setWeight('Under 5kg')}
                   className={`py-5 rounded-[22px] flex flex-col items-center gap-2 transition-all ${
                       weight === 'Under 5kg' ? 'bg-primary text-white shadow-lg shadow-orange-200 scale-100' : 'bg-transparent text-gray-400'
                   }`}
                >
                    <Scale size={24} />
                    <span className="text-[14px] font-black uppercase tracking-tight">Under 5 kg</span>
                </button>
                <button 
                   onClick={() => setWeight('Above 5kg')}
                   className={`py-5 rounded-[22px] flex flex-col items-center gap-2 transition-all ${
                       weight === 'Above 5kg' ? 'bg-primary text-white shadow-lg shadow-orange-200 scale-100' : 'bg-transparent text-gray-400'
                   }`}
                >
                    <Box size={24} />
                    <span className="text-[14px] font-black uppercase tracking-tight">Above 5 kg</span>
                </button>
             </div>
         </div>

         {/* Item Name Input Area */}
         <div className="space-y-4">
             <h3 className="text-[16px] font-black text-gray-900 ml-1">What are you sending?</h3>
             <div className="bg-white rounded-[24px] p-2 border border-gray-50 shadow-sm">
                <textarea 
                   rows="3"
                   placeholder="e.g. My Laptop Charger and some clothes..."
                   className="w-full bg-gray-50/30 border-none rounded-2xl p-5 text-[15px] font-bold text-gray-900 focus:outline-none placeholder:text-gray-300 resize-none"
                   value={description}
                   onChange={(e) => setDescription(e.target.value)}
                ></textarea>
             </div>
         </div>

         {/* Restrictions Warning */}
         <div className="bg-orange-50 border border-orange-100 rounded-[28px] p-5 flex gap-4">
             <AlertTriangle size={24} className="text-primary shrink-0 mt-0.5" strokeWidth={3} />
             <div className="space-y-1">
                <span className="text-[13px] font-black text-gray-800 uppercase tracking-tight">Restricted Items</span>
                <p className="text-[11px] font-bold text-gray-500 leading-normal">
                   Drugs, Alcohol, Explosives, and Items above ₹5,000 are not allowed for delivery.
                </p>
             </div>
         </div>
      </div>

      <div className="p-6 bg-white border-t border-gray-50 pb-10">
         <motion.button 
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/parcel/contacts')}
            className="w-full bg-[#1C2833] py-5 rounded-[28px] text-[18px] font-black text-white shadow-xl shadow-gray-200 active:bg-black transition-all flex items-center justify-center gap-2"
         >
            <span>Sender & Receiver</span>
            <ChevronRight size={20} className="opacity-40" />
         </motion.button>
      </div>
    </div>
  );
};

export default ParcelDetails;
