import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MessageCircle, AlertTriangle, Shield, User, Star, ChevronLeft, X } from 'lucide-react';

const RideTracking = () => {
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 max-w-lg mx-auto relative font-sans overflow-hidden">
      {/* Dynamic Map - Simulated Live Tracking */}
      <div className="absolute inset-0 z-0">
        <img src="/map image.avif" className="w-full h-full object-cover opacity-80" alt="Tracking Map" />
        <button 
           onClick={() => navigate('/')} 
           className="absolute top-8 left-6 w-11 h-11 bg-white rounded-full shadow-2xl flex items-center justify-center border border-gray-100 z-10 active:scale-90 transition-all focus:outline-none"
        >
          <ChevronLeft size={22} className="text-gray-900" strokeWidth={3} />
        </button>
      </div>

      {/* Floating OTP & Security Badge */}
      <div className="absolute top-24 left-6 right-6 z-10 flex items-center justify-between pointer-events-none">
         <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="bg-black/90 backdrop-blur-md px-5 py-2.5 rounded-full flex items-center gap-3 shadow-2xl border border-white/20"
         >
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-sm shadow-green-200"></div>
            <span className="text-[12px] font-black text-white tracking-widest uppercase truncate leading-none">Share Start OTP: <span className="text-primary tracking-[0.2em] ml-1">1234</span></span>
         </motion.div>
         
         <div 
           className="pointer-events-auto bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-full flex items-center gap-2 shadow-2xl border border-gray-50 active:scale-95 transition-all cursor-pointer" 
           onClick={() => navigate('/support')}
         >
            <Shield size={16} className="text-blue-500" strokeWidth={3} />
            <span className="text-[11px] font-black text-gray-900 uppercase tracking-widest leading-none">Safety Toolkit</span>
         </div>
      </div>

      {/* Driver Bottom Sheet */}
      <motion.div 
        animate={{ y: drawerOpen ? 0 : 350 }}
        className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[40px] shadow-[0_-20px_60px_rgba(0,0,0,0.12)] z-20 flex flex-col pt-3"
      >
         <div className="w-12 h-1.5 bg-gray-100 rounded-full mx-auto mb-4 cursor-pointer" onClick={() => setDrawerOpen(!drawerOpen)}></div>

         <div className="px-6 pb-8 space-y-6">
            <div className="flex items-center gap-4 border-b border-gray-50 pb-6">
                <div className="relative">
                    <div className="w-[72px] h-[72px] rounded-[30px] bg-gray-100 overflow-hidden border-2 border-primary/20 p-0.5 shadow-sm">
                        <img src="https://ui-avatars.com/api/?name=Kishan+Kumawat&background=f0f0f0&color=000" className="w-full h-full rounded-[24px] object-cover" alt="Driver" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 bg-yellow-400 p-1.5 rounded-xl border-2 border-white flex items-center gap-1 shadow-md">
                        <Star size={11} className="text-black fill-black" strokeWidth={3} />
                        <span className="text-[10px] font-black text-black leading-none">4.9</span>
                    </div>
                </div>
                <div className="flex-1">
                    <div className="flex items-center justify-between">
                       <h3 className="text-xl font-black text-gray-900 leading-tight">Kishan Kumawat</h3>
                       <div className="text-right">
                          <span className="text-[16px] font-black text-gray-900 tracking-tight block">MP09 CL 5308</span>
                          <span className="text-[10px] font-black text-gray-400 tracking-widest uppercase block mt-0.5">Grey Honda Shine</span>
                       </div>
                    </div>
                    <p className="text-[13px] font-bold text-[#E85D04] mt-1 uppercase tracking-tight">Driver is arriving in 2 mins</p>
                </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
                <div className="flex flex-col items-center gap-2 cursor-pointer group active:scale-95 transition-all">
                    <div className="w-14 h-14 bg-gray-50 rounded-[22px] flex items-center justify-center border border-gray-50 group-hover:bg-orange-50 group-hover:border-orange-100 transition-colors">
                        <Phone size={24} className="text-gray-900 group-hover:text-primary" />
                    </div>
                    <span className="text-[11px] font-black text-gray-400 group-hover:text-gray-900 uppercase tracking-widest leading-none">Call</span>
                </div>
                <div onClick={() => navigate('/ride/chat')} className="flex flex-col items-center gap-2 cursor-pointer group active:scale-95 transition-all">
                    <div className="w-14 h-14 bg-gray-50 rounded-[22px] flex items-center justify-center border border-gray-50 group-hover:bg-blue-50 group-hover:border-blue-100 transition-colors">
                        <MessageCircle size={24} className="text-gray-900 group-hover:text-blue-500" />
                    </div>
                    <span className="text-[11px] font-black text-gray-400 group-hover:text-gray-900 uppercase tracking-widest leading-none">Chat</span>
                </div>
                <div onClick={() => navigate('/ride/complete')} className="flex flex-col items-center gap-2 cursor-pointer group active:scale-95 transition-all">
                    <div className="w-14 h-14 bg-green-50 rounded-[22px] flex items-center justify-center border border-green-100 group-hover:bg-green-100/50 transition-colors relative">
                        <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-ping z-0 absolute"></div>
                        <div className="w-2 h-2 bg-green-500 rounded-full z-10"></div>
                    </div>
                    <span className="text-[11px] font-black text-gray-400 group-hover:text-gray-800 uppercase tracking-widest truncate leading-none">Live Trace</span>
                </div>
                <div onClick={() => navigate('/support')} className="flex flex-col items-center gap-2 cursor-pointer group active:scale-95 transition-all">
                    <div className="w-14 h-14 bg-gray-50 rounded-[22px] flex items-center justify-center border border-gray-50 group-hover:bg-red-50 group-hover:border-red-100 transition-colors">
                        <AlertTriangle size={24} className="text-gray-900 group-hover:text-red-500" />
                    </div>
                    <span className="text-[11px] font-black text-gray-400 group-hover:text-gray-900 uppercase tracking-widest leading-none">Help</span>
                </div>
            </div>

            <div className="bg-gray-50 rounded-[32px] p-6 flex items-center justify-between border border-gray-50/50 shadow-sm">
               <div>
                  <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest block mb-1">Fare Payable</span>
                  <div className="flex items-center gap-2">
                     <span className="text-2xl font-black text-gray-900 tracking-tighter">₹22.00</span>
                     <span className="text-[10px] font-black bg-blue-100 text-blue-700 px-2.5 py-1 rounded-lg leading-none uppercase">Cash</span>
                  </div>
               </div>
               <button 
                  onClick={() => setShowCancelConfirm(true)}
                  className="text-red-500 font-black text-[13px] uppercase tracking-widest hover:bg-red-50 px-6 py-3 rounded-full transition-all active:border-red-100"
               >
                  Cancel Ride
               </button>
            </div>
         </div>
      </motion.div>

      {/* CANCELLATION CONFIRMATION MODAL */}
      <AnimatePresence>
        {showCancelConfirm && (
          <>
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] max-w-lg mx-auto"
               onClick={() => setShowCancelConfirm(false)}
            />
            <motion.div 
               initial={{ scale: 0.9, opacity: 0, y: 50 }}
               animate={{ scale: 1, opacity: 1, y: 0 }}
               exit={{ scale: 0.9, opacity: 0, y: 50 }}
               className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] max-w-sm bg-white rounded-[40px] p-8 z-[101] shadow-2xl text-center"
            >
               <div className="w-16 h-16 bg-red-50 rounded-3xl flex items-center justify-center text-red-500 mx-auto mb-6">
                  <AlertTriangle size={32} strokeWidth={2.5} />
               </div>
               <h3 className="text-xl font-black text-gray-900 mb-2">Cancel your ride?</h3>
               <p className="text-[14px] font-bold text-gray-400 mb-8 leading-relaxed">
                  Your captain is already on the way. Are you sure you want to cancel?
               </p>
               
               <div className="space-y-3">
                  <button 
                    onClick={() => navigate('/')}
                    className="w-full bg-[#1C2833] text-white py-4 rounded-full text-sm font-black uppercase tracking-widest shadow-xl active:scale-95 transition-all"
                  >
                    Yes, Cancel Ride
                  </button>
                  <button 
                    onClick={() => setShowCancelConfirm(false)}
                    className="w-full bg-white text-gray-400 py-4 rounded-full text-sm font-black uppercase tracking-widest hover:text-gray-900 active:scale-95 transition-all"
                  >
                    No, Go Back
                  </button>
               </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RideTracking;
