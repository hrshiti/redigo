import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronRight,
  Upload,
  Plus,
  Trash2,
  Edit2,
  Image as ImageIcon,
  Loader2,
  Search,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";
import { adminService } from '../../services/adminService';

const StatusToggle = ({ active, onToggle, disabled }) => (
  <button
    onClick={onToggle}
    disabled={disabled}
    className={`w-10 h-5 rounded-full transition-all duration-300 relative ${active ? 'bg-indigo-600' : 'bg-gray-300'} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
  >
    <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all duration-300 ${active ? 'left-6' : 'left-1'}`} />
  </button>
);

const Preferences = () => {
  const [preferences, setPreferences] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({ name: '', icon: null });
  const [iconPreview, setIconPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  const fetchPreferences = async () => {
    try {
      setIsLoading(true);
      const response = await adminService.getPreferences();
      // Backend returns data in paginator.data or results
      const preferencesData = response?.paginator?.data || response?.results || (Array.isArray(response) ? response : []);
      setPreferences(preferencesData);
    } catch (err) {
      console.error('Fetch Preferences Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPreferences();
  }, []);

  const handleIconChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, icon: file }));
      const reader = new FileReader();
      reader.onloadend = () => setIconPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleCreate = async () => {
    if (!formData.name) return alert('Please enter preference name');
    
    try {
      setIsSubmitting(true);
      const data = new FormData();
      data.append('name', formData.name);
      if (formData.icon) data.append('icon', formData.icon);
      
      await adminService.createPreference(data);
      setFormData({ name: '', icon: null });
      setIconPreview(null);
      fetchPreferences();
    } catch (err) {
      console.error('Create Preference Error:', err);
      alert(err.message || 'Failed to create preference');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      await adminService.updatePreferenceStatus(id, { active: currentStatus ? 0 : 1 });
      fetchPreferences();
    } catch (err) {
      console.error('Toggle Error:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this preference?')) {
      try {
        await adminService.deletePreference(id);
        fetchPreferences();
      } catch (err) {
        console.error('Delete Error:', err);
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
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-6 mb-8">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Preferences</h1>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest font-['Inter']">
              <span>Preferences</span>
              <ChevronRight size={14} />
              <span className="text-indigo-600 font-black">Preferences</span>
            </div>
          </div>
        </div>

        {/* Create Form */}
        <div className="bg-white rounded-[32px] border border-slate-100 shadow-2xl shadow-slate-200 overflow-hidden mb-10">
          <div className="p-10 lg:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 items-end">
              {/* Name Input */}
              <div className="space-y-3">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest block">Name <span className="text-rose-500">*</span></label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter Name (e.g. Pet, Luggage)"
                  className="w-full bg-slate-50 border-slate-200 border rounded-2xl py-4 px-5 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all outline-none placeholder:text-slate-300"
                />
              </div>

              {/* Icon Upload */}
              <div className="space-y-3">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest block">Icon</label>
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="w-24 h-24 border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center gap-1 group cursor-pointer hover:border-indigo-600/50 hover:bg-slate-50 transition-all relative overflow-hidden bg-white/20"
                >
                  {iconPreview ? (
                    <img src={iconPreview} className="w-full h-full object-cover" alt="Preview" />
                  ) : (
                    <>
                      <Upload size={20} className="text-slate-400 group-hover:text-indigo-600 transition-colors" />
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-tight group-hover:text-indigo-600">Upload</span>
                    </>
                  )}
                  <input type="file" ref={fileInputRef} onChange={handleIconChange} className="hidden" accept="image/*" />
                </div>
              </div>

              <div className="flex justify-end">
                <button 
                  onClick={handleCreate}
                  disabled={isSubmitting}
                  className="bg-emerald-500 text-white px-10 py-4 rounded-2xl font-black text-sm hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-100/50 active:scale-95 uppercase tracking-widest flex items-center gap-2 disabled:opacity-50 disabled:active:scale-100"
                >
                  {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : 'Create'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* List Table */}
        <div className="bg-white rounded-[32px] border border-slate-100 shadow-xl shadow-slate-100/50 overflow-hidden">
          <div className="overflow-x-auto min-h-[400px]">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center p-40 gap-4">
                 <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
                 <p className="text-sm font-black text-slate-400 tracking-widest uppercase">Syncing Preferences...</p>
              </div>
            ) : (
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100">
                    <th className="px-8 py-5 text-left text-[11px] font-black text-slate-400 uppercase tracking-widest">S.NO</th>
                    <th className="px-8 py-5 text-left text-[11px] font-black text-slate-400 uppercase tracking-widest">Name</th>
                    <th className="px-8 py-5 text-left text-[11px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                    <th className="px-8 py-5 text-left text-[11px] font-black text-slate-400 uppercase tracking-widest">Icon</th>
                    <th className="px-8 py-5 text-right text-[11px] font-black text-slate-400 uppercase tracking-widest">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {preferences.length > 0 ? (
                    preferences.map((pref, idx) => (
                      <tr key={pref._id || pref.id || idx} className="hover:bg-slate-50/50 transition-colors group">
                        <td className="px-8 py-6"><span className="text-sm font-bold text-slate-900">{idx + 1}</span></td>
                        <td className="px-8 py-6"><span className="text-sm font-bold text-slate-900">{pref.name}</span></td>
                        <td className="px-8 py-6">
                           <StatusToggle 
                             active={pref.active === 1 || pref.active === true} 
                             onToggle={() => handleToggleStatus(pref._id || pref.id, (pref.active === 1 || pref.active === true))} 
                           />
                        </td>
                        <td className="px-8 py-6">
                           <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-200 shadow-sm transition-transform group-hover:scale-110">
                              {pref.icon ? (
                                <img src={pref.icon} className="w-full h-full object-cover" alt={pref.name} />
                              ) : (
                                <ImageIcon size={18} className="text-slate-400" />
                              )}
                           </div>
                        </td>
                        <td className="px-8 py-6 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button className="p-2.5 bg-amber-50 text-amber-600 rounded-xl hover:bg-amber-100 transition-all active:scale-90 shadow-sm"><Edit2 size={16} /></button>
                            <button 
                              onClick={() => handleDelete(pref._id || pref.id)}
                              className="p-2.5 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-100 transition-all active:scale-90 shadow-sm"
                            ><Trash2 size={16} /></button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="px-8 py-20 text-center">
                        <div className="flex flex-col items-center opacity-40">
                           <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mb-6">
                              <Plus size={32} className="text-slate-300" />
                           </div>
                           <p className="text-slate-400 font-black uppercase tracking-widest text-xs">No preferences found in database</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
          
          {!isLoading && preferences.length > 0 && (
            <div className="flex items-center justify-center gap-1 p-6 border-t border-slate-100 opacity-60">
              <button className="w-8 h-8 rounded-lg border border-slate-200 text-slate-400 flex items-center justify-center text-xs hover:bg-slate-50 transition-all">&laquo;</button>
              <button className="w-8 h-8 rounded-lg border border-slate-200 text-slate-400 flex items-center justify-center text-xs hover:bg-slate-50 transition-all font-black">1</button>
              <button className="w-8 h-8 rounded-lg border border-slate-200 text-slate-400 flex items-center justify-center text-xs hover:bg-slate-50 transition-all">&raquo;</button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Preferences;
