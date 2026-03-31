import React, { useState } from 'react';
import { 
  CreditCard, 
  Search, 
  ChevronRight, 
  Plus, 
  Settings2, 
  ShieldCheck, 
  Zap, 
  CheckCircle2, 
  Smartphone, 
  Building2, 
  IndianRupee, 
  ArrowRight,
  MoreHorizontal,
  Info,
  BadgeCheck
} from 'lucide-react';

const PaymentMethods = () => {
  const [methods] = useState([
    { id: 'PM-01', name: 'Unified Payments Interface (UPI)', provider: 'NPCI / Razorpay', status: 'Active', config: 'VPA Validation Required', success: '98.4%' },
    { id: 'PM-02', name: 'Direct Bank Transfer', provider: 'IMPS / NEFT', status: 'Active', config: 'IFSC Routing Enabled', success: '99.9%' },
    { id: 'PM-03', name: 'Digital Wallets', provider: 'Paytm / PhonePe', status: 'In Review', config: 'OAuth Integration', success: '95.2%' },
    { id: 'PM-04', name: 'Credit / Debit Cards', provider: 'Stripe / Visa', status: 'Disabled', config: 'PCI-DSS Compliance', success: 'N/A' },
  ]);

  return (
    <div className="space-y-10 p-1 animate-in fade-in duration-700 font-sans text-gray-950">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
         <div>
            <h1 className="text-4xl font-black tracking-tight text-gray-900 mb-2 leading-none">Payment Gateway Config</h1>
            <div className="flex items-center gap-2 text-[13px] font-bold text-gray-400">
               <span className="text-gray-950">Financial Systems</span>
               <ChevronRight size={14} />
               <span>Gateway Integration</span>
            </div>
         </div>
         <div className="flex items-center gap-3">
            <button className="bg-black text-white px-5 py-2.5 rounded-xl text-[12px] font-black flex items-center gap-2 hover:opacity-90 transition-all shadow-xl">
               <Plus size={16} /> Integrate Gateway
            </button>
         </div>
      </div>

      {/* GATEWAY GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         {methods.map((method) => (
            <div key={method.id} className="bg-white rounded-[40px] border border-gray-50 shadow-sm p-8 hover:shadow-xl transition-all group overflow-hidden relative">
               <div className="absolute top-0 right-0 p-8 opacity-5 scale-[2.2] -rotate-12 translate-x-4"><CreditCard size={80} strokeWidth={1} /></div>
               
               <div className="flex items-start justify-between mb-8 relative z-10">
                  <div className="flex items-center gap-5">
                     <div className="w-16 h-16 rounded-[24px] bg-gray-50 border border-gray-100 flex items-center justify-center text-gray-950 shadow-inner group-hover:scale-105 transition-transform">
                        {method.name.includes('UPI') ? <Smartphone size={32} /> : <Building2 size={32} />}
                     </div>
                     <div className="text-left">
                        <p className="text-[17px] font-black text-gray-950 tracking-tight leading-none mb-2">{method.name}</p>
                        <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest leading-none">Provider: {method.provider}</p>
                     </div>
                  </div>
                  <div className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border ${method.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : method.status === 'Disabled' ? 'bg-rose-50 text-rose-600 border-rose-100' : 'bg-amber-50 text-amber-600 border-amber-100'}`}>
                     {method.status}
                  </div>
               </div>

               <div className="grid grid-cols-2 gap-8 relative z-10 pt-8 border-t border-gray-50">
                  <div>
                     <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 leading-none">Backend Routing</p>
                     <div className="flex items-center gap-2 text-[14px] font-black text-gray-800">
                        <Settings2 size={14} className="text-indigo-500" /> {method.config}
                     </div>
                  </div>
                  <div className="text-right">
                     <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 leading-none">Global Success Rate</p>
                     <p className="text-[18px] font-black text-emerald-500 flex items-center justify-end gap-1.5 leading-none">
                        <Zap size={16} /> {method.success}
                     </p>
                  </div>
               </div>

               <div className="mt-8 flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="px-6 py-2.5 bg-gray-50 text-gray-400 hover:text-gray-900 rounded-xl text-[11px] font-black uppercase tracking-widest border border-gray-100 transition-all">Configure</button>
                  <button className="px-6 py-2.5 bg-black text-white rounded-xl text-[11px] font-black uppercase tracking-widest shadow-lg active:scale-95 transition-all">Go Live</button>
               </div>
            </div>
         ))}
      </div>

      {/* SECURITY COMPLIANCE FOOTER */}
      <div className="p-10 bg-gray-950 rounded-[48px] text-white overflow-hidden relative group">
         <div className="absolute top-0 right-0 p-10 opacity-10 scale-[3] -rotate-12 translate-x-20 focus:outline-none focus:ring-0"><ShieldCheck size={140} strokeWidth={1} /></div>
         <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-12">
            <div className="max-w-xl">
               <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center border border-white/5 shadow-inner"><BadgeCheck size={28} className="text-emerald-400" /></div>
                  <h4 className="text-[16px] font-black uppercase tracking-widest leading-none">PCI-DSS Level 1 Encryption</h4>
               </div>
               <p className="text-[13px] font-bold text-gray-500 leading-relaxed italic opacity-80">"Redigo ensures that all financial interactions between drivers and the platform are end-to-end encrypted. Audit logs for each payout settlement are stored on a separate immutable node for regulatory compliance."</p>
               <div className="flex items-center gap-4 mt-8">
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/5">
                     <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                     <span className="text-[10px] font-black uppercase tracking-widest leading-none">Gateway Sync: Optimal</span>
                  </div>
               </div>
            </div>

            <div className="flex-shrink-0">
               <button className="px-10 py-5 bg-white text-gray-950 text-[13px] font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-gray-100 active:scale-95 transition-all shadow-2xl flex items-center gap-4 group">
                  Verify Gateway Status <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
               </button>
               <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest text-center mt-4 opacity-50 focus:outline-none">Last Audit: 12 minutes ago</p>
            </div>
         </div>
      </div>
    </div>
  );
};

export default PaymentMethods;
