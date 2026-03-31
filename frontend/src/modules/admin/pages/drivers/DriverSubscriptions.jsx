import React, { useState } from 'react';
import { 
  Zap, 
  Search, 
  ChevronRight, 
  ChevronDown, 
  Calendar, 
  CreditCard, 
  Users, 
  TrendingUp, 
  CheckCircle2, 
  Plus, 
  MoreHorizontal, 
  Download, 
  IndianRupee,
  ShieldCheck,
  ZapIcon
} from 'lucide-react';

const DriverSubscriptions = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const [plans] = useState([
    { id: 'PLN-01', name: 'Elite Weekly', price: '₹999', validity: '7 Days', active: 421, revenue: '₹4.2L' },
    { id: 'PLN-02', name: 'Pro Monthly', price: '₹2,499', validity: '30 Days', active: 1120, revenue: '₹28L' },
    { id: 'PLN-03', name: 'Starter Daily', price: '₹149', validity: '24 Hours', active: 890, revenue: '₹1.3L' },
  ]);

  const [recentSubscriptions] = useState([
    { id: 'SUB001', driver: 'Rahul S.', plan: 'Pro Monthly', date: 'Mar 31, 2024', status: 'Active', method: 'UPI' },
    { id: 'SUB002', driver: 'Vijay P.', plan: 'Elite Weekly', date: 'Mar 31, 2024', status: 'Active', method: 'Wallet' },
    { id: 'SUB003', driver: 'Anil D.', plan: 'Starter Daily', date: 'Mar 30, 2024', status: 'Active', method: 'UPI' },
    { id: 'SUB004', driver: 'Suresh K.', plan: 'Pro Monthly', date: 'Mar 30, 2024', status: 'Expired', method: 'Card' },
  ]);

  return (
    <div className="space-y-10 p-1 animate-in fade-in duration-700 font-sans text-gray-950">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
         <div>
            <h1 className="text-4xl font-black tracking-tight text-gray-900 mb-2 leading-none">Subscription Revenue</h1>
            <div className="flex items-center gap-2 text-[13px] font-bold text-gray-400">
               <span className="text-gray-950">Finance</span>
               <ChevronRight size={14} />
               <span>Plan Performance</span>
            </div>
         </div>
         <div className="flex items-center gap-3">
            <button className="bg-white border border-gray-100 text-gray-950 px-5 py-2.5 rounded-xl text-[12px] font-black flex items-center gap-2 hover:bg-gray-50 transition-all shadow-sm">
               <Download size={16} className="text-gray-400" /> Export Logs
            </button>
            <button className="bg-black text-white px-5 py-2.5 rounded-xl text-[12px] font-black flex items-center gap-2 hover:opacity-90 transition-all shadow-xl">
               <Plus size={16} /> Create New Plan
            </button>
         </div>
      </div>

      {/* REVENUE CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
         {plans.map((plan) => (
            <div key={plan.id} className="bg-white rounded-[40px] border border-gray-50 shadow-sm p-8 hover:shadow-xl transition-all group overflow-hidden relative">
               <div className="absolute top-0 right-0 p-6 opacity-5 scale-[2] -rotate-12 translate-x-4"><ZapIcon size={80} strokeWidth={1} /></div>
               <div className="flex items-center justify-between mb-8 relative z-10">
                  <div className="w-12 h-12 rounded-[18px] bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100"><Zap size={24} /></div>
                  <div className="px-3 py-1 bg-gray-50 text-gray-400 text-[10px] font-black uppercase tracking-widest rounded-lg border border-gray-100">{plan.id}</div>
               </div>
               <div className="relative z-10 mb-8">
                  <h3 className="text-2xl font-black text-gray-950 tracking-tight leading-none mb-2">{plan.name}</h3>
                  <div className="flex items-center gap-4">
                     <p className="text-2xl font-black text-emerald-600">{plan.price}</p>
                     <div className="w-1 h-1 rounded-full bg-gray-200"></div>
                     <p className="text-[12px] font-bold text-gray-400 uppercase tracking-widest">{plan.validity}</p>
                  </div>
               </div>
               <div className="grid grid-cols-2 gap-8 relative z-10 pt-8 border-t border-gray-50">
                  <div>
                     <p className="text-2xl font-black text-gray-950 leading-none">{plan.active}</p>
                     <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mt-2">Active Users</p>
                  </div>
                  <div>
                     <p className="text-2xl font-black text-indigo-600 leading-none">{plan.revenue}</p>
                     <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mt-2">Total Yield</p>
                  </div>
               </div>
            </div>
         ))}
      </div>

      {/* RECENT SUBSCRIPTIONS TABLE */}
      <div className="space-y-8">
         <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black tracking-tight text-gray-900 leading-none">Global Transactions</h2>
            <div className="flex items-center gap-3">
               <div className="relative w-64">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input type="text" placeholder="Filter by driver or plan..." className="w-full pl-11 pr-4 py-3 bg-white border border-gray-100 rounded-xl text-[12px] font-bold focus:ring-2 focus:ring-gray-100 outline-none transition-all" />
               </div>
            </div>
         </div>

         <div className="bg-white rounded-[40px] border border-gray-50 shadow-sm overflow-hidden">
            <div className="overflow-x-auto no-scrollbar">
               <table className="w-full text-left">
                  <thead>
                     <tr className="border-b border-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] bg-gray-50/20">
                        <th className="px-8 py-5">Driver Name</th>
                        <th className="px-6 py-5">Active Plan</th>
                        <th className="px-6 py-5">Activation Date</th>
                        <th className="px-6 py-5 shrink-0">Method</th>
                        <th className="px-6 py-5 text-center">Status</th>
                        <th className="px-8 py-5 text-right w-10"></th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                     {recentSubscriptions.map((sub, i) => (
                        <tr key={i} className="hover:bg-gray-50/30 transition-all cursor-pointer group">
                           <td className="px-8 py-6">
                              <div className="flex items-center gap-4">
                                 <div className="w-10 h-10 rounded-xl bg-gray-100 border border-gray-200 text-gray-950 font-black text-[12px] flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform uppercase">
                                    {sub.driver.split(' ').map(n => n[0]).join('')}
                                 </div>
                                 <p className="text-[13px] font-bold text-gray-950 tracking-tight">{sub.driver}</p>
                              </div>
                           </td>
                           <td className="px-6 py-6">
                              <div className="flex items-center gap-2">
                                 <Zap size={14} className="text-indigo-500" />
                                 <span className="text-[13px] font-black text-gray-800">{sub.plan}</span>
                              </div>
                           </td>
                           <td className="px-6 py-6">
                              <div className="flex items-center gap-2 text-[12px] font-bold text-gray-500">
                                 <Calendar size={14} /> {sub.date}
                              </div>
                           </td>
                           <td className="px-6 py-6 font-bold text-[11px] text-gray-500 uppercase tracking-widest">{sub.method}</td>
                           <td className="px-6 py-6 text-center">
                              <span className={`px-2 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-widest border ${sub.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'}`}>
                                 {sub.status}
                              </span>
                           </td>
                           <td className="px-8 py-6 text-right">
                              <button className="p-2.5 text-gray-400 hover:text-gray-950 hover:bg-white rounded-xl transition-all shadow-sm hover:shadow-md border border-transparent hover:border-gray-50">
                                 <MoreHorizontal size={18} />
                              </button>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>

            {/* REVENUE SUMMARY FOOTER */}
            <div className="p-8 bg-gray-50/30 border-t border-gray-50 flex items-center justify-between">
               <div className="flex items-center gap-8">
                  <div>
                     <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Total Active passes</p>
                     <p className="text-xl font-black text-gray-950 leading-none">2,431</p>
                  </div>
                  <div className="w-px h-8 bg-gray-200"></div>
                  <div>
                     <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Gross Yield (TTM)</p>
                     <p className="text-xl font-black text-indigo-600 leading-none">₹33,54,000</p>
                  </div>
               </div>
               <button className="px-6 py-3 bg-white border border-gray-100 rounded-xl text-[11px] font-black uppercase tracking-widest text-gray-950 hover:bg-gray-50 active:scale-95 transition-all shadow-sm">
                  Full Analytics <ChevronRight size={14} className="inline ml-1" />
               </button>
            </div>
         </div>
      </div>
    </div>
  );
};

export default DriverSubscriptions;
