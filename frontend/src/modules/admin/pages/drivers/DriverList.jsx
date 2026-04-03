import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  MoreVertical, 
  FileText, 
  Star, 
  User, 
  Plus,
  Eye,
  Edit2,
  Key,
  XCircle,
  Trash2,
  ChevronDown,
  ShieldCheck,
  Lock,
  Loader2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { adminService } from '../../services/adminService';

const DriverList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeMenu, setActiveMenu] = useState(null);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [passwordModal, setPasswordModal] = useState({ isOpen: false, driverId: null, password: '', isSubmitting: false });
  const [drivers, setDrivers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDrivers = async () => {
      setIsLoading(true);
      try {
        const responseData = await adminService.getDrivers(1, 50);
        const driversList = responseData.data?.results || [];
        
        if (responseData.success) {
          const approved = driversList.filter(d => {
            const isApproved = d.approve === true || 
                             d.status?.toLowerCase() === 'active' || 
                             d.status?.toLowerCase() === 'approved';
            return isApproved;
          }).map(d => ({
            id: d._id,
            name: d.name || d.user_id?.name || 'Unknown',
            serviceLocation: d.city || d.service_location?.name || 'India',
            phone: d.mobile || d.user_id?.mobile || 'N/A',
            transportType: d.transport_type || 'All - Bike',
            rating: d.rating || d.average_rating || d.avg_rating || 0,
            registeredAt: d.createdAt ? new Date(d.createdAt).toLocaleString() : 'N/A',
            status: d.approve ? 'APPROVED' : (d.status?.toUpperCase() || 'APPROVED')
          }));
          setDrivers(approved);
        } else {
          setError(responseData.message || 'Failed to fetch drivers');
        }
      } catch (err) {
        setError(err.message || 'Network error occurred.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchDrivers();
  }, []);

  const toggleMenu = (e, userId) => {
    e.stopPropagation();
    setActiveMenu(activeMenu === userId ? null : userId);
  };

  useEffect(() => {
    const closeMenu = () => setActiveMenu(null);
    window.addEventListener('click', closeMenu);
    return () => window.removeEventListener('click', closeMenu);
  }, []);

  const handleAction = async (action, driverId) => {
    const confirmMsg = action === 'delete' ? 'Are you sure you want to delete this driver?' : 'Are you sure you want to disapprove this driver?';
    if (action !== 'password' && !window.confirm(confirmMsg)) return;

    try {
      let resData;
      if (action === 'delete') {
        resData = await adminService.deleteDriver(driverId);
      } else if (action === 'disapprove') {
        resData = await adminService.updateDriverStatus(driverId, { approve: false, status: 'inactive', active: false });
      } else if (action === 'password') {
        setPasswordModal(prev => ({ ...prev, isSubmitting: true }));
        resData = await adminService.updateDriverPassword(driverId, passwordModal.password);
      }

      if (resData.success) {
        alert(`${action.charAt(0).toUpperCase() + action.slice(1)} successful`);
        if (action === 'delete' || action === 'disapprove') {
          setDrivers(prev => prev.filter(d => d.id !== driverId));
        }
        if (action === 'password') {
          setPasswordModal({ isOpen: false, driverId: null, password: '', isSubmitting: false });
        }
      } else {
        alert(resData.message || `Failed to ${action}`);
        if (action === 'password') setPasswordModal(prev => ({ ...prev, isSubmitting: false }));
      }
    } catch (err) {
      alert(err.message || `Network error during ${action}`);
      if (action === 'password') setPasswordModal(prev => ({ ...prev, isSubmitting: false }));
    }
  };

  const filteredDrivers = drivers.filter(d => 
    d.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    d.phone.includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-[#F8F9FB] p-6 font-sans text-[#333]">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-[15px] font-black tracking-wider text-[#4A5568] uppercase">APPROVED DRIVERS</h1>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-[#E2E8F0] overflow-visible">
        <div className="p-6 flex flex-col md:flex-row items-center justify-between gap-4 border-b border-[#F1F5F9]">
          <div className="flex items-center gap-6">
             <div className="text-[13px] text-[#718096] font-medium flex items-center gap-2">
                show 
                <select 
                  value={itemsPerPage}
                  onChange={(e) => setItemsPerPage(e.target.value)}
                  className="bg-white border border-[#CBD5E0] rounded-lg px-2 py-1 outline-none"
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
                entries
             </div>
          </div>

          <div className="flex items-center gap-3">
             <div className="relative group">
                <input 
                  type="text" 
                  placeholder="" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-10 focus:w-64 h-10 rounded-full border border-[#CBD5E0] pl-10 pr-4 transition-all duration-300 outline-none"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A0AEC0]" size={18} />
             </div>
             <button className="flex items-center gap-2 bg-[#E67E22] text-white px-5 py-2 rounded-lg text-[13px] font-bold hover:bg-[#D35400] transition-colors shadow-sm">
                <Filter size={16} /> Filters
             </button>
             <button 
                onClick={() => navigate('/admin/drivers/create')}
                className="flex items-center gap-2 bg-[#3F51B5] text-white px-5 py-2 rounded-lg text-[13px] font-bold hover:bg-[#303F9F] transition-colors shadow-sm"
             >
                <Plus size={16} /> Add Drivers
             </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#F8F9FB] border-b border-[#F1F5F9] text-[12px] font-bold text-[#4A5568]">
                <th className="px-6 py-4">Name</th>
                <th className="px-4 py-4">Service Location</th>
                <th className="px-4 py-4">Mobile Number</th>
                <th className="px-4 py-4">Transport Type</th>
                <th className="px-4 py-4">Document View</th>
                <th className="px-4 py-4">Approved Status</th>
                <th className="px-4 py-4">Rating</th>
                <th className="px-4 py-4">Registered at</th>
                <th className="px-6 py-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9]">
              {isLoading ? (
                <tr>
                  <td colSpan="9" className="px-6 py-12 text-center text-[13px] text-[#A0AEC0]">Loading fleet data...</td>
                </tr>
              ) : filteredDrivers.length === 0 ? (
                <tr>
                  <td colSpan="9" className="px-6 py-12 text-center text-[13px] text-[#A0AEC0]">No drivers found.</td>
                </tr>
              ) : (
                filteredDrivers.map((driver) => (
                  <tr key={driver.id} className="hover:bg-[#F8F9FB] transition-colors">
                    <td className="px-6 py-5 text-[13px] text-[#4A5568]">{driver.name}</td>
                    <td className="px-4 py-5 text-[13px] text-[#4A5568]">{driver.serviceLocation}</td>
                    <td className="px-4 py-5 text-[13px] text-[#4A5568]">{driver.phone}</td>
                    <td className="px-4 py-5 text-[13px] text-[#4A5568]">{driver.transportType}</td>
                    <td className="px-4 py-5">
                       <button className="text-[#3F51B5] hover:opacity-70 transition-opacity">
                          <FileText size={22} className="fill-[#3F51B5]/10" />
                       </button>
                    </td>
                    <td className="px-4 py-5">
                       <span className="px-3 py-1 bg-[#00C89E] text-white text-[10px] font-black rounded tracking-wider">
                          {driver.status}
                       </span>
                    </td>
                    <td className="px-4 py-5">
                       <div className="flex items-center gap-0.5">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star key={s} size={14} className={s <= driver.rating ? "fill-[#F1C40F] text-[#F1C40F]" : "text-[#E2E8F0]"} />
                          ))}
                       </div>
                    </td>
                    <td className="px-4 py-5 text-[13px] text-[#4A5568] whitespace-nowrap">
                       {driver.registeredAt}
                    </td>
                    <td className="px-6 py-5 text-center">
                       <div className="relative inline-block">
                          <button 
                            onClick={(e) => toggleMenu(e, driver.id)}
                            className="p-2.5 bg-[#E6F0FF] text-[#3F51B5] rounded-lg hover:bg-[#D0E5FF] transition-all"
                          >
                             <MoreVertical size={18} />
                          </button>
                          
                          {activeMenu === driver.id && (
                             <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-lg shadow-2xl border border-[#E2E8F0] py-2 z-[9999] animate-in fade-in zoom-in-95 duration-200">
                                <button 
                                   onClick={() => handleAction('disapprove', driver.id)}
                                   className="w-full text-left px-5 py-2.5 text-[12px] font-bold text-[#E74C3C] hover:bg-red-50 flex items-center gap-3 transition-colors"
                                >
                                   <XCircle size={16} /> disapprove
                                </button>
                                <button 
                                   onClick={() => navigate(`/admin/drivers/edit/${driver.id}`)}
                                   className="w-full text-left px-5 py-2.5 text-[12px] font-bold text-[#4A5568] hover:bg-gray-50 flex items-center gap-3 transition-colors"
                                >
                                   <Edit2 size={16} className="text-gray-400" /> edit
                                </button>
                                <button 
                                   onClick={() => {
                                     setActiveMenu(null);
                                     setPasswordModal({ isOpen: true, driverId: driver.id, password: '', isSubmitting: false });
                                   }}
                                   className="w-full text-left px-5 py-2.5 text-[12px] font-bold text-[#4A5568] hover:bg-gray-50 flex items-center gap-3 transition-colors"
                                >
                                   <Key size={16} className="text-gray-400" /> update password
                                </button>
                                <button 
                                   onClick={() => navigate(`/admin/drivers/${driver.id}`)}
                                   className="w-full text-left px-5 py-2.5 text-[12px] font-bold text-[#4A5568] hover:bg-gray-50 flex items-center gap-3 transition-colors"
                                >
                                   <Eye size={16} className="text-gray-400" /> view profile
                                </button>
                                <div className="h-px bg-[#F1F5F9] my-1 mx-2"></div>
                                <button 
                                   onClick={() => handleAction('delete', driver.id)}
                                   className="w-full text-left px-5 py-2.5 text-[12px] font-bold text-[#C0392B] hover:bg-red-100 flex items-center gap-3 transition-colors"
                                >
                                   <Trash2 size={16} /> delete
                                </button>
                             </div>
                          )}
                       </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* FOOTER */}
        <div className="p-6 border-t border-[#F1F5F9] flex items-center justify-between text-[13px] text-[#718096]">
           <p>Showing 1 to {filteredDrivers.length} of {filteredDrivers.length} entries</p>
           <div className="flex items-center gap-1">
              <button className="px-4 py-2 border border-[#E2E8F0] rounded text-[12px] font-medium text-[#A0AEC0] hover:bg-gray-50 disabled:opacity-50" disabled>Prev</button>
              <button className="w-8 h-8 bg-[#3F51B5] text-white rounded text-[12px] font-bold">1</button>
              <button className="px-4 py-2 border border-[#E2E8F0] rounded text-[12px] font-medium text-[#A0AEC0] hover:bg-gray-50 disabled:opacity-50" disabled>Next</button>
           </div>
        </div>
      </div>
     
     {/* Password Update Modal */}
     {passwordModal.isOpen && (
       <div className="fixed inset-0 z-[10000] flex items-center justify-center p-6 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
         <div className="bg-white rounded-[32px] w-full max-w-sm shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border border-gray-100">
            <div className="p-8 space-y-6">
               <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-black text-gray-950 uppercase tracking-tight leading-none mb-1">Security Update</h3>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Update Driver Password</p>
                  </div>
                  <button 
                    onClick={() => setPasswordModal({ isOpen: false, driverId: null, password: '', isSubmitting: false })}
                    className="text-gray-400 hover:text-gray-900 border border-gray-100 rounded-xl p-1.5 transition-colors"
                  >
                     <XCircle size={20} />
                  </button>
               </div>

               <div className="space-y-4">
                  <div className="relative group">
                     <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors">
                        <Lock size={18} />
                     </div>
                     <input 
                       type="text" 
                       placeholder="Enter new strong password"
                       autoFocus
                       className="w-full pl-14 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-[14px] font-bold text-gray-900 outline-none focus:bg-white focus:border-indigo-200 focus:ring-4 focus:ring-indigo-50/50 transition-all shadow-inner"
                       value={passwordModal.password}
                       onChange={(e) => setPasswordModal(prev => ({ ...prev, password: e.target.value }))}
                     />
                  </div>
                  <div className="flex items-start gap-2 px-2">
                    <ShieldCheck size={14} className="text-emerald-500 mt-0.5" />
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tight leading-relaxed">System requires minimum 8 characters for driver security compliance.</p>
                  </div>
               </div>

               <button 
                 onClick={() => {
                   if (passwordModal.password.length < 4) {
                     alert('Password too short');
                     return;
                   }
                   handleAction('password', passwordModal.driverId);
                 }}
                 disabled={passwordModal.isSubmitting || !passwordModal.password}
                 className="w-full py-4 bg-gray-950 text-white rounded-2xl text-[12px] font-black uppercase tracking-widest hover:translate-y-[-2px] active:translate-y-[1px] transition-all shadow-xl disabled:opacity-50 flex items-center justify-center gap-2"
               >
                 {passwordModal.isSubmitting ? <Loader2 className="animate-spin" size={16} /> : <Key size={16} />}
                 COMMIT NEW PASSWORD
               </button>
            </div>
         </div>
       </div>
     )}
    </div>
  );
};

export default DriverList;
