import React, { useState } from 'react';
import { 
  Clock, 
  Search, 
  ChevronRight, 
  ShieldAlert, 
  FileCheck, 
  UserPlus, 
  Mail, 
  Phone, 
  Car, 
  CheckCircle2, 
  XCircle, 
  Eye, 
  ArrowRight,
  AlertCircle,
  FileText,
  BadgeAlert,
  ShieldCheck
} from 'lucide-react';

const PendingDrivers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const [pendingDrivers] = useState([
    { id: 'REG001', name: 'Vikram Mehta', email: 'vikram@example.com', phone: '+91 9988776655', vehicle: 'Toyota Innova', progress: 80, date: 'Mar 28, 2024', missingDocs: ['Aadhar Card Back'] },
    { id: 'REG002', name: 'Suhail Khan', email: 'suhail@example.com', phone: '+91 8877665544', vehicle: 'Maruti Ertiga', progress: 40, date: 'Mar 29, 2024', missingDocs: ['Driving License', 'RC Copy', 'Vehicle Insurance'] },
    { id: 'REG003', name: 'Deepak Rao', email: 'deepak@example.com', phone: '+91 7766554433', vehicle: 'Hyundai Aura', progress: 100, date: 'Mar 30, 2024', missingDocs: [] },
    { id: 'REG004', name: 'Rahul Varma', email: 'rahul.v@example.com', phone: '+91 6655443322', vehicle: 'Maruti Dzire', progress: 60, date: 'Mar 31, 2024', missingDocs: ['Profile Photo', 'Bank Cheque'] },
  ]);

  return (
    <div className="space-y-8 p-1 animate-in fade-in duration-700 font-sans text-gray-950">
      {/* HEADER */}
      <div className="flex items-start justify-between">
         <div>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-2">Onboarding Queue</h1>
            <div className="flex items-center gap-2 text-[13px] font-bold text-gray-400">
               <span className="text-gray-950">Fleet Control</span>
               <ChevronRight size={14} />
               <span>Pending Verifications</span>
            </div>
         </div>
         <div className="bg-amber-50 border border-amber-100 px-6 py-3 rounded-2xl flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-amber-500 shadow-sm border border-amber-50">
               <Clock size={20} className="animate-pulse" />
            </div>
            <div>
               <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest leading-none">Awaiting Approval</p>
               <p className="text-xl font-black text-amber-700 mt-1">{pendingDrivers.filter(d => d.progress === 100).length} Ready for Review</p>
            </div>
         </div>
      </div>

      {/* FILTER & SEARCH */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
         <div className="flex flex-wrap items-center gap-2">
            <div className="px-4 py-2 bg-black text-white text-[12px] font-black rounded-xl">All Pending</div>
            <div className="px-4 py-2 bg-white text-gray-500 text-[12px] font-black rounded-xl border border-gray-100 hover:bg-gray-50 transition-all flex items-center gap-2 cursor-pointer">
               100% Completed Only
            </div>
            <div className="px-4 py-2 bg-white text-gray-500 text-[12px] font-black rounded-xl border border-gray-100 hover:bg-gray-50 transition-all flex items-center gap-2 cursor-pointer">
               Priority Queue
            </div>
         </div>
         <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
               type="text" 
               placeholder="Search application ID or name..." 
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               className="w-full pl-11 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-[13px] font-bold focus:ring-2 focus:ring-gray-100 outline-none transition-all"
            />
         </div>
      </div>

      {/* DRIVER GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         {pendingDrivers.map((driver) => (
            <div key={driver.id} className="bg-white rounded-[40px] border border-gray-50 shadow-sm hover:shadow-xl transition-all p-8 flex flex-col group relative overflow-hidden">
               {driver.progress === 100 && (
                  <div className="absolute top-0 right-0 py-2 px-6 bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest rounded-bl-2xl">
                     Ready to Approve
                  </div>
               )}
               
               <div className="flex items-start justify-between mb-8">
                  <div className="flex items-center gap-5">
                     <div className="w-16 h-16 rounded-[24px] bg-gray-50 border border-gray-100 text-gray-900 font-black text-lg flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
                        {driver.name.split(' ').map(n => n[0]).join('')}
                     </div>
                     <div className="text-left">
                        <p className="text-[17px] font-black text-gray-950 tracking-tight leading-none mb-2">{driver.name}</p>
                        <div className="flex items-center gap-4 text-[11px] font-black text-gray-400">
                           <span className="flex items-center gap-1.5"><Car size={13} /> {driver.vehicle}</span>
                           <span className="flex items-center gap-1.5 uppercase tracking-widest"><Clock size={13} /> {driver.date}</span>
                        </div>
                     </div>
                  </div>
                  <div className="text-right">
                     <p className="text-3xl font-black text-gray-950 leading-none">{driver.progress}%</p>
                     <p className="text-[9px] font-black text-gray-400 mt-2 uppercase tracking-widest">Profile Completion</p>
                  </div>
               </div>

               <div className="flex-1 space-y-4 mb-8">
                   <div className="w-full h-2 bg-gray-50 rounded-full overflow-hidden">
                      <div 
                         className={`h-full transition-all duration-1000 origin-left ${driver.progress === 100 ? 'bg-emerald-500' : 'bg-gray-900'}`} 
                         style={{ width: `${driver.progress}%` }}
                      ></div>
                   </div>
                   
                   {driver.missingDocs.length > 0 ? (
                      <div className="p-5 bg-rose-50/50 rounded-2xl border border-rose-100/50">
                         <p className="text-[10px] font-black text-rose-600 uppercase tracking-widest mb-3 flex items-center gap-2">
                            <BadgeAlert size={14} /> Outstanding Documents
                         </p>
                         <div className="flex flex-wrap gap-2">
                            {driver.missingDocs.map((doc, i) => (
                               <span key={i} className="px-3 py-1 bg-white border border-rose-100 rounded-lg text-[10px] font-bold text-rose-500">{doc}</span>
                            ))}
                         </div>
                      </div>
                   ) : (
                      <div className="p-5 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center gap-3">
                         <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-emerald-500"><FileCheck size={18} /></div>
                         <p className="text-[11px] font-black text-emerald-700 uppercase tracking-widest">All critical documentation uploaded</p>
                      </div>
                   )}
               </div>

               <div className="pt-6 border-t border-gray-50 flex items-center justify-between">
                  <div className="flex gap-2">
                     <button className="p-3 bg-gray-50 hover:bg-gray-100 text-gray-500 rounded-xl transition-all border border-gray-100"><Mail size={18} /></button>
                     <button className="p-3 bg-gray-50 hover:bg-gray-100 text-gray-500 rounded-xl transition-all border border-gray-100"><Phone size={18} /></button>
                  </div>
                  <div className="flex gap-3">
                     <button className="px-6 py-3 bg-white border border-gray-100 text-gray-950 text-[11px] font-black uppercase tracking-widest rounded-xl hover:bg-gray-50 transition-all flex items-center gap-2">
                        <Eye size={16} /> Audit Docs
                     </button>
                     <button className={`px-6 py-3 text-white text-[11px] font-black uppercase tracking-widest rounded-xl hover:opacity-90 active:scale-95 transition-all shadow-lg flex items-center gap-2 ${driver.progress === 100 ? 'bg-black shadow-gray-200' : 'bg-gray-300 cursor-not-allowed shadow-none'}`}>
                        {driver.progress === 100 ? 'Final Approve' : 'Pre-Approve'} <ArrowRight size={16} />
                     </button>
                  </div>
               </div>
            </div>
         ))}
      </div>

      {/* FOOTER NOTE */}
      <div className="p-8 bg-white rounded-[40px] border border-gray-50 shadow-sm flex items-start gap-5">
         <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-500 flex items-center justify-center border border-indigo-100 shrink-0"><ShieldCheck size={26} /></div>
         <div>
            <h4 className="text-[14px] font-black text-gray-950 uppercase tracking-widest mb-1.5">Background Verification Policy</h4>
            <p className="text-[12px] font-bold text-gray-400 leading-relaxed max-w-3xl">Drivers marked as 'Ready to Approve' have passed the initial document OCR check. Final manual inspection is still recommended for driving license authenticity. Verification logs are permanently stored in the audit trail.</p>
         </div>
      </div>
    </div>
  );
};

export default PendingDrivers;
