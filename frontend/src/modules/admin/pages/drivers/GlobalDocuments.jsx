import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  ChevronRight, 
  ShieldCheck, 
  Download, 
  Filter, 
  MoreHorizontal, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Eye, 
  FolderLock, 
  Files, 
  Clock, 
  ArrowRight,
  TrendingDown,
  BadgeCheck,
  LayoutGrid,
  FileCheck2
} from 'lucide-react';

const GlobalDocuments = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const [docStats] = useState({
    verified: 14248,
    pending: 1358,
    expired: 42,
    rejected: 890
  });

  const [documents] = useState([
    { id: 'DOC-101', driver: 'Rajesh K.', type: 'Driving License', expiry: 'Jan 2032', status: 'Verified', uploaded: 'Mar 28, 2024' },
    { id: 'DOC-102', driver: 'Suresh S.', type: 'Vehicle RC', expiry: 'Feb 2028', status: 'Verified', uploaded: 'Mar 28, 2024' },
    { id: 'DOC-103', driver: 'Vijay P.', type: 'Insurance', expiry: 'May 2024', status: 'Expiring Soon', uploaded: 'Mar 29, 2024' },
    { id: 'DOC-104', driver: 'Anil D.', type: 'Fitness Cert.', expiry: 'Invalid', status: 'Rejected', uploaded: 'Mar 30, 2024' },
    { id: 'DOC-105', driver: 'Pankaj S.', type: 'Aadhar Card', expiry: 'N/A', status: 'Verified', uploaded: 'Mar 31, 2024' },
  ]);

  return (
    <div className="space-y-10 p-1 animate-in fade-in duration-700 font-sans text-gray-950">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
         <div>
            <h1 className="text-4xl font-black tracking-tight text-gray-900 mb-2 leading-none">Global Document Vault</h1>
            <div className="flex items-center gap-2 text-[13px] font-bold text-gray-400">
               <span className="text-gray-950">Systems Management</span>
               <ChevronRight size={14} />
               <span>Document Compliance</span>
            </div>
         </div>
         <div className="flex items-center gap-3">
            <button className="bg-white border border-gray-100 text-gray-950 px-5 py-2.5 rounded-xl text-[12px] font-black flex items-center gap-2 hover:bg-gray-50 transition-all shadow-sm">
               <Files size={16} className="text-gray-400" /> Export All
            </button>
            <button className="bg-emerald-600 text-white px-5 py-2.5 rounded-xl text-[12px] font-black flex items-center gap-2 hover:opacity-90 transition-all shadow-xl">
               <FileCheck2 size={16} /> Bulk Re-Verify
            </button>
         </div>
      </div>

      {/* DASHBOARD STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
         <div className="bg-white p-8 rounded-[40px] border border-gray-50 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-5 scale-[2.5] -rotate-12 translate-x-4"><ShieldCheck size={80} strokeWidth={1} /></div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6 relative z-10">Compliance Rate</p>
            <div className="relative z-10">
               <p className="text-5xl font-black text-gray-950 tracking-tighter leading-none mb-2">94%</p>
               <p className="text-[11px] font-black text-emerald-500 uppercase flex items-center gap-1.5 leading-none mt-4 uppercase">
                  Optimal Condition
               </p>
            </div>
         </div>

         <div className="bg-white p-8 rounded-[40px] border border-gray-50 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-5 scale-[2] -rotate-12 translate-x-4"><Clock size={80} strokeWidth={1} /></div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6 relative z-10">Awaiting OCR Audit</p>
            <div className="relative z-10">
               <p className="text-3xl font-black text-gray-950 tracking-tight leading-none mb-2">{docStats.pending}</p>
               <p className="text-[11px] font-bold text-amber-500 uppercase flex items-center gap-1.5 leading-none mt-4">
                  Manual Review Queue
               </p>
            </div>
         </div>

         <div className="bg-white p-8 rounded-[40px] border border-rose-50 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-10 text-rose-500 scale-[2.5] -rotate-12 translate-x-4"><AlertTriangle size={80} strokeWidth={1} /></div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6 relative z-10">Expired Certs</p>
            <div className="relative z-10">
               <p className="text-3xl font-black text-rose-500 tracking-tight leading-none mb-2">{docStats.expired}</p>
               <p className="text-[11px] font-bold text-rose-600 uppercase flex items-center gap-1.5 leading-none mt-4">
                  CRITICAL ALERTS
               </p>
            </div>
         </div>

         <div className="bg-gray-950 p-8 rounded-[40px] text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-20 scale-[2.5] -rotate-12 translate-x-4"><FolderLock size={80} strokeWidth={1} /></div>
            <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-6 relative z-10">Storage Pool</p>
            <div className="relative z-10 mb-8">
               <p className="text-3xl font-black tracking-tighter leading-none mb-2">42.4 GB</p>
               <p className="text-[11px] font-black text-emerald-400 flex items-center gap-1.5 leading-none mt-4 uppercase">
                  Encrypted Vault
               </p>
            </div>
         </div>
      </div>

      {/* SEARCH/FILTER TOOLS */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
         <h2 className="text-2xl font-black tracking-tight text-gray-900 leading-none">Audit History</h2>
         <div className="flex flex-wrap items-center gap-3">
            <div className="px-5 py-2.5 bg-black text-white text-[12px] font-black rounded-xl">All Types</div>
            <div className="px-5 py-2.5 bg-white text-gray-500 text-[12px] font-black rounded-xl border border-gray-100 hover:bg-gray-50 transition-all flex items-center gap-2 cursor-pointer shadow-sm">
               Rejected Only
            </div>
            <div className="relative w-64 md:w-80">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
               <input type="text" placeholder="Search ID, Name or Doc Type..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-11 pr-4 py-3 bg-white border border-gray-100 rounded-xl text-[12px] font-bold focus:ring-2 focus:ring-gray-100 outline-none transition-all shadow-sm" />
            </div>
         </div>
      </div>

      {/* DOC TABLE */}
      <div className="bg-white rounded-[40px] border border-gray-50 shadow-sm overflow-hidden">
         <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-left">
               <thead>
                  <tr className="border-b border-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] bg-gray-50/20">
                     <th className="px-8 py-6">Operator Name</th>
                     <th className="px-6 py-6">Document Type</th>
                     <th className="px-6 py-6 text-center">Expiry Period</th>
                     <th className="px-6 py-6 text-center">Outcome</th>
                     <th className="px-6 py-6">Uploaded AT</th>
                     <th className="px-8 py-6 text-right w-10"></th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-50">
                  {documents.map((doc, i) => (
                     <tr key={i} className="hover:bg-gray-50/10 transition-all cursor-pointer group">
                        <td className="px-8 py-6">
                           <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-xl bg-gray-100 border border-gray-200 text-gray-950 font-black text-[12px] flex items-center justify-center uppercase shadow-inner group-hover:scale-105 transition-transform">
                                 {doc.driver.split(' ').map(n => n[0]).join('')}
                              </div>
                              <p className="text-[13px] font-bold text-gray-950 tracking-tight leading-none mb-1.5 focus:outline-none">{doc.driver}</p>
                           </div>
                        </td>
                        <td className="px-6 py-6">
                           <div className="flex items-center gap-2">
                              <FileText size={16} className="text-gray-300" />
                              <span className="text-[13px] font-black text-gray-800">{doc.type}</span>
                           </div>
                        </td>
                        <td className="px-6 py-6 text-center">
                           <p className={`text-[12px] font-black ${doc.status === 'Expiring Soon' ? 'text-amber-500' : 'text-gray-950'}`}>{doc.expiry}</p>
                        </td>
                        <td className="px-6 py-6 text-center">
                           <span className={`px-2 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-widest border ${doc.status === 'Verified' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : doc.status === 'Expiring Soon' ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-rose-50 text-rose-600 border-rose-100'}`}>
                              {doc.status}
                           </span>
                        </td>
                        <td className="px-6 py-6">
                           <div className="flex items-center gap-2 text-[12px] font-bold text-gray-500">
                              <Clock size={14} /> {doc.uploaded}
                           </div>
                        </td>
                        <td className="px-8 py-6 text-right">
                           <div className="flex items-center justify-end gap-2">
                              <button className="p-2.5 text-gray-400 hover:text-emerald-500 hover:bg-emerald-50 rounded-xl transition-all shadow-sm border border-transparent hover:border-emerald-100 active:scale-95"><Eye size={18} /></button>
                              <button className="p-2.5 text-gray-400 hover:text-gray-950 hover:bg-white rounded-xl transition-all shadow-sm border border-transparent hover:border-gray-50"><MoreHorizontal size={18} /></button>
                           </div>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>

      {/* FOOTER AUDIT NOTE */}
      <div className="p-8 bg-gray-50/50 rounded-[40px] border border-gray-100 flex items-start gap-5">
         <div className="w-12 h-12 rounded-2xl bg-white text-gray-950 flex items-center justify-center border border-gray-200 shrink-0 shadow-sm transition-all animate-pulse"><BadgeCheck size={26} /></div>
         <div>
            <h4 className="text-[14px] font-black text-gray-950 uppercase tracking-widest mb-1.5 focus:outline-none">Security & Privacy Lock</h4>
            <p className="text-[12px] font-bold text-gray-400 leading-relaxed max-w-4xl">All documents are stored in an AES-256 encrypted vault. Personnel accessing the vault for manual re-verification are logged. Masked identifiers are used for data transmission between client and administrative nodes.</p>
         </div>
      </div>
    </div>
  );
};

export default GlobalDocuments;
