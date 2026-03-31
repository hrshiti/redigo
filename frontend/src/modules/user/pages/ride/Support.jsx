import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MessageCircle, Phone, HelpCircle, AlertCircle, XCircle, ShieldCheck } from 'lucide-react';

const Support = () => {
  const navigate = useNavigate();

  const helpTopics = [
    { title: "Driver didn't arrive", icon: <XCircle size={22} className="text-red-500" /> },
    { title: "Safety concern during ride", icon: <ShieldCheck size={22} className="text-blue-500" /> },
    { title: "I lost an item", icon: <HelpCircle size={22} className="text-orange-500" /> },
    { title: "Fare issue / Payment failure", icon: <AlertCircle size={22} className="text-gray-900" /> },
  ];

  return (
    <div className="min-h-screen bg-[#FDFDFD] max-w-lg mx-auto flex flex-col font-sans relative">
      <header className="bg-white px-5 py-6 flex items-center gap-6 border-b border-gray-50 shadow-sm sticky top-0 z-20">
         <button onClick={() => navigate(-1)} className="p-2 -ml-2 active:scale-90 transition-all">
            <ArrowLeft size={24} className="text-gray-900" strokeWidth={3} />
         </button>
         <h1 className="text-[20px] font-extrabold text-gray-900 tracking-tight">Help & Support</h1>
      </header>

      <div className="p-5 flex-1 space-y-6">
         {/* Live Contact Options */}
         <div className="grid grid-cols-2 gap-4">
            <div className="bg-white border border-gray-50 rounded-[32px] p-6 shadow-sm flex flex-col items-center justify-center text-center gap-3 active:scale-[0.98] transition-all cursor-pointer group">
               <div className="w-12 h-12 bg-orange-50 text-primary rounded-2xl flex items-center justify-center transition-colors group-hover:bg-primary group-hover:text-white">
                  <MessageCircle size={24} strokeWidth={2.5} />
               </div>
               <span className="text-[14px] font-black text-gray-900 leading-tight">Live Chat Support</span>
            </div>
            <div className="bg-white border border-gray-50 rounded-[32px] p-6 shadow-sm flex flex-col items-center justify-center text-center gap-3 active:scale-[0.98] transition-all cursor-pointer group">
               <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center transition-colors group-hover:bg-blue-600 group-hover:text-white">
                  <Phone size={24} strokeWidth={2.5} />
               </div>
               <span className="text-[14px] font-black text-gray-900 leading-tight">Call Helpline Support</span>
            </div>
         </div>

         {/* Common Help Topics Area */}
         <div className="pt-4">
            <h3 className="text-[18px] font-extrabold text-gray-900 mb-5 ml-1 tracking-tight uppercase tracking-widest text-xs opacity-40">Choose a Topic</h3>
            <div className="space-y-4">
               {helpTopics.map((topic, idx) => (
                  <motion.div 
                     key={idx} 
                     whileTap={{ scale: 0.98 }}
                     className="bg-white border border-gray-100 rounded-[24px] p-4 flex items-center justify-between shadow-sm cursor-pointer group hover:border-primary transition-all"
                  >
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center group-hover:bg-white transition-all">
                           {topic.icon}
                        </div>
                        <span className="text-[16px] font-black text-gray-800 tracking-tight leading-tight group-hover:text-primary transition-colors">{topic.title}</span>
                     </div>
                     <ChevronRight size={18} className="text-gray-300" strokeWidth={3} />
                  </motion.div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );
};

const ChevronRight = ({ size, className, strokeWidth }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m9 18 6-6-6-6"/>
  </svg>
);

export default Support;
