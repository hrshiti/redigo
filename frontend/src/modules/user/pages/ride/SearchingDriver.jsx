import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, ShieldCheck, AlertTriangle } from 'lucide-react';

// Generate a random 4-digit OTP once per session
const generateOTP = () => String(Math.floor(1000 + Math.random() * 9000));

// Mock driver pool — picked randomly when a driver is "found"
const MOCK_DRIVERS = [
  { name: 'Kishan Kumawat', rating: '4.9', vehicle: 'Grey Honda Shine', plate: 'MP09 CL 5308', avatar: 'Kishan+Kumawat', phone: '+919876543210', eta: 2 },
  { name: 'Rajesh Patel', rating: '4.7', vehicle: 'Black Royal Enfield', plate: 'MP09 AB 1234', avatar: 'Rajesh+Patel', phone: '+919876543211', eta: 3 },
  { name: 'Sunil Sharma', rating: '4.8', vehicle: 'Blue Activa 6G', plate: 'MP09 CD 9876', avatar: 'Sunil+Sharma', phone: '+919876543212', eta: 2 },
];

const SearchingDriver = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const routeState = location.state || {};

  const [countdown, setCountdown] = useState(4);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [otp] = useState(generateOTP);
  const [driver] = useState(() => MOCK_DRIVERS[Math.floor(Math.random() * MOCK_DRIVERS.length)]);

  useEffect(() => {
    // Count down and then navigate to tracking
    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          // Pass everything forward to RideTracking
          navigate('/ride/tracking', {
            state: {
              ...routeState,
              otp,
              driver,
            },
          });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [navigate, otp, driver]);

  const handleCancelSearch = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100 max-w-lg mx-auto relative font-sans overflow-hidden">

      {/* Blurred Map Background */}
      <div className="absolute inset-0 z-0 scale-110">
        <img src="/map image.avif" className="w-full h-full object-cover blur-[2px] opacity-70" alt="Map View" />
      </div>

      {/* Pulsing Search Animation */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="relative">
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
          <div className="relative w-20 h-20 bg-white rounded-full shadow-2xl flex items-center justify-center p-4 border-4 border-[#E85D04]/10">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
            >
              <Search size={32} className="text-[#E85D04]" strokeWidth={3} />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Close button */}
      <div className="absolute top-8 right-6 z-20">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowCancelConfirm(true)}
          className="w-11 h-11 bg-white rounded-full shadow-xl flex items-center justify-center border border-gray-100"
        >
          <X size={20} className="text-gray-900" strokeWidth={3} />
        </motion.button>
      </div>

      {/* Route Summary Pill */}
      <div className="absolute top-8 left-6 z-20 bg-white/90 backdrop-blur-md rounded-2xl px-4 py-2.5 shadow-lg border border-white max-w-[65%]">
        <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Route</p>
        <p className="text-[13px] font-black text-gray-900 leading-tight line-clamp-1">
          {routeState.pickup || 'Pickup'} → {routeState.drop || 'Drop'}
        </p>
      </div>

      {/* Status Card */}
      <div className="absolute bottom-10 left-5 right-5 z-20">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white rounded-[32px] p-6 shadow-2xl space-y-5 border border-gray-50"
        >
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-[22px] font-black text-gray-900 tracking-tight">Finding your ride...</h1>
            <p className="text-[14px] font-bold text-gray-400 capitalize">Connecting with drivers nearby</p>
          </div>

          {/* Countdown */}
          <div className="flex justify-center">
            <div className="flex gap-2">
              {[1, 2, 3, 4].map((dot) => (
                <motion.div
                  key={dot}
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ repeat: Infinity, duration: 1.2, delay: dot * 0.2 }}
                  className="w-2.5 h-2.5 bg-[#E85D04] rounded-full"
                />
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 py-2 border-y border-gray-50">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-sm shadow-green-200" />
              <span className="text-[12px] font-black text-gray-800 uppercase tracking-widest leading-none">High Chance</span>
            </div>
            <div className="w-[1.5px] h-4 bg-gray-100" />
            <div className="flex items-center gap-2">
              <ShieldCheck size={14} className="text-blue-500" />
              <span className="text-[12px] font-black text-gray-800 uppercase tracking-widest leading-none">Safety Verified</span>
            </div>
          </div>

          <button
            onClick={() => setShowCancelConfirm(true)}
            className="w-full py-4 text-[14px] font-black text-gray-400 hover:text-red-500 transition-colors uppercase tracking-widest"
          >
            Cancel My Search
          </button>
        </motion.div>
      </div>

      {/* Cancel Confirmation Modal */}
      <AnimatePresence>
        {showCancelConfirm && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCancelConfirm(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] max-w-lg mx-auto"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] max-w-sm bg-white rounded-[40px] p-8 z-[101] shadow-2xl text-center"
            >
              <div className="w-16 h-16 bg-red-50 rounded-3xl flex items-center justify-center text-red-500 mx-auto mb-5">
                <AlertTriangle size={32} strokeWidth={2.5} />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-2">Cancel search?</h3>
              <p className="text-[14px] font-bold text-gray-400 mb-8 leading-relaxed">
                We're still looking for a driver nearby. Are you sure you want to stop?
              </p>
              <div className="space-y-3">
                <button
                  onClick={handleCancelSearch}
                  className="w-full bg-[#1C2833] text-white py-4 rounded-full text-sm font-black uppercase tracking-widest shadow-xl active:scale-95 transition-all"
                >
                  Yes, Cancel
                </button>
                <button
                  onClick={() => setShowCancelConfirm(false)}
                  className="w-full bg-white text-gray-400 py-4 rounded-full text-sm font-black uppercase tracking-widest hover:text-gray-900 active:scale-95 transition-all"
                >
                  Keep Searching
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchingDriver;
