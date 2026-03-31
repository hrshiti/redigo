import React, { useState } from 'react';
import { 
  Trash2, 
  UserX, 
  Search, 
  Calendar, 
  AlertCircle, 
  CheckCircle2, 
  XCircle,
  MoreHorizontal,
  Mail,
  Phone,
  Clock,
  ArrowRight,
  ChevronRight,
  ChevronDown,
  ChevronLeft,
  X,
  FileText
} from 'lucide-react';

const DeleteRequestUsers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  const [requests, setRequests] = useState([
    { id: 'DRQ001', userId: 'USR102', name: 'Siddharth Jain', email: 'siddharth@example.com', phone: '+91 9123456789', reason: 'Privacy concerns & data security', requestedDate: 'Mar 25, 2024', status: 'Pending' },
    { id: 'DRQ002', userId: 'USR215', name: 'Ananya Kapoor', email: 'ananya@example.com', phone: '+91 8234567890', reason: 'Moving to another city, no longer need service', requestedDate: 'Mar 28, 2024', status: 'In Review' },
    { id: 'DRQ003', userId: 'USR045', name: 'Mohit Rawat', email: 'mohit@example.com', phone: '+91 734567891', reason: 'Too many marketing notifications', requestedDate: 'Mar 30, 2024', status: 'Pending' },
    { id: 'DRQ004', userId: 'USR782', name: 'Isha Gupta', email: 'isha@example.com', phone: '+91 6456789012', reason: 'Duplicate account created by mistake', requestedDate: 'Mar 31, 2024', status: 'Pending' },
  ]);

  const handleAction = (id, newStatus) => {
    setRequests(requests.map(req => req.id === id ? { ...req, status: newStatus } : req));
  };

  const toggleSelectAll = () => {
    if (selectedRows.length === requests.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(requests.map(r => r.id));
    }
  };

  const toggleRowSelect = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter(rideId => rideId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const StatusBadge = ({ status }) => {
    const styles = {
      'Pending': 'bg-amber-50 text-amber-600 border-amber-100',
      'In Review': 'bg-blue-50 text-blue-600 border-blue-100',
      'Approved': 'bg-emerald-50 text-emerald-600 border-emerald-100',
      'Rejected': 'bg-rose-50 text-rose-600 border-rose-100',
    };
    return (
      <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold border flex items-center gap-1.5 w-fit ${styles[status]}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${status === 'Pending' ? 'bg-amber-500' : status === 'In Review' ? 'bg-blue-500' : status === 'Approved' ? 'bg-emerald-500' : 'bg-rose-500'}`}></span>
        {status}
      </span>
    );
  };

  return (
    <div className="space-y-8 p-1 animate-in fade-in duration-700 relative text-gray-950 font-sans">
      {/* MATE STYLE HEADER */}
      <div className="flex items-start justify-between">
         <div>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-2">Delete Requests</h1>
            <div className="flex items-center gap-2 text-[13px] font-bold text-gray-400">
               <span className="text-gray-950">Safety</span>
               <ChevronRight size={14} />
               <span>User Deletion Queue</span>
            </div>
         </div>
      </div>

      {/* FILTER BAR - MATE STYLE */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
         <div className="flex flex-wrap items-center gap-2">
            <div className="px-3 py-1 bg-black text-white text-[12px] font-bold rounded-lg cursor-pointer">Requests</div>
            <div className="px-3 py-1 bg-gray-50 text-gray-500 text-[12px] font-bold rounded-lg border border-gray-100 hover:bg-gray-100 transition-all cursor-pointer flex items-center gap-1.5">
               Status <ChevronDown size={14} />
            </div>
            <div className="px-3 py-1 bg-gray-50 text-gray-500 text-[12px] font-bold rounded-lg border border-gray-100 hover:bg-gray-100 transition-all cursor-pointer flex items-center gap-1.5">
               All filters <ChevronDown size={14} />
            </div>
         </div>
         <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
               type="text" 
               placeholder="Search by name or ID..." 
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               className="w-full pl-11 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-[13px] font-bold focus:ring-2 focus:ring-gray-100 outline-none transition-all"
            />
         </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8 items-start">
         {/* TABLE CONTAINER */}
         <div className="xl:col-span-3">
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-visible">
               <div className="overflow-x-auto no-scrollbar">
                  <table className="w-full text-left">
                     <thead>
                        <tr className="border-b border-gray-50 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                           <th className="px-6 py-5">
                              <div 
                                onClick={toggleSelectAll}
                                className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all cursor-pointer ${selectedRows.length === requests.length ? 'bg-black border-black text-white' : 'border-gray-200 hover:border-gray-300'}`}
                              >
                                 {selectedRows.length === requests.length && <CheckCircle2 size={12} />}
                              </div>
                           </th>
                           <th className="px-4 py-5 font-bold">User</th>
                           <th className="px-4 py-5 font-bold">Deletion Reason</th>
                           <th className="px-4 py-5 font-bold">Requested</th>
                           <th className="px-4 py-5 font-bold">Status</th>
                           <th className="px-6 py-5 text-right font-bold"></th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-gray-50">
                        {requests.filter(r => r.name.toLowerCase().includes(searchTerm.toLowerCase())).map((req) => (
                           <tr key={req.id} className={`group hover:bg-gray-50/50 transition-all ${selectedRows.includes(req.id) ? 'bg-gray-50/80 shadow-inner' : ''}`}>
                              <td className="px-6 py-4">
                                 <div 
                                   onClick={(e) => { e.stopPropagation(); toggleRowSelect(req.id); }}
                                   className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all cursor-pointer ${selectedRows.includes(req.id) ? 'bg-black border-black text-white' : 'border-gray-100 group-hover:border-gray-300'}`}
                                 >
                                    {selectedRows.includes(req.id) && <CheckCircle2 size={12} />}
                                 </div>
                              </td>
                              <td className="px-4 py-4">
                                 <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-rose-50 border border-rose-100 text-rose-600 font-bold text-[13px] flex items-center justify-center shadow-sm">
                                       {req.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <div>
                                       <p className="text-[14px] font-bold text-gray-900 tracking-tight leading-none">{req.name}</p>
                                       <p className="text-[12px] text-gray-400 mt-1 font-medium">{req.email}</p>
                                    </div>
                                 </div>
                              </td>
                              <td className="px-4 py-4">
                                 <p className="text-[12px] font-bold text-gray-500 italic max-w-[200px] truncate leading-none">"{req.reason}"</p>
                              </td>
                              <td className="px-4 py-4">
                                 <p className="text-[12px] font-bold text-gray-400 uppercase tracking-tighter">{req.requestedDate}</p>
                              </td>
                              <td className="px-4 py-4">
                                 <StatusBadge status={req.status} />
                              </td>
                              <td className="px-6 py-4 text-right">
                                 <div className="flex items-center justify-end gap-2 relative">
                                    <button 
                                      onClick={() => handleAction(req.id, 'Approved')}
                                      className="p-2 text-emerald-500 hover:bg-emerald-50 rounded-lg transition-all"
                                    >
                                       <CheckCircle2 size={18} />
                                    </button>
                                    <button 
                                      onClick={() => handleAction(req.id, 'Rejected')}
                                      className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-all"
                                    >
                                       <XCircle size={18} />
                                    </button>
                                    <button className="p-2 text-gray-400 hover:text-gray-900 rounded-lg transition-all">
                                       <MoreHorizontal size={18} />
                                    </button>
                                 </div>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>
         </div>

         {/* RIGHT SIDE STATS - MATE STYLE */}
         <div className="space-y-6">
            <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm relative overflow-hidden">
               <h4 className="text-[12px] font-bold text-gray-400 uppercase tracking-widest mb-6">Request Statistics</h4>
               
               <div className="flex flex-col items-center mb-8">
                  <div className="relative w-32 h-32 flex items-center justify-center">
                     <svg className="w-full h-full -rotate-90">
                        <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-gray-50" />
                        <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray="364" strokeDashoffset="180" className="text-rose-500" />
                     </svg>
                     <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <p className="text-2xl font-black text-gray-950 leading-none">52%</p>
                        <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase">Pending</p>
                     </div>
                  </div>
               </div>

               <div className="space-y-4">
                  <div className="flex items-center justify-between">
                     <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                        <span className="text-[12px] font-bold text-gray-500">New requests</span>
                     </div>
                     <span className="text-[12px] font-black text-gray-950">14</span>
                  </div>
                  <div className="flex items-center justify-between">
                     <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                        <span className="text-[12px] font-bold text-gray-500">In review</span>
                     </div>
                     <span className="text-[12px] font-black text-gray-950">28</span>
                  </div>
                  <div className="flex items-center justify-between pb-2 border-b border-gray-50">
                     <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                        <span className="text-[12px] font-bold text-gray-500">Approved</span>
                     </div>
                     <span className="text-[12px] font-black text-gray-950">152</span>
                  </div>
               </div>

               <div className="mt-8">
                  <p className="text-xl font-black text-gray-950">14 Hours</p>
                  <p className="text-[9px] font-black text-gray-400 uppercase mt-1 tracking-widest">Avg Response Time</p>
               </div>
            </div>

            <div className="bg-rose-50 p-8 rounded-[32px] border border-rose-100 shadow-sm relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-6 opacity-20 text-rose-500"><Trash2 size={100} strokeWidth={1} /></div>
               <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-14 h-14 bg-rose-100 text-rose-500 rounded-2xl flex items-center justify-center mb-4"><AlertCircle size={28} /></div>
                  <h4 className="text-[14px] font-black text-gray-900 uppercase tracking-widest mb-2">Legal Compliance</h4>
                  <p className="text-[12px] font-bold text-gray-500 leading-relaxed">Account deletion is permanent. PII masking will occur after 30 days of approval.</p>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default DeleteRequestUsers;
