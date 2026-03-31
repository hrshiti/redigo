import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  Download, 
  UserPlus, 
  Mail, 
  Phone, 
  Star, 
  History, 
  Ban,
  ShieldCheck,
  ChevronDown,
  X,
  CreditCard,
  User as UserIcon,
  Trash2,
  CheckCircle2,
  ArrowUpRight,
  ArrowDownRight,
  Printer,
  Copy,
  ChevronRight,
  ArrowRight
} from 'lucide-react';

const UserStatusBadge = ({ status }) => {
  const styles = {
    Active: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    Suspended: 'bg-amber-50 text-amber-600 border-amber-100',
    Blocked: 'bg-rose-50 text-rose-600 border-rose-100',
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold border flex items-center gap-1.5 w-fit ${styles[status]}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${status === 'Active' ? 'bg-emerald-500' : status === 'Suspended' ? 'bg-amber-500' : 'bg-rose-500'}`}></span>
      {status}
    </span>
  );
};

const UserList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('This Year');
  const [activeMenu, setActiveMenu] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  
  const [users, setUsers] = useState([
    { id: 'USR001', name: 'Amit Sharma', email: 'amit@example.com', phone: '+91 9876543210', rides: 42, rating: 4.8, wallet: '₹1,240', status: 'Active', joined: 'Jan 12, 2024' },
    { id: 'USR002', name: 'Priya Verma', email: 'priya@example.com', phone: '+91 8765432109', rides: 15, rating: 4.5, wallet: '₹0', status: 'Active', joined: 'Feb 05, 2024' },
    { id: 'USR003', name: 'Rahul Gupta', email: 'rahul@example.com', phone: '+91 7654321098', rides: 0, rating: 0.0, wallet: '₹500', status: 'Suspended', joined: 'Mar 10, 2024' },
    { id: 'USR004', name: 'Vikram Singh', email: 'vikram@example.com', phone: '+91 6543210987', rides: 89, rating: 4.9, wallet: '₹4,320', status: 'Active', joined: 'Dec 22, 2023' },
    { id: 'USR005', name: 'Sneha Reddy', email: 'sneha@example.com', phone: '+91 5432109876', rides: 3, rating: 3.2, wallet: '₹150', status: 'Blocked', joined: 'Mar 15, 2024' },
    { id: 'USR006', name: 'Karan Mehra', email: 'karan@example.com', phone: '+91 4321098765', rides: 124, rating: 4.7, wallet: '₹890', status: 'Active', joined: 'Nov 30, 2023' },
  ]);

  const [selectedUser, setSelectedUser] = useState(null);
  const [modalType, setModalType] = useState(null);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.phone.includes(searchTerm);
    const matchesStatus = statusFilter === 'All' || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const toggleStatus = (userId) => {
    setUsers(users.map(u => {
      if (u.id === userId) {
        return { ...u, status: u.status === 'Active' ? 'Suspended' : 'Active' };
      }
      return u;
    }));
  };

  const toggleSelectAll = () => {
    if (selectedRows.length === filteredUsers.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(filteredUsers.map(u => u.id));
    }
  };

  const toggleRowSelect = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter(rideId => rideId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const toggleMenu = (e, userId) => {
    e.stopPropagation();
    setActiveMenu(activeMenu === userId ? null : userId);
  };

  useEffect(() => {
    const closeMenu = () => setActiveMenu(null);
    window.addEventListener('click', closeMenu);
    return () => window.removeEventListener('click', closeMenu);
  }, []);

  return (
    <div className="space-y-8 p-1 animate-in fade-in duration-700 relative text-gray-950 font-sans">
      {/* MATE STYLE HEADER */}
      <div className="flex items-start justify-between">
         <div>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-2">Passengers</h1>
            <div className="flex items-center gap-2 text-[13px] font-bold text-gray-400">
               <span className="text-gray-950">Overview</span>
               <ChevronRight size={14} />
               <span>All Customers</span>
            </div>
         </div>
         <div className="flex items-center gap-3">
            <button className="bg-white border border-gray-200 text-gray-950 px-5 py-2.5 rounded-xl text-[13px] font-bold flex items-center gap-2 hover:bg-gray-50 transition-all shadow-sm">
               <Download size={16} className="text-gray-400" /> Export
            </button>
            <button 
              onClick={() => setModalType('add')}
              className="bg-black text-white px-5 py-2.5 rounded-xl text-[13px] font-bold flex items-center gap-2 hover:opacity-90 transition-all shadow-md"
            >
               <UserPlus size={16} /> New User
            </button>
         </div>
      </div>

      {/* SEARCH & FILTERS - MATE STYLE */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
         <div className="flex flex-wrap items-center gap-2">
            <div className="px-3 py-1 bg-black text-white text-[12px] font-bold rounded-lg cursor-pointer">All Users</div>
            <div className="px-3 py-1 bg-gray-50 text-gray-500 text-[12px] font-bold rounded-lg border border-gray-100 hover:bg-gray-100 transition-all cursor-pointer flex items-center gap-1.5">
               Status <ChevronDown size={14} />
            </div>
            <div className="px-3 py-1 bg-gray-50 text-gray-500 text-[12px] font-bold rounded-lg border border-gray-100 hover:bg-gray-100 transition-all cursor-pointer flex items-center gap-1.5">
               Date joined <ChevronDown size={14} />
            </div>
            <div className="px-3 py-1 bg-gray-50 text-gray-500 text-[12px] font-bold rounded-lg border border-gray-100 hover:bg-gray-100 transition-all cursor-pointer flex items-center gap-1.5">
               All filters <Filter size={14} />
            </div>
         </div>
         <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
               type="text" 
               placeholder="Search customers..." 
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
                                className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all cursor-pointer ${selectedRows.length === filteredUsers.length ? 'bg-black border-black text-white' : 'border-gray-200 hover:border-gray-300'}`}
                              >
                                 {selectedRows.length === filteredUsers.length && <CheckCircle2 size={12} />}
                              </div>
                           </th>
                           <th className="px-4 py-5 font-bold">User</th>
                           <th className="px-4 py-5 font-bold">Status</th>
                           <th className="px-4 py-5 font-bold">Rating</th>
                           <th className="px-4 py-5 font-bold">Wallet</th>
                           <th className="px-4 py-5 font-bold">Joined</th>
                           <th className="px-6 py-5 text-right font-bold"></th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-gray-50">
                        {filteredUsers.map((user) => (
                           <tr key={user.id} className={`group hover:bg-gray-50/50 transition-all ${selectedRows.includes(user.id) ? 'bg-gray-50/80 shadow-inner' : ''}`}>
                              <td className="px-6 py-4">
                                 <div 
                                   onClick={(e) => { e.stopPropagation(); toggleRowSelect(user.id); }}
                                   className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all cursor-pointer ${selectedRows.includes(user.id) ? 'bg-black border-black text-white' : 'border-gray-100 group-hover:border-gray-300'}`}
                                 >
                                    {selectedRows.includes(user.id) && <CheckCircle2 size={12} />}
                                 </div>
                              </td>
                              <td className="px-4 py-4">
                                 <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 text-gray-900 font-bold text-[13px] flex items-center justify-center shadow-sm">
                                       {user.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <div>
                                       <p className="text-[14px] font-bold text-gray-900 tracking-tight leading-none">{user.name}</p>
                                       <p className="text-[12px] text-gray-400 mt-1 font-medium">{user.email}</p>
                                    </div>
                                 </div>
                              </td>
                              <td className="px-4 py-4">
                                 <UserStatusBadge status={user.status} />
                              </td>
                              <td className="px-4 py-4">
                                 <div className="flex items-center gap-1 text-[13px] font-bold text-gray-900">
                                    {user.rating} <Star size={12} className="fill-gray-950 text-gray-950" />
                                 </div>
                              </td>
                              <td className="px-4 py-4">
                                 <p className="text-[13px] font-bold text-gray-950">{user.wallet}</p>
                              </td>
                              <td className="px-4 py-4">
                                 <p className="text-[12px] font-bold text-gray-400 uppercase tracking-tighter">{user.joined.split(',')[0]} <span className="text-[10px] opacity-60">'24</span></p>
                              </td>
                              <td className="px-6 py-4 text-right">
                                 <div className="relative">
                                    <button 
                                      onClick={(e) => toggleMenu(e, user.id)}
                                      className="p-2 text-gray-400 hover:text-gray-900 hover:bg-white rounded-lg transition-all"
                                    >
                                       <MoreHorizontal size={18} />
                                    </button>
                                    {activeMenu === user.id && (
                                       <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-200">
                                          <button className="w-full text-left px-4 py-2 text-[12px] font-bold text-gray-700 hover:bg-gray-50 flex items-center gap-3">
                                             <UserIcon size={14} className="text-gray-400" /> View Profile
                                          </button>
                                          <button className="w-full text-left px-4 py-2 text-[12px] font-bold text-gray-700 hover:bg-gray-50 flex items-center gap-3">
                                             <CreditCard size={14} className="text-gray-400" /> Wallet history
                                          </button>
                                          <div className="h-px bg-gray-50 my-1 mx-2"></div>
                                          <button className="w-full text-left px-4 py-2 text-[12px] font-bold text-rose-600 hover:bg-rose-50 flex items-center gap-3">
                                             <Ban size={14} /> Ban user
                                          </button>
                                       </div>
                                    )}
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
               <h4 className="text-[12px] font-bold text-gray-400 uppercase tracking-widest mb-6">User Stats Summary</h4>
               
               <div className="flex flex-col items-center mb-8">
                  <div className="relative w-32 h-32 flex items-center justify-center">
                     <svg className="w-full h-full -rotate-90">
                        <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-gray-50" />
                        <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray="364" strokeDashoffset="40" className="text-emerald-500" />
                     </svg>
                     <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <p className="text-2xl font-black text-gray-950 leading-none">89%</p>
                        <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase">Active</p>
                     </div>
                  </div>
               </div>

               <div className="space-y-4">
                  <div className="flex items-center justify-between">
                     <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                        <span className="text-[12px] font-bold text-gray-500">Active users</span>
                     </div>
                     <span className="text-[12px] font-black text-gray-950">1.24k</span>
                  </div>
                  <div className="flex items-center justify-between">
                     <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-rose-500"></div>
                        <span className="text-[12px] font-bold text-gray-500">Blocked users</span>
                     </div>
                     <span className="text-[12px] font-black text-gray-950">42</span>
                  </div>
                  <div className="flex items-center justify-between pb-2 border-b border-gray-50">
                     <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                        <span className="text-[12px] font-bold text-gray-500">New this week</span>
                     </div>
                     <span className="text-[12px] font-black text-gray-950">128</span>
                  </div>
               </div>

               <div className="mt-8 grid grid-cols-2 gap-6">
                  <div>
                     <p className="text-xl font-black text-gray-950">4.8k</p>
                     <p className="text-[9px] font-black text-gray-400 uppercase mt-1 tracking-widest">Total Rides</p>
                  </div>
                  <div>
                     <p className="text-xl font-black text-rose-500">12%</p>
                     <p className="text-[9px] font-black text-gray-400 uppercase mt-1 tracking-widest">Churn Rate</p>
                  </div>
               </div>
            </div>

            <div className="bg-gray-950 p-8 rounded-[32px] text-white shadow-2xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-6 opacity-20"><ArrowUpRight size={100} strokeWidth={1} /></div>
               <div className="relative z-10">
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-6">Wallet Balance Pool</p>
                  <p className="text-4xl font-black mb-1 tracking-tighter">₹8,42,010</p>
                  <p className="text-[12px] font-bold text-emerald-400 flex items-center gap-1.5 mt-2">
                     <ArrowUpRight size={14} /> +24.8% <span className="text-gray-500">from last month</span>
                  </p>
                  <button className="w-full mt-10 py-4 bg-white/10 hover:bg-white/20 border border-white/10 rounded-2xl text-[12px] font-black uppercase tracking-widest transition-all">
                     View Ledger
                  </button>
               </div>
            </div>
         </div>
      </div>

      {/* FLOATING ACTION BAR FOR SELECTED ITEMS */}
      {selectedRows.length > 0 && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-gray-950 text-white px-8 py-4 rounded-[28px] shadow-2xl flex items-center gap-8 animate-in slide-in-from-bottom-10 duration-500 z-[100] border border-white/10 min-w-[500px]">
           <div className="flex items-center gap-3 pr-8 border-r border-white/20">
              <button 
                onClick={() => setSelectedRows([])}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all"
              >
                 <X size={16} />
              </button>
              <p className="text-[14px] font-black tracking-tight leading-none">
                 {selectedRows.length} <span className="text-gray-500 uppercase text-[10px] font-black ml-1 tracking-widest">Selected</span>
              </p>
           </div>
           
           <div className="flex items-center gap-6">
              <button className="flex items-center gap-2 text-[12px] font-black hover:text-primary transition-colors cursor-pointer">
                 <Printer size={16} className="text-gray-500" /> Print
              </button>
              <button className="flex items-center gap-2 text-[12px] font-black hover:text-primary transition-colors cursor-pointer">
                 <Copy size={16} className="text-gray-500" /> Duplicate
              </button>
              <button className="flex items-center gap-2 text-[12px] font-black hover:text-primary transition-colors cursor-pointer">
                 <Download size={16} className="text-gray-500" /> Export
              </button>
              <button className="p-2 text-gray-500 hover:text-white transition-colors">
                 <MoreHorizontal size={18} />
              </button>
           </div>
        </div>
      )}
    </div>
  );
};

export default UserList;
