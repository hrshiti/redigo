import React from 'react';
import { 
  Users, 
  Car, 
  CheckCircle2, 
  Clock, 
  Wallet, 
  IndianRupee, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight, 
  History, 
  CircleAlert,
  ChevronRight,
  TrendingDown,
  LayoutGrid,
  Zap,
  ShieldCheck,
  MoreHorizontal
} from 'lucide-react';

const StatCard = ({ icon: Icon, label, value, trend, color }) => (
  <div className="bg-white p-8 rounded-[32px] border border-gray-50 shadow-sm hover:shadow-md transition-all group relative overflow-hidden group">
    <div className={`absolute top-0 right-0 p-4 opacity-5 text-${color}-500 transform translate-x-4 -translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-700`}>
       <Icon size={120} strokeWidth={1} />
    </div>
    <div className="relative z-10">
      <div className="flex items-center justify-between mb-8">
        <div className={`w-12 h-12 rounded-2xl bg-${color}-50 text-${color}-600 border border-${color}-100 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform`}>
          <Icon size={24} />
        </div>
        <div className="flex flex-col items-end">
           <div className={`flex items-center gap-1 text-[11px] font-black uppercase tracking-widest ${trend > 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
             {trend > 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />} {Math.abs(trend)}%
           </div>
           <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase">vs last month</p>
        </div>
      </div>
      <div>
        <h4 className="text-[12px] font-bold text-gray-400 uppercase tracking-widest mb-1">{label}</h4>
        <p className="text-4xl font-black text-gray-950 tracking-tight">{value}</p>
      </div>
    </div>
  </div>
);

const SectionTitle = ({ title, subtitle }) => (
  <div className="mb-8">
    <h2 className="text-2xl font-bold tracking-tight text-gray-950 mb-1">{title}</h2>
    {subtitle && <p className="text-[13px] font-bold text-gray-400 uppercase tracking-widest leading-none">{subtitle}</p>}
  </div>
);

const MainDashboard = () => {
  const stats = {
    registrations: [
      { icon: Users, label: 'Total Drivers', value: '14,248', trend: 12, color: 'indigo' },
      { icon: CheckCircle2, label: 'Approved Drivers', value: '12,890', trend: 8, color: 'emerald' },
      { icon: Clock, label: 'Pending Drivers', value: '1,358', trend: -4, color: 'amber' },
      { icon: Users, label: 'Registered Users', value: '89.4k', trend: 24, color: 'blue' },
    ],
    financials: [
      { label: 'Total Trips Completed', value: '45,210', icon: Car, color: 'emerald' },
      { 
        label: 'System Revenue Breakdown', 
        primary: { label: 'Admin Commission', value: '₹12,45,000' },
        secondary: [
          { label: 'By Cash', value: '₹4.2k' },
          { label: 'By Wallet', value: '₹8.9k' },
          { label: 'Online Pay', value: '₹12.4k' },
          { label: 'Drivers Payout', value: '₹45k' },
        ],
        icon: IndianRupee,
        color: 'rose'
      }
    ],
    cancellations: [
      { icon: CircleAlert, label: 'Total Requests Cancel', value: '2,428', trend: -12, color: 'rose' },
      { icon: UserIcon, label: 'By Users', value: '1,120', trend: -8, color: 'rose' },
      { icon: Car, label: 'By Drivers', value: '942', trend: -15, color: 'rose' },
      { icon: Zap, label: 'By Dispatcher', value: '366', trend: -24, color: 'rose' },
    ],
  };

  return (
    <div className="space-y-12 pb-20 animate-in fade-in duration-700 font-sans text-gray-950">
      {/* HEADER SECTION - MATE STYLE */}
      <div className="flex items-start justify-between">
         <div>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-2">Overview</h1>
            <div className="flex items-center gap-2 text-[13px] font-bold text-gray-400">
               <span className="text-gray-950">Analytics</span>
               <ChevronRight size={14} />
               <span>Performance Metrices</span>
            </div>
         </div>
         <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100 animate-pulse transition-all">
               <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
               <span className="text-[11px] font-black uppercase tracking-widest">System Health: Optimal</span>
            </div>
            <button className="bg-black text-white px-5 py-2.5 rounded-xl text-[13px] font-bold flex items-center gap-2 hover:opacity-90 transition-all shadow-xl">
               <ArrowUpRight size={16} /> Reports
            </button>
         </div>
      </div>

      {/* REGISTRY SECTION */}
      <section>
        <SectionTitle title="User Base Migration" subtitle="Real-time registration tracking" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.registrations.map((stat, i) => (
            <StatCard key={i} {...stat} />
          ))}
        </div>
      </section>

      {/* FINANCIAL INSIGHTS SECTION */}
      <section className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-stretch">
        <div className="lg:col-span-1">
          <SectionTitle title="Operational" subtitle="Trip Velocity" />
          <div className="h-[calc(100%-80px)]">
             <StatCard 
               icon={Car} 
               label="Completed Success" 
               value="45,210" 
               trend={15} 
               color="emerald" 
             />
          </div>
        </div>
        
        <div className="lg:col-span-3">
          <SectionTitle title="Revenue Stream Mapping" subtitle="Global financial breakdown" />
          <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm relative overflow-hidden h-[calc(100%-80px)]">
             <div className="absolute top-0 right-0 p-10 opacity-5 text-indigo-500 scale-150"><IndianRupee size={200} strokeWidth={1} /></div>
             <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-12">
                <div className="flex flex-col gap-2 border-r border-gray-50 pr-12">
                   <p className="text-[12px] font-bold text-gray-400 uppercase tracking-widest">Admin Commission</p>
                   <p className="text-5xl font-black text-gray-950 tracking-tighter">₹12,45,000</p>
                   <p className="text-[12px] font-bold text-emerald-500 flex items-center gap-1.5 mt-2">
                      <ArrowUpRight size={14} /> +24% <span className="text-gray-400">from prev pool</span>
                   </p>
                </div>
                
                <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-8">
                   {[
                      { l: 'BY CASH', v: '₹4.2k', c: 'indigo' },
                      { l: 'BY WALLET', v: '₹8.9k', c: 'blue' },
                      { l: 'ONLINE', v: '₹12.4k', c: 'emerald' },
                      { l: 'PAYOUTS', v: '₹45k', c: 'rose' }
                   ].map((item, id) => (
                      <div key={id}>
                         <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{item.l}</p>
                         <p className="text-xl font-black text-gray-950 tracking-tight">{item.v}</p>
                         <div className="w-full h-1.5 bg-gray-50 rounded-full mt-3 overflow-hidden">
                            <div className={`h-full bg-${item.c}-500/60 w-2/3`}></div>
                         </div>
                      </div>
                   ))}
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* CANCELLATIONS SECTION */}
      <section>
        <SectionTitle title="Churn & Cancellations" subtitle="Failure point analysis" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.cancellations.map((stat, i) => (
            <StatCard key={i} {...stat} />
          ))}
        </div>
      </section>

      {/* MAP & TABLES SECTION (Mockups) */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <div className="lg:col-span-2">
            <SectionTitle title="Real-time Fleet" subtitle="Live tracking console" />
            <div className="bg-gray-100 rounded-[48px] h-[500px] border border-gray-200 overflow-hidden relative shadow-lg group">
                <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover grayscale brightness-50 opacity-80 group-hover:scale-105 transition-transform duration-[10s]" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent"></div>
                <div className="absolute top-6 left-6 flex items-center gap-3">
                   <div className="bg-white/90 backdrop-blur-md border border-white/20 p-4 rounded-3xl shadow-2xl flex items-center gap-4">
                      <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></div>
                      <div>
                         <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Live Units</p>
                         <p className="text-[14px] font-black text-gray-950 mt-1 uppercase tracking-tight">42 Active Drivers</p>
                      </div>
                   </div>
                </div>
                <div className="absolute bottom-10 right-10 flex flex-col gap-3">
                   <button className="bg-white text-gray-950 p-4 rounded-2xl shadow-2xl hover:scale-110 active:scale-95 transition-all outline-none border border-gray-100"><LayoutGrid size={20} /></button>
                   <button className="bg-black text-white p-4 rounded-2xl shadow-2xl hover:scale-110 active:scale-95 transition-all outline-none"><ShieldCheck size={20} /></button>
                </div>
            </div>
         </div>
         
         <div>
            <SectionTitle title="Live Booking Queue" subtitle="Processing logs" />
            <div className="bg-white rounded-[40px] border border-gray-50 shadow-sm p-6 space-y-4">
               {[1, 2, 3, 4, 5].map(i => (
                 <div key={i} className="p-4 bg-gray-50/50 rounded-2xl border border-gray-50 flex items-center justify-between group hover:bg-white transition-all hover:shadow-md cursor-pointer border-transparent hover:border-gray-100">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-gray-900 font-bold group-hover:scale-110 transition-transform">
                          0{i}
                       </div>
                       <div className="text-left">
                          <p className="text-[13px] font-bold text-gray-950 leading-none">Booking #45{i}2</p>
                          <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-widest">{i * 2} minutes ago</p>
                       </div>
                    </div>
                    <div className="flex items-center gap-2">
                       <div className={`w-1.5 h-1.5 rounded-full ${i % 2 === 0 ? 'bg-amber-500' : 'bg-emerald-500'}`}></div>
                       <ChevronRight size={16} className="text-gray-200 group-hover:text-gray-400 group-hover:translate-x-1 transition-all" />
                    </div>
                 </div>
               ))}
               <button className="w-full py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-gray-950 transition-all">View full transaction audit</button>
            </div>
         </div>
      </section>
    </div>
  );
};

// Generic UserIcon backup if lucide context fails
const UserIcon = ({ size, className }) => <Users size={size} className={className} />;

export default MainDashboard;
