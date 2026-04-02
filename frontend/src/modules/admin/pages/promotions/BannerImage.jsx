import React from 'react';
import { Image, Upload, FileText, ChevronRight, LayoutGrid, X } from 'lucide-react';

const BannerImage = () => {
  return (
    <div className="space-y-6 p-1 animate-in fade-in duration-500 font-sans text-gray-950 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[17px] font-black text-[#2D3A6E] uppercase tracking-tight italic leading-none mb-1">BANNER IMAGE</h1>
          <div className="flex items-center gap-2 text-[11px] font-bold text-gray-400 uppercase tracking-widest leading-none">
             <span>Promotions Management</span>
             <ChevronRight size={12} className="opacity-50" />
             <span className="text-gray-900 font-black">Visual Assets</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm p-12 text-center">
         <div className="max-w-2xl mx-auto space-y-8">
            <div className="w-24 h-24 bg-indigo-50 text-[#2D3A6E] rounded-[32px] flex items-center justify-center mx-auto ring-8 ring-indigo-50/50">
               <Image size={48} strokeWidth={2.5} />
            </div>
            <div className="space-y-2">
               <h2 className="text-[24px] font-black text-gray-950 uppercase tracking-tight italic leading-none">Creative Assets Vault</h2>
               <p className="text-[14px] font-medium text-gray-400">Manage promotional banners for the user and driver apps. High-impact visual real estate management.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
               <div className="space-y-4">
                  <label className="text-[11px] font-black text-gray-950 uppercase tracking-widest italic">Display Position</label>
                  <select className="w-full h-14 px-6 bg-gray-50 border border-transparent rounded-2xl text-[14px] font-bold text-gray-950 outline-none focus:bg-white transition-all">
                     <option>Home Screen Top</option>
                     <option>Booking Confirmation</option>
                     <option>Side Drawer</option>
                  </select>
               </div>
               <div className="space-y-4">
                  <label className="text-[11px] font-black text-gray-950 uppercase tracking-widest italic">Banner Title</label>
                  <input type="text" placeholder="Enter banner campaign name" className="w-full h-14 px-6 bg-gray-50 border border-transparent rounded-2xl text-[14px] font-bold text-gray-950 outline-none focus:bg-white transition-all" />
               </div>
               <div className="md:col-span-2 space-y-4">
                  <label className="text-[11px] font-black text-gray-950 uppercase tracking-widest italic">Upload Asset (Recommended: 1200x400px)</label>
                  <div className="w-full h-48 border-2 border-dashed border-gray-100 rounded-[32px] bg-gray-50 flex flex-col items-center justify-center gap-4 hover:border-indigo-100 group transition-all cursor-pointer shadow-inner">
                     <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform shadow-sm">
                        <Upload size={24} />
                     </div>
                     <p className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 group-hover:text-[#2D3A6E] transition-colors">Select Visual Asset From Local Machine</p>
                  </div>
               </div>
            </div>

            <button className="h-16 px-12 bg-[#2D3A6E] text-white rounded-[28px] text-[13px] font-black uppercase tracking-[0.3em] shadow-2xl shadow-indigo-100 hover:bg-[#1e2a5a] transition-all flex items-center gap-3 active:scale-95 group mx-auto">
               <LayoutGrid size={18} /> Deploy Asset
            </button>
         </div>
      </div>
    </div>
  );
};

export default BannerImage;
