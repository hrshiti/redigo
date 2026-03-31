import React, { useState } from 'react';
import { 
  Trash2, 
  UserX, 
  Search, 
  ChevronRight, 
  ShieldAlert, 
  AlertCircle, 
  CheckCircle2, 
  XCircle, 
  MoreHorizontal, 
  IndianRupee, 
  Car, 
  MapPin, 
  ArrowRight,
  TrendingDown,
  Info,
  BadgeAlert
} from 'lucide-react';

const DriverDeleteRequests = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const [requests] = useState([
    { id: 'DD-101', driverId: 'DRV442', name: 'Rohan Deshmukh', vehicle: 'Toyota Etios', balance: '₹142.00', reason: 'Moving to another city for family, no longer driving.', requestedDate: 'Mar 28, 2024', status: 'Pending', pendingRides: 0 },
    { id: 'DD-102', driverId: 'DRV092', name: 'Suraj Gupta', vehicle: 'Maruti WagonR', balance: '₹4,320.00', reason: 'High commission rates, switching to competitor app.', requestedDate: 'Mar 30, 2024', status: 'In Review', pendingRides: 2 },
    { id: 'DD-103', driverId: 'DRV215', name: 'Amit Jha', vehicle: 'Honda Amaze', balance: '₹0.00', reason: 'Medical emergency, unable to drive for long duration.', requestedDate: 'Mar 31, 2024', status: 'Pending', pendingRides: 0 },
  ]);

  return (
    <div className="space-y-10 p-1 animate-in fade-in duration-700 font-sans text-gray-950">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
         <div>
            <h1 className="text-4xl font-black tracking-tight text-gray-900 mb-2 leading-none text-rose-600">Offboarding Queue</h1>
            <div className="flex items-center gap-2 text-[13px] font-bold text-gray-400">
               <span className="text-gray-950">Fleet Safety</span>
               <ChevronRight size={14} />
               <span>Delete Account Requests</span>
            </div>
         </div>
         <div className="bg-rose-50 border border-rose-100 px-6 py-3 rounded-2xl flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-rose-500 shadow-sm border border-rose-50">
               <Trash2 size={20} />
            </div>
            <div>
               <p className="text-[10px] font-black text-rose-600 uppercase tracking-widest leading-none">Termination Requests</p>
               <p className="text-xl font-black text-rose-700 mt-1">{requests.filter(r => r.status === 'Pending').length} Action Required</p>
            </div>
         </div>
      </div>

      {/* SEARCH/FILTER */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
         <div className="flex flex-wrap items-center gap-2">
            <div className="px-5 py-2.5 bg-black text-white text-[12px] font-black rounded-xl">All Offboarding</div>
            <div className="px-5 py-2.5 bg-white text-gray-500 text-[12px] font-black rounded-xl border border-gray-100 hover:bg-gray-50 transition-all flex items-center gap-2 cursor-pointer shadow-sm">
               Zero Balance Only
            </div>
         </div>
         <div className="relative w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input type="text" placeholder="Search driver or plate..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-11 pr-4 py-3.5 bg-white border border-gray-100 rounded-xl text-[12px] font-bold focus:ring-2 focus:ring-gray-100 outline-none transition-all shadow-sm" />
         </div>
      </div>

      {/* REQUESTS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
         <div className="lg:col-span-2 space-y-6">
            {requests.map((req) => (
               <div key={req.id} className="bg-white rounded-[40px] border border-gray-50 shadow-sm hover:shadow-xl transition-all p-8 flex flex-col group relative overflow-hidden">
                  <div className="flex items-start justify-between mb-8">
                     <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-rose-50 border border-rose-100 text-rose-600 font-black text-lg flex items-center justify-center uppercase shadow-inner group-hover:scale-105 transition-transform">
                           {req.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="text-left">
                           <p className="text-[17px] font-black text-gray-950 tracking-tight leading-none mb-2">{req.name}</p>
                           <div className="flex items-center gap-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest leading-none mt-2">
                              {req.driverId} <span className="w-1 h-1 rounded-full bg-gray-200"></span> <span className="text-gray-600">{req.vehicle}</span>
                           </div>
                        </div>
                     </div>
                     <div className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border ${req.status === 'Pending' ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-blue-50 text-blue-600 border-blue-100'}`}>
                        {req.status}
                     </div>
                  </div>

                  <div className="p-6 bg-gray-50/50 rounded-3xl border border-gray-100 mb-8">
                     <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">
                        <AlertCircle size={14} className="text-rose-500" /> Declared Reason
                     </div>
                     <p className="text-[14px] font-bold text-gray-950 leading-relaxed italic opacity-80">"{req.reason}"</p>
                  </div>

                  <div className="grid grid-cols-3 gap-6 mb-8 border-t border-gray-50 pt-8">
                     <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 focus:outline-none">Wallet Balance</p>
                        <p className={`text-xl font-black ${req.balance === '₹0.00' ? 'text-emerald-500' : 'text-rose-600'}`}>{req.balance}</p>
                     </div>
                     <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 focus:outline-none">Pending Trips</p>
                        <p className="text-xl font-black text-gray-950">{req.pendingRides}</p>
                     </div>
                     <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 focus:outline-none">Request Date</p>
                        <p className="text-[13px] font-black text-gray-950 mt-1.5 uppercase">{req.requestedDate}</p>
                     </div>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                      {req.balance !== '₹0.00' ? (
                         <div className="flex items-center gap-3 px-4 py-2 bg-rose-50 text-rose-600 rounded-xl border border-rose-100">
                            <BadgeAlert size={16} />
                            <span className="text-[10px] font-black uppercase tracking-widest leading-none">Settlement Required before Deletion</span>
                         </div>
                      ) : <div className="w-1"></div>}
                      
                      <div className="flex items-center gap-3">
                         <button className="px-6 py-3 bg-white border border-gray-100 text-gray-950 text-[11px] font-black uppercase tracking-widest rounded-xl hover:bg-gray-50 active:scale-95 transition-all shadow-sm">Reject</button>
                         <button className={`px-8 py-3 text-white text-[11px] font-black uppercase tracking-widest rounded-xl hover:opacity-90 active:scale-95 transition-all shadow-xl flex items-center gap-2 ${req.balance === '₹0.00' && req.pendingRides === 0 ? 'bg-black' : 'bg-gray-300 cursor-not-allowed shadow-none'}`}>
                            {req.balance === '₹0.00' ? 'Permanent Delete' : 'Review Account'} <ArrowRight size={16} />
                         </button>
                      </div>
                  </div>
               </div>
            ))}
         </div>

         {/* STATS/INFO AREA */}
         <div className="space-y-8">
            <div className="bg-white p-8 rounded-[40px] border border-gray-50 shadow-sm overflow-hidden relative group">
               <div className="absolute top-0 right-0 p-8 opacity-5 scale-[2.5] -rotate-12 translate-x-4"><ShieldAlert size={80} strokeWidth={1} /></div>
               <h4 className="text-[12px] font-black text-gray-400 uppercase tracking-widest mb-8 relative z-10">Termination Stats</h4>
               <div className="space-y-6 relative z-10">
                  <div className="flex flex-col items-center">
                     <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 leading-none">Churn Rate (Avg)</p>
                     <p className="text-5xl font-black text-rose-500 tracking-tighter">4.2%</p>
                     <div className="text-[11px] font-black text-rose-600 flex items-center gap-1.5 mt-2 uppercase">
                        <TrendingDown size={14} /> Critical Threshold
                     </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 border-t border-gray-50 pt-8 mt-4">
                     <div>
                        <p className="text-xl font-black text-gray-950">15</p>
                        <p className="text-[9px] font-black text-gray-400 uppercase mt-1 tracking-widest">Processed</p>
                     </div>
                     <div>
                        <p className="text-xl font-black text-indigo-600">₹12k</p>
                        <p className="text-[9px] font-black text-gray-400 uppercase mt-1 tracking-widest">Settled</p>
                     </div>
                  </div>
               </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-[40px] border border-gray-100 flex flex-col items-center text-center">
               <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-gray-950 shadow-sm border border-gray-100 mb-6"><Info size={28} /></div>
               <h4 className="text-[14px] font-black text-gray-950 uppercase tracking-widest mb-3 leading-none">Security Protocol</h4>
               <p className="text-[12px] font-bold text-gray-400 leading-relaxed mb-6">Deleted drivers are permanently barred from re-registering with the same Aadhar/PAN ID for 365 days to prevent loop-hole registration.</p>
               <button className="w-full py-4 bg-white border border-gray-200 rounded-xl text-[11px] font-black uppercase tracking-widest text-gray-600 hover:text-gray-950 hover:bg-gray-100 transition-all">Audit Policy</button>
            </div>
         </div>
      </div>
    </div>
  );
};

export default DriverDeleteRequests;
