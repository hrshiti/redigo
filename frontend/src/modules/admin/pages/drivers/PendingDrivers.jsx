import React, { useState, useEffect } from 'react';
import { 
  Search, 
  ChevronRight, 
  Eye, 
  CheckCircle2, 
  XCircle, 
  MoreHorizontal,
  Download,
  Filter,
  ArrowLeft,
  ArrowRight,
  UserCheck,
  FileText,
  AlertCircle,
  Star,
  ChevronDown,
  Trash2,
  Plus,
  LayoutGrid,
  List,
  Edit,
  MoreVertical,
  Check
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const PendingDrivers = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(true);
  const [pendingDrivers, setPendingDrivers] = useState([]);
  const [error, setError] = useState('');
  const [activeMenu, setActiveMenu] = useState(null);

  const providedToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5YzdiZTZhYmJlOTJlYjYwMGYwMmQxNiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwibW9iaWxlIjoiOTk5OTk5OTk5OSIsInJvbGUiOiJzdXBlci1hZG1pbiIsImlhdCI6MTc3NTA0OTExNywiZXhwIjoxODA2NTg1MTE3fQ.5KJmXJwaVefWhnc97EqtArkA1z7ZOhsJwA9fbyRVPdQ';
  const storedToken = localStorage.getItem('adminToken');
  const token = (storedToken && storedToken !== 'undefined' && storedToken !== 'null') ? storedToken : providedToken;

  const handleAction = async (action, driverId) => {
    const confirmMsg = action === 'delete' ? 'Are you sure you want to delete this pending request?' : 'Are you sure you want to APPROVE this driver?';
    if (action !== 'view' && action !== 'edit' && !window.confirm(confirmMsg)) return;

    if (action === 'view') {
      navigate(`/admin/drivers/${driverId}`);
      return;
    }
    if (action === 'edit') {
      navigate(`/admin/drivers/edit/${driverId}`);
      return;
    }

    try {
      const url = action === 'delete' 
        ? `https://taxi-a276.onrender.com/api/v1/admin/drivers/${driverId}`
        : `https://taxi-a276.onrender.com/api/v1/admin/drivers/update-status/${driverId}`;
      
      const method = action === 'delete' ? 'DELETE' : 'PATCH';
      const body = action === 'approve' ? JSON.stringify({ approve: true, status: 'active', active: true }) : null;

      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body
      });

      const data = await response.json();
      if (response.ok && data.success) {
        alert(`${action.charAt(0).toUpperCase() + action.slice(1)} successful`);
        setPendingDrivers(prev => prev.filter(d => d.id !== driverId));
      } else {
        alert(data.message || `Failed to ${action}`);
      }
    } catch (err) {
      alert(`Network error during ${action}`);
    } finally {
      setActiveMenu(null);
    }
  };

  const fetchPendingDrivers = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('https://taxi-a276.onrender.com/api/v1/admin/drivers?page=1&limit=50', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      const responseData = await response.json();
      if (response.ok && responseData.success) {
        const driversList = responseData.data?.results || [];
        // Filtering for anything that is not approved (pending)
        const pending = driversList.filter(d => d.approve === false).map(d => ({
          id: d._id,
          name: d.name || d.user_id?.name || 'Unknown',
          location: d.service_location?.service_location_name || d.city || 'India',
          email: d.email || d.user_id?.email || 'N/A',
          phone: d.mobile || d.user_id?.mobile || 'N/A',
          transport: d.transport_type || 'N/A',
          docs: 'View Docs',
          status: 'DISAPPROVED', // As requested in the image (or Pending)
          reason: d.rejectionReason || '-',
          rating: d.rating || 0.0,
          registeredAt: d.createdAt ? new Date(d.createdAt).toLocaleString() : 'N/A'
        }));
        
        setPendingDrivers(pending);
      } else {
        setError(responseData.message || 'Failed to fetch pending drivers');
      }
    } catch (err) {
      setError('Network error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingDrivers();
  }, []);

  const filteredDrivers = pendingDrivers.filter(driver => 
    (driver.name && driver.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (driver.phone && driver.phone.includes(searchTerm)) ||
    (driver.location && driver.location.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-transparent p-1 font-sans text-gray-950 animate-in fade-in duration-700">
      
      {/* ── HEADER ── */}
      <div className="flex items-center justify-between mb-8 px-1">
         <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
            <h1 className="text-[15px] font-black tracking-tight text-gray-800 uppercase">Pending Drivers</h1>
         </motion.div>
         <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="flex items-center gap-2 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
            <span className="hover:text-indigo-600 transition-colors cursor-pointer">Pending Drivers</span>
            <ChevronRight size={12} className="opacity-50" />
            <span className="text-gray-950 font-black">Pending Drivers</span>
         </motion.div>
      </div>

      {/* ── CONTROLS ── */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden mb-6"
      >
        <div className="p-6 flex flex-col md:flex-row items-center justify-between gap-6">
           <div className="flex items-center gap-3">
              <button className="w-10 h-10 bg-teal-500 text-white rounded-xl flex items-center justify-center shadow-lg"><List size={18} /></button>
              <button className="w-10 h-10 bg-gray-100 text-gray-400 rounded-xl flex items-center justify-center hover:bg-indigo-50 hover:text-indigo-600 transition-all"><LayoutGrid size={18} /></button>
              <div className="flex items-center gap-2 text-[12px] font-black text-gray-400 ml-4 uppercase tracking-[0.2em]">
                 show 
                 <div className="relative">
                   <select 
                     value={itemsPerPage}
                     onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
                     className="bg-white border border-gray-100 rounded-lg px-3 py-1.5 outline-none font-black text-gray-900 shadow-sm mx-2 appearance-none pr-8 cursor-pointer"
                   >
                      <option value={10}>10</option>
                      <option value={25}>25</option>
                      <option value={50}>50</option>
                   </select>
                   <ChevronDown size={12} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-50" />
                 </div>
                 entries
              </div>
           </div>

           <div className="flex items-center gap-3">
              <button className="w-10 h-10 bg-white border border-gray-100 text-gray-400 rounded-full flex items-center justify-center hover:bg-indigo-50 hover:text-indigo-600 transition-all shadow-sm">
                 <Search size={18} />
              </button>
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl text-[12px] font-black flex items-center gap-2 transition-all shadow-lg active:scale-95 uppercase tracking-widest">
                 <Filter size={16} /> Filters
              </button>
              <button onClick={() => navigate('/admin/drivers/create')} className="bg-[#2D3A6E] hover:bg-black text-white px-6 py-2.5 rounded-xl text-[12px] font-black flex items-center gap-2 transition-all shadow-xl active:scale-95 uppercase tracking-widest">
                 <Plus size={20} strokeWidth={2.5} /> Add Fleet Drivers
              </button>
           </div>
        </div>
      </motion.div>

      {/* ── TABLE ── */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden"
      >
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-50 text-[11px] font-black text-gray-400 uppercase tracking-[0.15em]">
                <th className="px-8 py-6">Name</th>
                <th className="px-6 py-6">Service Locations</th>
                <th className="px-6 py-6">Email</th>
                <th className="px-6 py-6">Mobile Number</th>
                <th className="px-6 py-6">Transport Type</th>
                <th className="px-6 py-6 text-center">Document View</th>
                <th className="px-6 py-6 text-center">Approved Status</th>
                <th className="px-6 py-6 text-center">Declined Reason</th>
                <th className="px-6 py-6 text-center">Rating</th>
                <th className="px-8 py-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-[13px] font-bold text-gray-600">
              {isLoading ? (
                <tr>
                  <td colSpan="10" className="px-8 py-20 text-center">
                    <div className="flex flex-col items-center gap-4 py-10 opacity-40">
                       <Loader2 size={32} className="animate-spin text-indigo-950" />
                       <p className="text-[12px] font-black uppercase tracking-widest">Compiling Driver Dossiers...</p>
                    </div>
                  </td>
                </tr>
              ) : filteredDrivers.length === 0 ? (
                <tr>
                  <td colSpan="10" className="px-8 py-24 text-center">
                    <div className="flex flex-col items-center gap-4 opacity-20">
                       <XCircle size={48} strokeWidth={1.5} />
                       <p className="text-[14px] font-black uppercase tracking-widest">No Pending Applications</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredDrivers.map((driver) => (
                  <tr key={driver.id} className="hover:bg-indigo-50/30 transition-all group border-l-4 border-l-transparent hover:border-l-indigo-600">
                    <td className="px-8 py-6 text-gray-950 capitalize">{driver.name}</td>
                    <td className="px-6 py-6">{driver.location}</td>
                    <td className="px-6 py-6 font-medium lowercase overflow-hidden text-ellipsis max-w-[150px]">{driver.email}</td>
                    <td className="px-6 py-6 font-black text-gray-800">{driver.phone}</td>
                    <td className="px-6 py-6 uppercase tracking-wider">{driver.transport}</td>
                    <td className="px-6 py-6 text-center">
                       <button onClick={() => navigate(`/admin/drivers/audit/${driver.id}`)} className="w-10 h-10 m-auto bg-white border border-gray-100 text-[#2D3A6E] rounded-xl flex items-center justify-center hover:bg-indigo-950 hover:text-white transition-all shadow-sm">
                          <FileText size={18} />
                       </button>
                    </td>
                    <td className="px-6 py-6 text-center">
                       <span className="bg-rose-500 text-white px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-widest shadow-sm">
                          {driver.status}
                       </span>
                    </td>
                    <td className="px-6 py-6 text-center italic text-gray-400">{driver.reason}</td>
                    <td className="px-6 py-6 text-center">
                        <div className="flex items-center justify-center gap-0.5 text-gray-200">
                           {[1,2,3,4,5].map(i => <Star key={i} size={12} strokeWidth={2.5} />)}
                        </div>
                    </td>
                    <td className="px-8 py-6 text-right relative">
                       <button 
                        onClick={() => setActiveMenu(activeMenu === driver.id ? null : driver.id)}
                        className="w-10 h-10 ml-auto bg-[#E8F1FF] text-blue-400 rounded-lg flex items-center justify-center hover:bg-blue-100 transition-all shadow-sm shadow-blue-50"
                       >
                          <MoreVertical size={20} />
                       </button>

                       <AnimatePresence>
                         {activeMenu === driver.id && (
                           <>
                             <div className="fixed inset-0 z-10" onClick={() => setActiveMenu(null)} />
                             <motion.div 
                               initial={{ opacity: 0, scale: 0.9, y: -10 }}
                               animate={{ opacity: 1, scale: 1, y: 0 }}
                               exit={{ opacity: 0, scale: 0.9, y: -10 }}
                               className="absolute right-20 top-6 z-20 bg-white border border-gray-100 shadow-2xl rounded-2xl p-2 min-w-[160px] text-left"
                             >
                                <button onClick={() => handleAction('approve', driver.id)} className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-emerald-50 text-emerald-600 rounded-xl transition-colors text-[12px] font-black uppercase tracking-widest">
                                   <CheckCircle2 size={16} /> Approve
                                </button>
                                <button onClick={() => handleAction('edit', driver.id)} className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-amber-50 text-amber-500 rounded-xl transition-colors text-[12px] font-black uppercase tracking-widest">
                                   <Edit size={16} /> Edit
                                </button>
                                <button onClick={() => handleAction('view', driver.id)} className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-indigo-50 text-indigo-600 rounded-xl transition-colors text-[12px] font-black uppercase tracking-widest">
                                   <Eye size={16} /> View Profile
                                </button>
                                <div className="h-px bg-gray-50 my-1 mx-2" />
                                <button onClick={() => handleAction('delete', driver.id)} className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-rose-50 text-rose-500 rounded-xl transition-colors text-[12px] font-black uppercase tracking-widest">
                                   <Trash2 size={16} /> Delete
                                </button>
                             </motion.div>
                           </>
                         )}
                       </AnimatePresence>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* ── FOOTER ── */}
        <div className="p-8 flex items-center justify-between bg-gray-50/50 border-t border-gray-50">
           <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Showing 1 to {filteredDrivers.length} of {filteredDrivers.length} entries</span>
           <div className="flex items-center gap-1.5">
              <button className="px-4 py-2 text-[11px] font-black text-gray-400 uppercase tracking-widest hover:text-gray-900 transition-colors">Prev</button>
              <button className="w-10 h-10 rounded-xl bg-indigo-950 text-white text-[13px] font-black shadow-xl shadow-indigo-100">1</button>
              <button className="px-4 py-2 text-[11px] font-black text-gray-400 uppercase tracking-widest hover:text-gray-900 transition-colors">Next</button>
           </div>
        </div>
      </motion.div>

      {/* ── LOADER HELPER ── */}
      {isLoading === false && (
        <div className="mt-8 bg-[#2D3A6E] rounded-[32px] p-8 text-white flex items-center justify-between shadow-2xl relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-10 opacity-5 -rotate-12 translate-x-8 group-hover:scale-110 transition-transform duration-700">
              <UserCheck size={140} strokeWidth={1} />
           </div>
           <div className="relative z-10 max-w-xl">
              <h4 className="text-[14px] font-black uppercase tracking-[0.2em] mb-4 text-indigo-300">Operational Integrity</h4>
              <p className="text-[13px] font-bold text-gray-200 leading-relaxed italic opacity-80">
                 "Reviewing documents and approval status ensures fleet safety. Please verify all documents before granting access to live passenger requests."
              </p>
           </div>
           <CheckCircle2 size={48} className="text-emerald-400 drop-shadow-lg" />
        </div>
      )}

    </div>
  );
};

const Loader2 = ({ size, className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);

export default PendingDrivers;
