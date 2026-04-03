import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Globe, 
  Trash2, 
  ChevronRight,
  Languages as LangIcon,
  ChevronLeft,
  Loader2
} from 'lucide-react';
import { motion } from "framer-motion";
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

const Languages = () => {
  const [languages, setLanguages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLanguages = async () => {
    try {
      setIsLoading(true);
      const response = await adminService.getLanguages();
      // Backend returns data in paginator.data or results
      const languagesData = response?.paginator?.data || response?.results || (Array.isArray(response) ? response : []);
      setLanguages(languagesData);
      setError(null);
    } catch (err) {
      console.error('Fetch Languages Error:', err);
      setError('Failed to fetch languages');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLanguages();
  }, []);

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      await adminService.updateLanguageStatus(id, { active: currentStatus ? 0 : 1 });
      fetchLanguages(); // Refresh list
    } catch (err) {
      console.error('Toggle Status Error:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this language?')) {
      try {
        await adminService.deleteLanguage(id);
        fetchLanguages();
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
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight uppercase">Languages</h1>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">
              <span>Languages</span>
              <ChevronRight size={14} />
              <span className="text-indigo-600 font-black">Languages</span>
            </div>
          </div>
          <button className="bg-[#0F172A] text-white px-6 py-3.5 rounded-2xl font-black text-sm hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 flex items-center gap-2 active:scale-95 uppercase tracking-widest">
            <Plus size={18} /> Add New Languages
          </button>
        </div>

        {/* Content Table */}
        <div className="bg-white rounded-[32px] border border-slate-100 shadow-xl shadow-slate-100/50 overflow-hidden">
          <div className="p-6 border-b border-slate-50 flex flex-wrap items-center justify-between gap-4 bg-slate-50/30">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-4 py-2 shadow-sm">
                <span className="text-[12px] font-bold text-slate-500">show</span>
                <select className="bg-transparent border-none text-[12px] font-black text-slate-900 focus:ring-0">
                  <option>10</option>
                </select>
                <span className="text-[12px] font-bold text-slate-500">entries</span>
              </div>
            </div>
            <div className="relative group">
               <div className="flex items-center pl-3 pointer-events-none absolute inset-y-0 left-0">
                  <Search size={16} className="text-slate-400" />
               </div>
               <input 
                 type="text" 
                 placeholder="Search languages..."
                 className="bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all w-64"
               />
            </div>
          </div>

          <div className="overflow-x-auto min-h-[300px]">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center p-20 gap-4">
                 <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
                 <p className="text-sm font-black text-slate-400 tracking-widest uppercase">Fetching Languages...</p>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center p-20 text-rose-500 bg-rose-50/50 m-6 rounded-[24px]">
                 <span className="text-sm font-black uppercase tracking-widest">{error}</span>
                 <button onClick={fetchLanguages} className="mt-4 text-xs font-black underline uppercase tracking-widest">Retry</button>
              </div>
            ) : (
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100">
                    <th className="px-8 py-5 text-left text-[11px] font-black text-slate-400 uppercase tracking-widest">Name</th>
                    <th className="px-8 py-5 text-left text-[11px] font-black text-slate-400 uppercase tracking-widest">Default</th>
                    <th className="px-8 py-5 text-left text-[11px] font-black text-slate-400 uppercase tracking-widest">Code</th>
                    <th className="px-8 py-5 text-left text-[11px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                    <th className="px-8 py-5 text-center text-[11px] font-black text-slate-400 uppercase tracking-widest">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {languages.length > 0 ? languages.map((lang, idx) => (
                    <tr key={lang._id || lang.id || idx} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-8 py-6">
                        <span className="text-sm font-bold text-slate-900">{lang.name}</span>
                      </td>
                      <td className="px-8 py-6">
                        {lang.default_status === 1 || lang.isDefault ? (
                          <span className="bg-[#0F172A] text-white px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider">Default</span>
                        ) : (
                          <button className="border border-slate-200 text-slate-500 px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider hover:bg-slate-50">Set as Default</button>
                        )}
                      </td>
                      <td className="px-8 py-6">
                        <span className="text-sm font-bold text-slate-500">{lang.code}</span>
                      </td>
                      <td className="px-8 py-6">
                        <StatusToggle 
                          active={lang.active === 1 || lang.status} 
                          onToggle={() => handleToggleStatus(lang._id || lang.id, (lang.active === 1 || lang.status))} 
                        />
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center justify-center gap-2">
                          <button className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-100 transition-all active:scale-90 shadow-sm"><Globe size={16} /></button>
                          {!(lang.default_status === 1 || lang.isDefault) && (
                            <button 
                              onClick={() => handleDelete(lang._id || lang.id)}
                              className="p-2.5 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-100 transition-all active:scale-90 shadow-sm"
                            ><Trash2 size={16} /></button>
                          )}
                        </div>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="5" className="px-8 py-20 text-center text-slate-400 font-bold uppercase tracking-widest text-xs italic">
                         No languages found in the database.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>

          {!isLoading && languages.length > 0 && (
            <div className="px-8 py-4 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Showing 1 to {languages.length} of {languages.length} entries</p>
              <div className="flex items-center gap-1">
                <button className="px-3 py-1.5 text-[11px] font-bold text-slate-400 hover:text-slate-600 uppercase tracking-widest">Prev</button>
                <button className="w-8 h-8 rounded-lg bg-[#0F172A] text-white text-[11px] font-bold">1</button>
                <button className="px-3 py-1.5 text-[11px] font-bold text-slate-400 hover:text-slate-600 uppercase tracking-widest">Next</button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Languages;
