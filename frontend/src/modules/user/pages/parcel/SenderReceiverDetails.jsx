import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, User, Phone, MapPin, Search } from 'lucide-react';

const SenderReceiverDetails = () => {
  const [senderName, setSenderName] = useState('Hritik Raghuwanshi');
  const [senderMobile, setSenderMobile] = useState('9876543210');
  const [receiverName, setReceiverName] = useState('');
  const [receiverMobile, setReceiverMobile] = useState('');
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FDFDFD] max-w-lg mx-auto flex flex-col font-sans relative">
      <header className="bg-white px-5 py-6 flex items-center gap-6 border-b border-gray-50 shadow-sm sticky top-0 z-20">
         <button onClick={() => navigate(-1)} className="p-2 -ml-2 active:scale-90 transition-all">
            <ArrowLeft size={24} className="text-gray-900" strokeWidth={3} />
         </button>
         <div>
            <h1 className="text-[20px] font-extrabold text-gray-900 tracking-tight leading-none">Contacts</h1>
            <p className="text-[12px] font-bold text-gray-400 mt-1 uppercase tracking-widest">Who are we connecting?</p>
         </div>
      </header>

      <div className="flex-1 p-5 space-y-10 overflow-y-auto no-scrollbar">
         {/* SENDER SECTION */}
         <div className="space-y-4">
             <div className="flex items-center gap-3 ml-1">
                <div className="w-8 h-8 rounded-xl bg-orange-50 flex items-center justify-center text-primary">
                    <User size={18} strokeWidth={3} />
                </div>
                <h3 className="text-[16px] font-black text-gray-900 tracking-tight leading-none">Sender Details</h3>
             </div>
             <div className="bg-white rounded-[32px] p-5 shadow-lg shadow-gray-100 border border-gray-50 space-y-4">
                <div className="space-y-1">
                   <label className="text-[12px] font-black text-gray-400 ml-1">Sender Name</label>
                   <input 
                      type="text" 
                      className="w-full bg-gray-50/50 rounded-2xl p-4 text-[15px] font-bold text-gray-900 focus:outline-none focus:ring-2 ring-primary/10 transition-all"
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                   />
                </div>
                <div className="space-y-1">
                   <label className="text-[12px] font-black text-gray-400 ml-1">Sender Mobile</label>
                   <div className="flex items-center gap-3 bg-gray-50/50 rounded-2xl p-4 ring-primary/10 focus-within:ring-2 transition-all">
                      <Phone size={18} className="text-gray-400" />
                      <input 
                         type="tel" 
                         className="flex-1 bg-transparent border-none text-[15px] font-bold text-gray-900 focus:outline-none"
                         value={senderMobile}
                         onChange={(e) => setSenderMobile(e.target.value)}
                      />
                   </div>
                </div>
             </div>
         </div>

         {/* RECEIVER SECTION */}
         <div className="space-y-4 pb-20">
             <div className="flex items-center gap-3 ml-1">
                <div className="w-8 h-8 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                    <MapPin size={18} strokeWidth={3} />
                </div>
                <h3 className="text-[16px] font-black text-gray-900 tracking-tight leading-none">Receiver Details</h3>
             </div>
             <div className="bg-white rounded-[32px] p-5 shadow-lg shadow-gray-100 border border-gray-50 space-y-4">
                <div className="space-y-1">
                   <label className="text-[12px] font-black text-gray-400 ml-1">Receiver Name</label>
                   <input 
                      type="text" 
                      placeholder="Enter receiver's name"
                      className="w-full bg-gray-50/50 rounded-2xl p-4 text-[15px] font-bold text-gray-900 focus:outline-none focus:ring-2 ring-blue-100 transition-all placeholder:text-gray-300"
                      value={receiverName}
                      onChange={(e) => setReceiverName(e.target.value)}
                   />
                </div>
                <div className="space-y-1">
                   <label className="text-[12px] font-black text-gray-400 ml-1">Receiver Mobile</label>
                   <div className="flex items-center gap-3 bg-gray-50/50 rounded-2xl p-4 ring-blue-100 focus-within:ring-2 transition-all group">
                      <Phone size={18} className="text-gray-400" />
                      <input 
                         type="tel" 
                         placeholder="10-digit mobile number"
                         className="flex-1 bg-transparent border-none text-[15px] font-bold text-gray-900 focus:outline-none placeholder:text-gray-300"
                         value={receiverMobile}
                         onChange={(e) => setReceiverMobile(e.target.value)}
                      />
                      <button className="text-blue-500 hover:text-blue-600 transition-colors">
                         <Search size={18} />
                      </button>
                   </div>
                </div>
             </div>
         </div>
      </div>

      <div className="p-6 bg-white border-t border-gray-50 pb-10 sticky bottom-0 z-30">
         <motion.button 
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/ride/select-vehicle')}
            className="w-full bg-[#1C2833] py-5 rounded-[28px] text-[18px] font-black text-white shadow-xl shadow-gray-200 active:bg-black transition-all flex items-center justify-center gap-2"
         >
            <span>Proceed to Payment</span>
            <ArrowLeft size={18} className="rotate-180 opacity-40" />
         </motion.button>
      </div>
    </div>
  );
};

export default SenderReceiverDetails;
