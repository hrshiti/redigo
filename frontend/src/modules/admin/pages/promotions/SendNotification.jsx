import React from 'react';
import { Bell, Send, CheckCircle2, AlertCircle, Info, ChevronRight } from 'lucide-react';

const SendNotification = () => {
  return (
    <div className="space-y-6 p-1 animate-in fade-in duration-500 font-sans text-gray-950 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[17px] font-black text-[#2D3A6E] uppercase tracking-tight italic leading-none mb-1">SEND NOTIFICATION</h1>
          <div className="flex items-center gap-2 text-[11px] font-bold text-gray-400 uppercase tracking-widest leading-none">
             <span>Promotions Management</span>
             <ChevronRight size={12} className="opacity-50" />
             <span className="text-gray-900 font-black">Broadcast</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm p-12 text-center">
         <div className="max-w-2xl mx-auto space-y-8">
            <div className="w-24 h-24 bg-indigo-50 text-[#2D3A6E] rounded-[32px] flex items-center justify-center mx-auto ring-8 ring-indigo-50/50">
               <Bell size={48} strokeWidth={2.5} />
            </div>
            <div className="space-y-2">
               <h2 className="text-[24px] font-black text-gray-950 uppercase tracking-tight italic leading-none">Campaign Broadcast</h2>
               <p className="text-[14px] font-medium text-gray-400">Reach your entire fleet or user base with a single push message. Segmented broadcasting coming soon.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
               <div className="space-y-4">
                  <label className="text-[11px] font-black text-gray-950 uppercase tracking-widest italic">Target Audience</label>
                  <select className="w-full h-14 px-6 bg-gray-50 border border-transparent rounded-2xl text-[14px] font-bold text-gray-950 outline-none focus:bg-white focus:ring-1 focus:ring-indigo-100 transition-all">
                     <option>All Users</option>
                     <option>All Drivers</option>
                     <option>Specific Service Location</option>
                  </select>
               </div>
               <div className="space-y-4">
                  <label className="text-[11px] font-black text-gray-950 uppercase tracking-widest italic">Title</label>
                  <input type="text" placeholder="Enter notification title" className="w-full h-14 px-6 bg-gray-50 border border-transparent rounded-2xl text-[14px] font-bold text-gray-950 outline-none focus:bg-white focus:ring-1 focus:ring-indigo-100 transition-all" />
               </div>
               <div className="md:col-span-2 space-y-4">
                  <label className="text-[11px] font-black text-gray-950 uppercase tracking-widest italic">Message Body</label>
                  <textarea rows="4" placeholder="Enter your message here..." className="w-full p-6 bg-gray-50 border border-transparent rounded-2xl text-[14px] font-bold text-gray-950 outline-none focus:bg-white focus:ring-1 focus:ring-indigo-100 transition-all resize-none"></textarea>
               </div>
            </div>

            <button className="h-16 px-12 bg-[#2D3A6E] text-white rounded-[28px] text-[13px] font-black uppercase tracking-[0.3em] shadow-2xl shadow-indigo-100 hover:bg-[#1e2a5a] transition-all flex items-center gap-3 active:scale-95 group mx-auto">
               <Send size={18} className="group-hover:translate-x-1 transition-transform" /> Dispatch Broadcast
            </button>
         </div>
      </div>
    </div>
  );
};

export default SendNotification;
