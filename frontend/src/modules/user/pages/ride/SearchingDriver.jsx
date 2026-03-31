import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { X, Search, ShieldCheck } from 'lucide-react';

const SearchingDriver = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Simulated Search timer: 4 seconds to find a driver
    const timer = setTimeout(() => {
        navigate('/ride/tracking');
    }, 4000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-100 max-w-lg mx-auto relative font-sans overflow-hidden">
      {/* Map Background (Blurry for focus) */}
      <div className="absolute inset-0 z-0 scale-110">
        <img src="/map image.avif" className="w-full h-full object-cover blur-[2px] opacity-70" alt="Map View" />
      </div>

      {/* Floating Center Animation */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="relative">
          {/* Pulsing circles */}
          <motion.div 
            animate={{ scale: [1, 1.5, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#E85D04]/20 rounded-full"
          />
          <motion.div 
            animate={{ scale: [1, 2, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ repeat: Infinity, duration: 2.5, delay: 0.5 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#E85D04]/10 rounded-full"
          />
          
          {/* Central Logo/Icon */}
          <div className="relative w-20 h-20 bg-white rounded-full shadow-2xl flex items-center justify-center p-4 border-4 border-[#E85D04]/10">
            <motion.div
               animate={{ rotate: 360 }}
               transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
            >
                <Search size={32} className="text-[#E85D04]" strokeWidth={3} />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Header Close button */}
      <div className="absolute top-8 right-6 z-20">
         <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate(-1)}
            className="w-11 h-11 bg-white rounded-full shadow-xl flex items-center justify-center border border-gray-100"
         >
            <X size={20} className="text-gray-900" strokeWidth={3} />
         </motion.button>
      </div>

      {/* Bottom Status Card */}
      <div className="absolute bottom-10 left-5 right-5 z-20">
         <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-white rounded-[32px] p-6 shadow-2xl space-y-4 border border-gray-50 text-center"
         >
            <div className="flex flex-col items-center gap-2">
                <h1 className="text-[22px] font-black text-gray-900 tracking-tight">Finding your ride...</h1>
                <p className="text-[14px] font-bold text-gray-400 capitalize">Connecting with drivers nearby</p>
            </div>
            
            <div className="flex items-center justify-center gap-4 py-2 border-y border-gray-50">
               <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-sm shadow-green-200"></div>
                  <span className="text-[12px] font-black text-gray-800 uppercase tracking-widest leading-none">High Chance</span>
               </div>
               <div className="w-[1.5px] h-4 bg-gray-100"></div>
               <div className="flex items-center gap-2">
                  <ShieldCheck size={14} className="text-blue-500" />
                  <span className="text-[12px] font-black text-gray-800 uppercase tracking-widest leading-none">Safety Verified</span>
               </div>
            </div>

            <button 
                onClick={() => navigate('/')}
                className="w-full py-4 text-[14px] font-black text-gray-400 hover:text-red-500 transition-colors uppercase tracking-widest"
            >
                Cancel My Search
            </button>
         </motion.div>
      </div>
    </div>
  );
};

export default SearchingDriver;
