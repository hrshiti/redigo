import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  Download, 
  UserPlus, 
  Mail, 
  Phone, 
  Star, 
  IndianRupee, 
  History, 
  Ban,
  ShieldCheck,
  ChevronDown
} from 'lucide-react';

const UserStatusBadge = ({ status }) => {
  const styles = {
    Active: 'bg-green-50 text-green-600 border-green-100',
    Suspended: 'bg-orange-50 text-orange-600 border-orange-100',
    Blocked: 'bg-red-50 text-red-600 border-red-100',
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${styles[status]}`}>
      {status}
    </span>
  );
};

const UserList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const mockUsers = [
    { id: 'USR001', name: 'Amit Sharma', email: 'amit@example.com', phone: '+91 9876543210', rides: 42, rating: 4.8, wallet: '₹1,240', status: 'Active', joined: 'Jan 12, 2024' },
    { id: 'USR002', name: 'Priya Verma', email: 'priya@example.com', phone: '+91 8765432109', rides: 15, rating: 4.5, wallet: '₹0', status: 'Active', joined: 'Feb 05, 2024' },
    { id: 'USR003', name: 'Rahul Gupta', email: 'rahul@example.com', phone: '+91 7654321098', rides: 0, rating: 0.0, wallet: '₹500', status: 'Suspended', joined: 'Mar 10, 2024' },
    { id: 'USR004', name: 'Vikram Singh', email: 'vikram@example.com', phone: '+91 6543210987', rides: 89, rating: 4.9, wallet: '₹4,320', status: 'Active', joined: 'Dec 22, 2023' },
    { id: 'USR005', name: 'Sneha Reddy', email: 'sneha@example.com', phone: '+91 5432109876', rides: 3, rating: 3.2, wallet: '₹150', status: 'Blocked', joined: 'Mar 15, 2024' },
    { id: 'USR006', name: 'Karan Mehra', email: 'karan@example.com', phone: '+91 4321098765', rides: 124, rating: 4.7, wallet: '₹890', status: 'Active', joined: 'Nov 30, 2023' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Passenger Management</h1>
          <p className="text-gray-400 font-bold text-[12px] mt-1 uppercase tracking-widest leading-none">View and Manage Registered Users</p>
        </div>
        <div className="flex items-center gap-3">
           <button className="bg-white border border-gray-200 text-gray-600 px-4 py-2 rounded-lg text-[13px] font-bold flex items-center gap-2 hover:bg-gray-50 transition-all">
             <Download size={16} /> Export Data
           </button>
           <button className="bg-black text-white px-4 py-2 rounded-lg text-[13px] font-bold flex items-center gap-2 hover:opacity-90 transition-all shadow-sm">
             <UserPlus size={16} /> Add New User
           </button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col md:flex-row items-center gap-4">
         <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by Name, Email or Phone..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-2.5 bg-gray-50 border-none rounded-xl text-[14px] focus:ring-2 focus:ring-primary/20 transition-all font-medium placeholder:text-gray-300"
            />
         </div>
         <div className="flex items-center gap-2 w-full md:w-auto">
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white border border-gray-200 px-4 py-2.5 rounded-xl text-[13px] font-bold text-gray-600 hover:bg-gray-50 transition-all">
               <Filter size={16} /> Status: All <ChevronDown size={14} />
            </button>
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white border border-gray-200 px-4 py-2.5 rounded-xl text-[13px] font-bold text-gray-600 hover:bg-gray-50 transition-all">
               Joined: This Year <ChevronDown size={14} />
            </button>
         </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50/50 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50">
              <th className="px-6 py-4">User</th>
              <th className="px-4 py-4">Contact Details</th>
              <th className="px-4 py-4">Stats</th>
              <th className="px-4 py-4 text-center">Wallet</th>
              <th className="px-4 py-4">Status</th>
              <th className="px-4 py-4">Joined On</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {mockUsers.map((user, idx) => (
              <tr key={idx} className="hover:bg-gray-50/50 transition-all cursor-pointer group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-500 font-black text-xs border border-gray-200 group-hover:scale-105 transition-transform">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="text-left leading-tight">
                       <p className="text-[13px] font-black text-gray-900 tracking-tight">{user.name}</p>
                       <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter mt-0.5">{user.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-[12px] font-medium text-gray-600">
                       <Mail size={12} className="text-gray-300" /> {user.email}
                    </div>
                    <div className="flex items-center gap-2 text-[12px] font-medium text-gray-600">
                       <Phone size={12} className="text-gray-300" /> {user.phone}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                   <div className="flex items-center gap-4">
                      <div className="text-center leading-none">
                         <p className="text-[13px] font-black text-gray-900">{user.rides}</p>
                         <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter mt-1">Rides</p>
                      </div>
                      <div className="text-center leading-none">
                         <div className="flex items-center gap-0.5 text-[13px] font-black text-gray-900">
                            {user.rating} <Star size={10} className="fill-orange-400 text-orange-400" />
                         </div>
                         <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter mt-1">Rating</p>
                      </div>
                   </div>
                </td>
                <td className="px-4 py-4 text-center">
                   <span className="text-[14px] font-black text-gray-900 tracking-tight">{user.wallet}</span>
                </td>
                <td className="px-4 py-4">
                  <UserStatusBadge status={user.status} />
                </td>
                <td className="px-4 py-4">
                   <p className="text-[12px] font-bold text-gray-600">{user.joined}</p>
                </td>
                <td className="px-6 py-4 text-right">
                   <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-gray-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-all" title="View History">
                        <History size={16} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all" title="Suspend Account">
                        <Ban size={16} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all">
                        <MoreHorizontal size={16} />
                      </button>
                   </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {/* Pagination Placeholder */}
        <div className="p-4 border-t border-gray-50 flex items-center justify-between bg-gray-50/30">
           <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Showing 6 of 1,248 Users</span>
           <div className="flex items-center gap-2">
              <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-[11px] font-black text-gray-400 bg-white hover:bg-gray-50 transition-all disabled:opacity-50" disabled>Previous</button>
              <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-[11px] font-black text-gray-700 bg-white hover:bg-gray-50 transition-all">Next</button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;
