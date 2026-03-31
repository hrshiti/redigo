import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Plus, Download, History, CreditCard, Gift, Send } from 'lucide-react';

const Wallet = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FDFDFD] max-w-lg mx-auto flex flex-col font-sans mb-32">
      {/* HEADER */}
      <header className="bg-white px-5 pt-12 pb-6 flex items-center gap-4 sticky top-0 z-20">
        <button 
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center active:scale-95 transition-transform"
        >
          <ArrowLeft size={20} className="text-gray-900" strokeWidth={2.5} />
        </button>
        <h1 className="text-[19px] font-black text-gray-900 tracking-tight">My Wallet</h1>
      </header>

      {/* BALANCE CARD */}
      <div className="px-5 mt-2">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-[32px] p-6 text-white shadow-xl shadow-orange-500/20 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl transform translate-x-10 -translate-y-10"></div>
          <div className="relative z-10">
            <p className="text-orange-100 font-bold uppercase tracking-widest text-xs mb-1">Available Balance</p>
            <h2 className="text-4xl font-black mb-6">₹1,250.00</h2>
            
            <div className="flex items-center gap-3">
              <button className="flex-1 bg-white text-orange-600 py-3 rounded-2xl font-black text-[13px] uppercase tracking-wider flex items-center justify-center gap-2 active:scale-95 transition-transform">
                <Plus size={16} strokeWidth={3} />
                Add Money
              </button>
              <button className="w-12 h-12 bg-orange-700/50 rounded-2xl flex items-center justify-center text-white active:scale-95 transition-transform backdrop-blur-sm">
                <History size={20} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* QUICK ACTIONS */}
      <div className="px-5 mt-8 grid grid-cols-3 gap-3">
         <div className="bg-white border border-gray-100 rounded-[24px] p-4 flex flex-col items-center justify-center gap-2 shadow-sm cursor-pointer active:bg-gray-50">
            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
               <Send size={18} strokeWidth={2.5} />
            </div>
            <span className="text-[11px] font-black text-gray-700">Send</span>
         </div>
         <div className="bg-white border border-gray-100 rounded-[24px] p-4 flex flex-col items-center justify-center gap-2 shadow-sm cursor-pointer active:bg-gray-50">
            <div className="w-10 h-10 bg-green-50 text-green-600 rounded-full flex items-center justify-center">
               <Download size={18} strokeWidth={2.5} />
            </div>
            <span className="text-[11px] font-black text-gray-700">Receive</span>
         </div>
         <div className="bg-white border border-gray-100 rounded-[24px] p-4 flex flex-col items-center justify-center gap-2 shadow-sm cursor-pointer active:bg-gray-50">
            <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center">
               <CreditCard size={18} strokeWidth={2.5} />
            </div>
            <span className="text-[11px] font-black text-gray-700">Cards</span>
         </div>
      </div>

      {/* PROMO */}
      <div className="px-5 mt-6">
         <div className="bg-orange-50 border border-orange-100 rounded-[24px] p-5 flex items-center gap-4 cursor-pointer active:scale-95 transition-transform">
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-orange-500 shadow-sm shrink-0">
               <Gift size={24} strokeWidth={2} />
            </div>
            <div>
               <h4 className="text-[14px] font-black text-gray-900">Refer & Earn ₹50</h4>
               <p className="text-[12px] font-bold text-gray-500 mt-0.5">Invite friends to Redigo</p>
            </div>
         </div>
      </div>

      {/* RECENT TRANSACTIONS */}
      <div className="px-5 mt-8">
         <h3 className="text-[13px] font-black text-gray-400 uppercase tracking-widest mb-4">Recent Transactions</h3>
         <div className="bg-white rounded-[32px] border border-gray-50 shadow-sm p-2 flex flex-col gap-1">
            <div className="flex items-center gap-4 p-3 rounded-[24px] hover:bg-gray-50 cursor-pointer transition-colors">
               <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                  <ArrowLeft size={18} strokeWidth={2.5} className="rotate-45" />
               </div>
               <div className="flex-1 min-w-0">
                  <h4 className="text-[14px] font-black text-gray-900 truncate">Ride to Airport</h4>
                  <p className="text-[11px] font-bold text-gray-400 mt-0.5">Today, 10:24 AM</p>
               </div>
               <div className="text-right shrink-0">
                  <h4 className="text-[14px] font-black text-gray-900">-₹450.00</h4>
                  <p className="text-[11px] font-bold text-red-500 mt-0.5 uppercase tracking-wider">Debit</p>
               </div>
            </div>

            <div className="flex items-center gap-4 p-3 rounded-[24px] hover:bg-gray-50 cursor-pointer transition-colors">
               <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center shrink-0">
                  <ArrowLeft size={18} strokeWidth={2.5} className="-rotate-135" />
               </div>
               <div className="flex-1 min-w-0">
                  <h4 className="text-[14px] font-black text-gray-900 truncate">Wallet Top-up</h4>
                  <p className="text-[11px] font-bold text-gray-400 mt-0.5">Yesterday</p>
               </div>
               <div className="text-right shrink-0">
                  <h4 className="text-[14px] font-black text-green-600">+₹1,000.00</h4>
                  <p className="text-[11px] font-bold text-green-500 mt-0.5 uppercase tracking-wider">Credit</p>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default Wallet;
