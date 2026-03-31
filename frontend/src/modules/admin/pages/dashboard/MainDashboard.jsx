import React from 'react';
import { 
  Users, 
  Car, 
  ArrowUpRight, 
  ArrowDownRight,
  IndianRupee,
  MoreHorizontal,
  Download,
  Upload,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertCircle,
  Truck,
  TrendingUp,
  MapPin,
  Map as MapIcon
} from 'lucide-react';

const MetricBadge = ({ status }) => {
  const styles = {
    Completed: 'bg-green-50 text-green-600 border-green-100',
    Pending: 'bg-orange-50 text-orange-600 border-orange-100',
    Cancelled: 'bg-red-50 text-red-600 border-red-100',
    Ongoing: 'bg-blue-50 text-blue-600 border-blue-100',
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${styles[status] || 'bg-gray-50 text-gray-600'}`}>
      {status}
    </span>
  );
};

const MainDashboard = () => {
  const recentBookings = [
    { id: '#RID92541', customer: 'Esther Howard', type: 'Economy', status: 'Completed', amount: '₹342', date: 'Jun 19' },
    { id: '#RID92540', customer: 'David Miller', type: 'Luxury', status: 'Ongoing', amount: '₹1,240', date: 'Jun 19' },
    { id: '#RID92539', customer: 'James Moore', type: 'Bike', status: 'Completed', amount: '₹45', date: 'Jun 19' },
    { id: '#RID92538', customer: 'Robert Anderson', type: 'Economy', status: 'Cancelled', amount: '₹0', date: 'Jun 19' },
    { id: '#RID92537', customer: 'Jessica Martinez', type: 'Luxury', status: 'Completed', amount: '₹890', date: 'Jun 18' },
    { id: '#RID92536', customer: 'William Jackson', type: 'Auto', status: 'Completed', amount: '₹120', date: 'Jun 18' },
  ];

  return (
    <div className="flex gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* MAIN CONTENT AREA (MIDDLE) */}
      <div className="flex-1 min-w-0 space-y-8">
        {/* Table & Controls Section */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-50 flex items-center justify-between">
            <div className="flex items-center gap-2">
               <button className="bg-gray-900 text-white px-3 py-1.5 rounded-lg text-[11px] font-bold flex items-center gap-2">
                 Type <ChevronDown size={12} />
               </button>
               <button className="bg-white border border-gray-200 text-gray-600 px-3 py-1.5 rounded-lg text-[11px] font-bold flex items-center gap-2 hover:bg-gray-50">
                 Status <ChevronDown size={12} />
               </button>
               <button className="bg-white border border-gray-200 text-gray-600 px-3 py-1.5 rounded-lg text-[11px] font-bold flex items-center gap-2 hover:bg-gray-50">
                 All filters <Filter size={12} />
               </button>
            </div>
            <div className="flex items-center gap-2">
               <button className="bg-gray-950 text-white px-3 py-1.5 rounded-lg text-[11px] font-bold flex items-center gap-2">
                 <Upload size={12} /> Import
               </button>
               <button className="bg-white border border-gray-200 text-gray-600 px-3 py-1.5 rounded-lg text-[11px] font-bold flex items-center gap-2 hover:bg-gray-50">
                 <Download size={12} /> Export
               </button>
            </div>
          </div>

          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50">
                <th className="px-6 py-3 w-10"><input type="checkbox" className="rounded" /></th>
                <th className="px-4 py-3">Booking ID</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Vehicle</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Total</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-6 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recentBookings.map((ride, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition-all cursor-pointer group">
                  <td className="px-6 py-3.5"><input type="checkbox" className="rounded" /></td>
                  <td className="px-4 py-3.5 text-[12px] font-bold text-gray-900">{ride.id}</td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-black text-gray-500">
                        {ride.customer[0]}
                      </div>
                      <span className="text-[12px] font-bold text-gray-700">{ride.customer}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-[11px] font-medium text-gray-500">{ride.type}</td>
                  <td className="px-4 py-3.5"><MetricBadge status={ride.status} /></td>
                  <td className="px-4 py-3.5 text-[12px] font-black text-gray-900">{ride.amount}</td>
                  <td className="px-4 py-3.5 text-[11px] font-medium text-gray-500">{ride.date}</td>
                  <td className="px-6 py-3.5 text-right"><MoreHorizontal size={16} className="text-gray-300 ml-auto" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Global Map View - Integration of 'Gods Eye' in compact mode */}
        <div className="bg-[#1C2833] rounded-xl overflow-hidden relative h-[300px] shadow-sm border border-white/5">
           <div className="absolute inset-0 opacity-40 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=22.7196,75.8577&zoom=13&size=800x600&maptype=roadmap&style=feature:all|element:labels|visibility:off&style=feature:geometry|color:0x212121&style=feature:water|color:0x000000')] bg-cover"></div>
           <div className="relative z-10 p-5">
              <div className="flex items-center justify-between">
                <div className="bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-2">
                   <div className="w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
                   <span className="text-white text-[11px] font-bold uppercase tracking-widest">Live Fleet: 124 Online</span>
                </div>
                <button className="bg-white/10 backdrop-blur-sm p-2 rounded-lg text-white hover:bg-white/20 transition-all">
                  <MapPin size={16} />
                </button>
              </div>
           </div>
           
           <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md p-3 rounded-lg shadow-2xl flex gap-4 border border-white">
              <div className="text-left text-[11px] leading-tight pr-4 border-r border-gray-200">
                <p className="text-gray-400 font-bold uppercase tracking-wider mb-1">Peak Zone</p>
                <p className="text-gray-900 font-black">Rajwada Circle</p>
              </div>
              <div className="text-left text-[11px] leading-tight">
                <p className="text-gray-400 font-bold uppercase tracking-wider mb-1">Active Cap</p>
                <p className="text-gray-900 font-black">82% Capacity</p>
              </div>
           </div>
        </div>
      </div>

      {/* RIGHT SIDE PANEL (METRICS) */}
      <div className="w-80 shrink-0 space-y-6">
        {/* REVENUE GAUGE */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
           <div className="flex items-center justify-between mb-4">
              <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Revenue Today</h4>
              <TrendingUp size={14} className="text-primary" />
           </div>
           <div className="relative h-28 flex items-center justify-center">
              {/* SVG Mock Gauge */}
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="50%" cy="50%" r="45" className="fill-none stroke-gray-50 stroke-[8]" />
                <circle cx="50%" cy="50%" r="45" className="fill-none stroke-primary stroke-[8]" strokeDasharray="210" strokeDashoffset="50" />
              </svg>
              <div className="absolute flex flex-col items-center">
                 <span className="text-2xl font-black text-gray-900 leading-none">₹8.4k</span>
                 <span className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-tighter">142 rides</span>
              </div>
           </div>
           <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="text-left">
                 <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Completed</p>
                 <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <span className="text-[14px] font-black text-gray-900">₹6,840</span>
                 </div>
              </div>
              <div className="text-left">
                 <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Pending</p>
                 <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-gray-200"></div>
                    <span className="text-[14px] font-black text-gray-900">₹1,560</span>
                 </div>
              </div>
           </div>
        </div>

        {/* BOOKING STATUS PROGRESS */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
           <div className="flex items-center justify-between mb-6">
              <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Booking Status</h4>
              <span className="text-[10px] font-bold text-gray-400">Active</span>
           </div>
           <div className="space-y-5">
              {[
                { label: 'Completed', value: 89, color: 'bg-green-500' },
                { label: 'Cancelled', value: 8, color: 'bg-red-500' },
                { label: 'Pending', value: 3, color: 'bg-orange-500' },
              ].map((stat, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="flex justify-between text-[11px] font-bold">
                    <span className="text-gray-500">{stat.label}</span>
                    <span className="text-gray-900">{stat.value}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-gray-50 rounded-full overflow-hidden">
                    <div className={`${stat.color} h-full rounded-full`} style={{ width: `${stat.value}%` }}></div>
                  </div>
                </div>
              ))}
           </div>
        </div>

        {/* TOP PERFORMERS */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
           <div className="flex items-center justify-between mb-6">
              <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Top Drivers</h4>
              <span className="text-[10px] font-bold text-primary">This month</span>
           </div>
           <div className="space-y-4">
              {[
                { name: 'Vijay Kumar', rides: 142, rating: 4.9 },
                { name: 'Rahul Singh', rides: 128, rating: 4.8 },
                { name: 'Amit Sharma', rides: 115, rating: 4.7 },
              ].map((driver, i) => (
                <div key={i} className="flex items-center justify-between gap-3 group border-b border-gray-50 pb-3 last:border-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center font-black text-[10px] text-gray-600 uppercase border border-gray-100">
                      {driver.name[0]}
                    </div>
                    <div className="text-left">
                       <p className="text-[12px] font-bold text-gray-900">{driver.name}</p>
                       <p className="text-[10px] font-medium text-gray-400">⭐ {driver.rating} rating</p>
                    </div>
                  </div>
                  <div className="text-[12px] font-black text-gray-900">{driver.rides}</div>
                </div>
              ))}
           </div>
        </div>

        {/* OVERVIEW METRICS */}
        <div className="bg-[#F8F9FA] rounded-xl p-6 border border-gray-100">
           <div className="grid grid-cols-2 gap-y-6">
              <div className="text-left">
                 <p className="text-[20px] font-black text-gray-900 leading-none">₹2,246</p>
                 <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-tighter">Avg. Ticket</p>
              </div>
              <div className="text-left pl-4 border-l border-gray-200">
                 <p className="text-[20px] font-black text-gray-900 leading-none">1.7</p>
                 <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-tighter">Rides/hr</p>
              </div>
              <div className="text-left">
                 <p className="text-[20px] font-black text-gray-900 leading-none">16 min</p>
                 <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-tighter">Avg. Service</p>
              </div>
              <div className="text-left pl-4 border-l border-gray-200">
                 <p className="text-[20px] font-black text-gray-900 leading-none">0.32%</p>
                 <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-tighter">Bounce Rate</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const ChevronDown = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="m6 9 6 6 6-6"/>
  </svg>
);

export default MainDashboard;

