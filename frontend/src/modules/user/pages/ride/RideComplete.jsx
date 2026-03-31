import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, CheckCircle2, ChevronRight, Share2, Info } from 'lucide-react';

const RideComplete = () => {
  const [rating, setRating] = useState(0);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F9F9F9] max-w-lg mx-auto relative font-sans p-6 flex flex-col justify-between">
      <div className="flex-1 space-y-10 pt-10">
        {/* Success Header */}
        <div className="flex flex-col items-center gap-4 text-center">
            <motion.div 
               initial={{ scale: 0, rotate: -45 }}
               animate={{ scale: 1, rotate: 0 }}
               className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center text-white shadow-2xl shadow-green-100"
            >
               <CheckCircle2 size={40} strokeWidth={3} />
            </motion.div>
            <div className="space-y-1">
                <h1 className="text-3xl font-black text-gray-900 tracking-tight leading-none">Arrived!</h1>
                <p className="text-[14px] font-bold text-gray-400 uppercase tracking-widest leading-none mt-2">Ride completed successfully</p>
            </div>
        </div>

        {/* Fare Summary Card */}
        <motion.div 
           initial={{ y: 20, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           transition={{ delay: 0.2 }}
           className="bg-white rounded-[40px] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.06)] border border-gray-50 flex flex-col items-center"
        >
             <span className="text-[12px] font-black text-gray-400 tracking-widest uppercase">Total Bill</span>
             <div className="flex items-baseline gap-1 mt-2">
                <span className="text-5xl font-black text-gray-900 tracking-tighter">₹22</span>
                <span className="text-2xl font-black text-gray-400">.00</span>
             </div>
             
             <div className="flex gap-4 mt-8 w-full border-t border-gray-50 pt-8">
                <div className="flex-1 text-center flex flex-col gap-1 border-r border-gray-50">
                    <span className="text-[10px] font-black text-gray-400 tracking-widest uppercase mb-1">Payment</span>
                    <span className="text-[14px] font-black text-gray-900">Paid by Cash</span>
                </div>
                <div className="flex-1 text-center flex flex-col gap-1">
                    <span className="text-[10px] font-black text-gray-400 tracking-widest uppercase mb-1">Time taken</span>
                    <span className="text-[14px] font-black text-gray-900">12 Mins</span>
                </div>
             </div>
        </motion.div>

        {/* Rating Section */}
        <div className="space-y-6 text-center">
             <h3 className="text-xl font-black text-gray-900 tracking-tight">How was your ride with Kishan?</h3>
             <div className="flex justify-center gap-3">
                {[1, 2, 3, 4, 5].map((num) => (
                    <motion.button
                        key={num}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setRating(num)}
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                            rating >= num ? 'bg-[#F48C06] text-white shadow-lg shadow-orange-100' : 'bg-gray-100 text-gray-300'
                        }`}
                    >
                        <Star size={24} className={rating >= num ? 'fill-white' : ''} />
                    </motion.button>
                ))}
             </div>
             {rating > 0 && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-primary font-black text-sm uppercase tracking-widest">
                   {rating === 5 ? "Awesome Experience!" : "Thanks for rating!"}
                </motion.p>
             )}
        </div>
      </div>

      {/* Final Action Area */}
      <div className="space-y-4 pb-8">
         <div className="flex gap-4 px-2">
            <button className="flex-1 flex items-center justify-center gap-2 bg-white border border-gray-100 py-5 rounded-[24px] text-sm font-black text-gray-900 shadow-sm active:scale-95 transition-all">
                <Share2 size={18} />
                <span>Share Receipt</span>
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 bg-white border border-gray-100 py-5 rounded-[24px] text-sm font-black text-gray-900 shadow-sm active:scale-95 transition-all">
                <Info size={18} />
                <span>Support</span>
            </button>
         </div>
         <button 
            onClick={() => navigate('/')}
            className="w-full bg-[#1C2833] py-6 rounded-[28px] text-lg font-black text-white shadow-2xl active:scale-[0.98] transition-all flex items-center justify-center gap-2"
         >
            <span>Back to Home</span>
            <ChevronRight size={22} className="opacity-50" />
         </button>
      </div>
    </div>
  );
};

export default RideComplete;
