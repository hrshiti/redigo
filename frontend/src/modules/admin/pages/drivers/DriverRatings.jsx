import React, { useState } from 'react';
import { 
  Star, 
  Search, 
  ChevronRight, 
  MessageSquare, 
  Filter, 
  MoreHorizontal, 
  Download, 
  User, 
  ThumbsUp, 
  ThumbsDown, 
  TrendingUp, 
  TrendingDown, 
  ArrowUpRight, 
  ArrowDownRight,
  ShieldAlert,
  Car
} from 'lucide-react';

const DriverRatings = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const [ratingStats] = useState({
    avgRating: 4.8,
    totalReviews: 12450,
    positiveRate: 94,
    negativeTrend: -2
  });

  const [reviews] = useState([
    { id: 'RV101', driver: 'Rahul Sharma', passenger: 'Amit G.', rating: 5, comment: 'Excellent service, very polite driver. Reached on time and the car was very clean.', date: 'Mar 31, 2024', tags: ['Professional', 'Clean Vehicle'] },
    { id: 'RV102', driver: 'Vijay Pratap', passenger: 'Soham K.', rating: 4, comment: 'Good ride, but the driver took a slightly longer route due to traffic. Overall okay.', date: 'Mar 31, 2024', tags: ['Polite'] },
    { id: 'RV103', driver: 'Anil Deshmukh', passenger: 'Priya V.', rating: 2, comment: 'Driver was a bit rude and driving very fast. Uncomfortable experience.', date: 'Mar 30, 2024', tags: ['Rash Driving'] },
    { id: 'RV104', driver: 'Suresh Singh', passenger: 'Neha R.', rating: 5, comment: 'Great behavior, helpful with luggage. Highly recommended!', date: 'Mar 30, 2024', tags: ['Helpful', '5-Star'] },
  ]);

  return (
    <div className="space-y-10 p-1 animate-in fade-in duration-700 font-sans text-gray-950">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
         <div>
            <h1 className="text-4xl font-black tracking-tight text-gray-900 mb-2 leading-none">Ratings & Reviews</h1>
            <div className="flex items-center gap-2 text-[13px] font-bold text-gray-400">
               <span className="text-gray-950">Fleet Control</span>
               <ChevronRight size={14} />
               <span>Service Quality Audit</span>
            </div>
         </div>
         <div className="flex items-center gap-3">
            <button className="bg-white border border-gray-100 text-gray-950 px-5 py-2.5 rounded-xl text-[12px] font-black flex items-center gap-2 hover:bg-gray-50 transition-all shadow-sm">
               <Download size={16} className="text-gray-400" /> Sentiment Report
            </button>
         </div>
      </div>

      {/* RATING DASHBOARD */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
         <div className="bg-white p-8 rounded-[40px] border border-gray-50 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-5 scale-[2] -rotate-12 translate-x-4"><Star size={80} strokeWidth={1} /></div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6 relative z-10">Global Average</p>
            <div className="flex items-end gap-3 relative z-10 mb-2">
               <p className="text-6xl font-black text-gray-950 leading-none">{ratingStats.avgRating}</p>
               <div className="flex flex-col py-1">
                  <div className="flex items-center gap-0.5 text-orange-400"><Star size={16} className="fill-orange-400" /><Star size={16} className="fill-orange-400" /><Star size={16} className="fill-orange-400" /><Star size={16} className="fill-orange-400" /><Star size={16} className="fill-orange-400 opacity-30" /></div>
                  <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-widest">Fleet Mean</p>
               </div>
            </div>
         </div>

         <div className="bg-white p-8 rounded-[40px] border border-gray-50 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-5 scale-[2] -rotate-12 translate-x-4 group-hover:scale-[2.2] transition-transform duration-700"><ThumbsUp size={80} strokeWidth={1} /></div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6 relative z-10">Positive Feedback</p>
            <div className="flex items-end gap-3 relative z-10 mb-2">
               <p className="text-6xl font-black text-emerald-600 leading-none">{ratingStats.positiveRate}%</p>
               <p className="text-[11px] font-black text-emerald-500 uppercase flex items-center gap-1 pb-1">
                  <ArrowUpRight size={14} /> +2.4% INCREASE
               </p>
            </div>
         </div>

         <div className="bg-white p-8 rounded-[40px] border border-gray-50 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-5 scale-[2] -rotate-12 translate-x-4"><MessageSquare size={80} strokeWidth={1} /></div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6 relative z-10">Total Verified REviews</p>
            <div className="flex items-end gap-3 relative z-10 mb-2">
               <p className="text-6xl font-black text-gray-950 leading-none">12.4k</p>
               <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pb-1">Since Jan 2024</p>
            </div>
         </div>

         <div className="bg-gray-950 p-8 rounded-[40px] text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-10 scale-[2] -rotate-12 translate-x-4"><ShieldAlert size={80} strokeWidth={1} /></div>
            <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-6 relative z-10">Low performance Alerts</p>
            <div className="flex items-end gap-3 relative z-10 mb-2">
               <p className="text-6xl font-black text-rose-500 leading-none">42</p>
               <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest pb-1">Review flagged</p>
            </div>
         </div>
      </div>

      {/* REVIEWS TABLE SECTION */}
      <div className="space-y-8">
         <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <h2 className="text-2xl font-black tracking-tight text-gray-900 leading-none">Recent Verified Feedback</h2>
            <div className="flex flex-wrap items-center gap-3">
               <div className="relative w-80">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input type="text" placeholder="Search driver or passenger..." className="w-full pl-11 pr-4 py-3 bg-white border border-gray-100 rounded-xl text-[12px] font-bold focus:ring-2 focus:ring-gray-100 outline-none transition-all" />
               </div>
               <button className="p-3 bg-white border border-gray-100 text-gray-400 rounded-xl hover:text-gray-950 shadow-sm"><Filter size={18} /></button>
            </div>
         </div>

         <div className="bg-white rounded-[40px] border border-gray-50 shadow-sm overflow-hidden">
            <div className="overflow-x-auto no-scrollbar">
               <table className="w-full text-left">
                  <thead>
                     <tr className="border-b border-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] bg-gray-50/20">
                        <th className="px-8 py-5">Reviewer Detail</th>
                        <th className="px-6 py-5">Assigned Operator</th>
                        <th className="px-6 py-5">Rating</th>
                        <th className="px-6 py-5">Feedback Analysis</th>
                        <th className="px-6 py-5 text-center">Outcome</th>
                        <th className="px-8 py-5 text-right w-10"></th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                     {reviews.map((rev, i) => (
                        <tr key={i} className="hover:bg-gray-50/10 transition-all cursor-pointer group">
                           <td className="px-8 py-6">
                              <div className="flex items-center gap-4">
                                 <div className="w-10 h-10 rounded-xl bg-gray-100 border border-gray-200 text-gray-950 font-black text-[12px] flex items-center justify-center uppercase shadow-inner group-hover:scale-105 transition-transform">
                                    {rev.passenger.split(' ').map(n => n[0]).join('')}
                                 </div>
                                 <div>
                                    <p className="text-[13px] font-bold text-gray-950 tracking-tight leading-none mb-1.5">{rev.passenger}</p>
                                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest leading-none">{rev.date}</p>
                                 </div>
                              </div>
                           </td>
                           <td className="px-6 py-6">
                              <div className="flex items-center gap-2">
                                 <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                 <span className="text-[13px] font-black text-gray-800">{rev.driver}</span>
                              </div>
                           </td>
                           <td className="px-6 py-6">
                              <div className="flex items-center gap-1.5">
                                 <span className={`text-[15px] font-black ${rev.rating >= 4 ? 'text-emerald-500' : rev.rating >= 3 ? 'text-amber-500' : 'text-rose-500'}`}>
                                    {rev.rating}.0
                                 </span>
                                 <Star size={14} className={`fill-current ${rev.rating >= 4 ? 'text-emerald-500' : rev.rating >= 3 ? 'text-amber-500' : 'text-rose-500'}`} />
                              </div>
                           </td>
                           <td className="px-6 py-6 max-w-sm">
                              <p className="text-[13px] font-bold text-gray-500 leading-relaxed truncate group-hover:whitespace-normal group-hover:overflow-visible transition-all">"{rev.comment}"</p>
                              <div className="flex flex-wrap gap-2 mt-3">
                                 {rev.tags.map((tag, j) => (
                                    <span key={j} className="px-2 py-0.5 bg-gray-50 text-[9px] font-black text-gray-400 uppercase tracking-widest border border-gray-100 rounded-md">
                                       {tag}
                                    </span>
                                 ))}
                              </div>
                           </td>
                           <td className="px-6 py-6 text-center">
                              {rev.rating >= 4 ? (
                                 <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest border border-emerald-100 rounded-lg">Verified Positive</span>
                              ) : (
                                 <span className="px-3 py-1 bg-rose-50 text-rose-600 text-[10px] font-black uppercase tracking-widest border border-rose-100 rounded-lg">Audit Flagged</span>
                              )}
                           </td>
                           <td className="px-8 py-6 text-right">
                              <button className="p-2.5 text-gray-400 hover:text-gray-950 hover:bg-white rounded-xl transition-all shadow-sm">
                                 <MoreHorizontal size={18} />
                              </button>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>
      </div>
    </div>
  );
};

export default DriverRatings;
