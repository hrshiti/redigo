import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  Download, 
  Car, 
  Star, 
  CheckCircle2, 
  Clock, 
  XCircle,
  Eye,
  Settings,
  ChevronDown,
  ShieldCheck,
  Bike,
  Truck
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const VerificationBadge = ({ status }) => {
  const styles = {
    Verified: 'bg-green-50 text-green-600 border-green-100',
    Pending: 'bg-orange-50 text-orange-600 border-orange-100',
    Rejected: 'bg-red-50 text-red-600 border-red-100',
  };
  const icons = {
    Verified: <CheckCircle2 size={12} />,
    Pending: <Clock size={12} />,
    Rejected: <XCircle size={12} />,
  };
  return (
    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border flex items-center gap-1.5 w-fit ${styles[status]}`}>
      {icons[status]}
      {status}
    </span>
  );
};

const DriverList = () => {
  const [activeTab, setActiveTab] = useState('All');
  const navigate = useNavigate();
  
  const mockDrivers = [
    { id: 'DRV942', name: 'Rohan Deshmukh', vehicle: 'Maruti Dzire', type: 'Economy', rating: 4.9, status: 'Verified', online: true, city: 'Indore' },
    { id: 'DRV215', name: 'Suresh Patil', vehicle: 'Splendor Plus', type: 'Bike', rating: 4.7, status: 'Verified', online: false, city: 'Indore' },
    { id: 'DRV084', name: 'Vikram Mehta', vehicle: 'Toyota Innova', type: 'Luxury', rating: 4.8, status: 'Pending', online: false, city: 'Dewas' },
    { id: 'DRV552', name: 'Amit Tiwari', vehicle: 'Honda Activa', type: 'Bike', rating: 3.5, status: 'Rejected', online: false, city: 'Indore' },
    { id: 'DRV112', name: 'Deepak Rao', vehicle: 'Hyundai i20', type: 'Economy', rating: 4.6, status: 'Verified', online: true, city: 'Ujjain' },
    { id: 'DRV773', name: 'Yashwardhan S.', vehicle: 'Tata Ace', type: 'Truck', rating: 4.5, status: 'Verified', online: true, city: 'Indore' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Driver Operations</h1>
          <p className="text-gray-400 font-bold text-[12px] mt-1 uppercase tracking-widest leading-none">Fleet Management & Verification</p>
        </div>
        <div className="flex items-center gap-3">
           <button className="bg-white border border-gray-200 text-gray-600 px-4 py-2 rounded-lg text-[13px] font-bold hover:bg-gray-50 flex items-center gap-2">
             <Download size={16} /> Audit Log
           </button>
           <button className="bg-black text-white px-4 py-2 rounded-lg text-[13px] font-bold hover:opacity-90 transition-all shadow-sm flex items-center gap-2">
             <ShieldCheck size={16} /> Quick Verification
           </button>
        </div>
      </div>

      {/* Analytics Mini Cards */}
      <div className="grid grid-cols-4 gap-4">
         <div className="bg-white p-4 rounded-xl border border-gray-100">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Fleet</p>
            <p className="text-2xl font-black text-gray-900 mt-1">1,248</p>
         </div>
         <div className="bg-white p-4 rounded-xl border border-gray-100">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Active Now</p>
            <div className="flex items-center gap-2 mt-1">
               <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
               <p className="text-2xl font-black text-gray-900">482</p>
            </div>
         </div>
         <div className="bg-white p-4 rounded-xl border border-gray-100">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Pending KYC</p>
            <p className="text-2xl font-black text-primary mt-1">56</p>
         </div>
         <div className="bg-white p-4 rounded-xl border border-gray-100">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Avg. Rating</p>
            <p className="text-2xl font-black text-gray-900 mt-1">4.85</p>
         </div>
      </div>

      {/* Tabs & Search */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="p-4 flex items-center justify-between border-b border-gray-50">
           <div className="flex items-center gap-1 p-1 bg-gray-50/50 rounded-lg">
             {['All', 'Verified', 'Pending', 'Rejected', 'Online'].map(tab => (
               <button 
                 key={tab}
                 onClick={() => setActiveTab(tab)}
                 className={`px-4 py-1.5 rounded-md text-[12px] font-bold transition-all ${
                   activeTab === tab ? 'bg-white text-gray-900 shadow-sm border border-gray-100' : 'text-gray-400 hover:text-gray-600'
                 }`}
               >
                 {tab}
               </button>
             ))}
           </div>
           <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
              <input 
                type="text" 
                placeholder="Search drivers..." 
                className="w-full pl-9 pr-4 py-1.5 bg-gray-50/50 border-none rounded-lg text-[13px] font-medium focus:ring-1 focus:ring-primary/20"
              />
           </div>
        </div>

        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50/20 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50">
              <th className="px-6 py-3">Driver</th>
              <th className="px-4 py-3">Vehicle Info</th>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3">Rating</th>
              <th className="px-4 py-3 text-center">Live Status</th>
              <th className="px-4 py-3">KYC Status</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {mockDrivers.map((driver, idx) => (
              <tr key={idx} className="hover:bg-gray-50/50 transition-all cursor-pointer group">
                <td className="px-6 py-3.5">
                   <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-black text-[10px]">
                        {driver.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="leading-none text-left">
                         <p className="text-[13px] font-black text-gray-900">{driver.name}</p>
                         <p className="text-[10px] font-medium text-gray-400 mt-1 uppercase tracking-tight">{driver.id}</p>
                      </div>
                   </div>
                </td>
                <td className="px-4 py-3.5">
                   <div className="flex items-center gap-2">
                      <div className="p-1 rounded bg-gray-50 text-gray-500">
                         {driver.type === 'Bike' ? <Bike size={14} /> : driver.type === 'Truck' ? <Truck size={14} /> : <Car size={14} />}
                      </div>
                      <div className="leading-none text-left">
                         <p className="text-[12px] font-bold text-gray-700">{driver.vehicle}</p>
                         <p className="text-[10px] font-medium text-gray-400 mt-1 uppercase tracking-tighter">{driver.type}</p>
                      </div>
                   </div>
                </td>
                <td className="px-4 py-3.5 text-[12px] font-bold text-gray-600">{driver.city}</td>
                <td className="px-4 py-3.5">
                   <div className="flex items-center gap-1.5 text-[13px] font-black text-gray-900">
                      {driver.rating} <Star size={11} className="fill-orange-400 text-orange-400" />
                   </div>
                </td>
                <td className="px-4 py-3.5 text-center">
                   <span className={`inline-block w-2.5 h-2.5 rounded-full ${driver.online ? 'bg-green-500 shadow-lg shadow-green-200' : 'bg-gray-300'}`}></span>
                </td>
                <td className="px-4 py-3.5">
                   <VerificationBadge status={driver.status} />
                </td>
                <td className="px-6 py-3.5 text-right">
                   <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => navigate('/admin/drivers/audit/' + driver.id)}
                        className="p-2 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-all" 
                        title="Review Documents"
                      >
                        <Eye size={16} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all">
                        <Settings size={16} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-950 hover:bg-gray-100 rounded-lg transition-all">
                        <MoreHorizontal size={16} />
                      </button>
                   </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DriverList;
