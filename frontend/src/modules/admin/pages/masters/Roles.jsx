import React, { useState, useEffect } from 'react';
import { 
  ChevronRight,
  Shield,
  Edit2,
  Trash2,
  Search,
  UserCheck,
  Loader2,
  Plus
} from 'lucide-react';
import { motion } from "framer-motion";
import { adminService } from '../../services/adminService';

const Roles = () => {
  const [roles, setRoles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({ name: '', description: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchRoles = async () => {
    try {
      setIsLoading(true);
      const response = await adminService.getRoles();
      // Backend returns: { success, data: { results: [...], paginator: {...} } }
      const rolesData = response?.data?.results || response?.results || response?.paginator?.data || (Array.isArray(response) ? response : []);
      setRoles(rolesData);
    } catch (err) {
      console.error('Fetch Roles Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const handleCreateRole = async (e) => {
    e.preventDefault();
    if (!formData.name) return alert('Role name is required');
    
    try {
      setIsSubmitting(true);
      await adminService.createRole(formData);
      setFormData({ name: '', description: '' });
      fetchRoles();
    } catch (err) {
      console.error('Create Role Error:', err);
      alert(err.message || 'Failed to create role');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this role?')) {
      try {
        await adminService.deleteRole(id);
        fetchRoles();
      } catch (err) {
        console.error('Delete Role Error:', err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 lg:p-8 font-['Inter']">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Header Area */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-6 mb-8">
           <div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight uppercase tracking-widest">Roles</h1>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest font-['Inter']">
                 <span>Roles</span>
                 <ChevronRight size={14} />
                 <span className="text-indigo-600 font-black italic">Roles</span>
              </div>
           </div>
        </div>

        {/* Roles Creation Form */}
        <div className="bg-white rounded-[40px] border border-slate-100 shadow-2xl shadow-slate-200 overflow-hidden mb-12 transform hover:scale-[1.01] transition-transform duration-500">
           <form onSubmit={handleCreateRole} className="p-10 lg:p-14 space-y-10 group">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                 {/* Role name */}
                 <div className="space-y-3 relative">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest block pl-2">Role Name <span className="text-rose-500 font-bold">*</span></label>
                    <input 
                      type="text" 
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Enter Role Name (e.g. Manager)"
                      className="w-full bg-slate-50 border-slate-200 border rounded-2xl py-4.5 px-6 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 transition-all outline-none placeholder:text-slate-300 shadow-inner"
                    />
                 </div>
                 
                 {/* Description */}
                 <div className="space-y-3 relative">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest block pl-2">Description</label>
                    <input 
                      type="text" 
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Enter Description"
                      className="w-full bg-slate-50 border-slate-200 border rounded-2xl py-4.5 px-6 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 transition-all outline-none placeholder:text-slate-300 shadow-inner"
                    />
                 </div>
              </div>

              <div className="pt-4 border-t border-slate-50 flex justify-end">
                  <button 
                    disabled={isSubmitting}
                    className="bg-[#10B981] text-white px-12 py-3.5 rounded-xl font-black text-sm hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-100 active:scale-95 uppercase tracking-widest flex items-center gap-2"
                  >
                    {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : 'Create'}
                  </button>
              </div>
           </form>
        </div>

        {/* List Card Area */}
        <div className="bg-white rounded-[40px] border border-slate-100 shadow-xl shadow-slate-100/50 overflow-hidden border border-slate-200/50">
           {/* Section Filter with padding-top check */}
           <div className="p-8 border-b border-slate-50 flex items-center justify-between gap-6 bg-slate-50/20">
              <div className="relative flex-1 max-w-md group/search">
                 <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/search:text-indigo-600 transition-colors">
                    <Search size={18} />
                 </div>
                 <input 
                   type="text" 
                   placeholder="Search slug or name..." 
                   className="w-full bg-white border border-slate-200 rounded-2xl py-3.5 pl-14 pr-6 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-indigo-600/20 outline-none transition-all placeholder:text-slate-300 hover:border-slate-300"
                 />
              </div>
           </div>

           <div className="overflow-x-auto min-h-[400px]">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center p-40 gap-4">
                   <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
                   <p className="text-sm font-black text-slate-400 tracking-widest uppercase">Fetching Roles...</p>
                </div>
              ) : (
                <table className="w-full border-collapse">
                   <thead>
                      <tr className="bg-slate-50/50 border-b border-slate-100">
                         <th className="px-10 py-6 text-left text-[11px] font-black text-slate-400 uppercase tracking-widest">S.NO</th>
                         <th className="px-10 py-6 text-left text-[11px] font-black text-slate-400 uppercase tracking-widest">Name</th>
                         <th className="px-10 py-6 text-left text-[11px] font-black text-slate-400 uppercase tracking-widest">Description</th>
                         <th className="px-10 py-6 text-right text-[11px] font-black text-slate-400 uppercase tracking-widest pr-14">Action</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-50">
                      {roles.length > 0 ? roles.map((role, idx) => (
                        <tr key={role._id || role.id || idx} className="hover:bg-slate-50/50 transition-all group">
                           <td className="px-10 py-7 text-sm font-bold text-slate-900/60 leading-tight">{idx + 1}</td>
                           <td className="px-10 py-7">
                              <span className="text-[14px] font-black text-slate-900 tracking-tight">{role.name}</span>
                              {role.slug && <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">{role.slug}</span>}
                           </td>
                           <td className="px-10 py-7">
                              <p className="text-[13px] font-bold text-slate-500 max-w-xs">{role.description || 'No description provided'}</p>
                           </td>
                           <td className="px-10 py-7 pr-14">
                              <div className="flex items-center justify-end gap-2.5">
                                 <button className="p-3 bg-teal-50 text-teal-600 rounded-xl hover:bg-teal-100 transition-all active:scale-90 shadow-sm" title="Permissions"><UserCheck size={16} /></button>
                                 <button className="p-3 bg-amber-50 text-amber-600 rounded-xl hover:bg-amber-100 transition-all active:scale-90 shadow-sm"><Edit2 size={16} /></button>
                                 <button 
                                   onClick={() => handleDelete(role._id || role.id)}
                                   className="p-3 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-100 transition-all active:scale-90 shadow-sm"
                                  ><Trash2 size={16} /></button>
                              </div>
                           </td>
                        </tr>
                      )) : (
                        <tr>
                          <td colSpan="4" className="px-10 py-20 text-center">
                             <div className="flex flex-col items-center opacity-40">
                                <Shield size={40} className="text-slate-300 mb-4" />
                                <p className="text-slate-400 font-black uppercase tracking-widest text-xs">No administrative roles found</p>
                             </div>
                          </td>
                        </tr>
                      )}
                   </tbody>
                </table>
              )}
           </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Roles;
