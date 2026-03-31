import React, { useState } from 'react';
import { 
  ArrowLeft, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  ShieldCheck, 
  FileText, 
  Maximize2, 
  Mail, 
  Phone, 
  MapPin, 
  Car, 
  Calendar, 
  AlertCircle 
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

const DocumentCard = ({ title, type, status, expiry, image, onVerify, onReject }) => (
  <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden group shadow-sm hover:shadow-md transition-all">
    <div className="p-4 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
       <div className="flex items-center gap-2">
          <FileText size={16} className="text-gray-400" />
          <span className="text-[13px] font-black text-gray-900 tracking-tight">{title}</span>
       </div>
       <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
          status === 'Verified' ? 'bg-green-50 text-green-600 border-green-100' :
          status === 'Pending' ? 'bg-orange-50 text-orange-600 border-orange-100' : 'bg-red-50 text-red-600 border-red-100'
       }`}>
          {status}
       </span>
    </div>
    <div className="relative aspect-[16/10] bg-gray-900/5 overflow-hidden">
       <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100" />
       <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
          <button className="bg-white p-2 rounded-full shadow-xl hover:scale-110 transition-all"><Maximize2 size={16} /></button>
       </div>
    </div>
    <div className="p-4 flex items-center justify-between">
       <div className="text-left leading-none">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Expiry Date</p>
          <p className="text-[12px] font-bold text-gray-700">{expiry}</p>
       </div>
       <div className="flex gap-2">
          <button onClick={onReject} title="Reject Document" className="p-2 border border-gray-100 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"><XCircle size={16} /></button>
          <button onClick={onVerify} title="Verify Document" className="p-2 border border-gray-100 text-gray-400 hover:text-green-500 hover:bg-green-50 rounded-lg transition-all"><CheckCircle2 size={16} /></button>
       </div>
    </div>
  </div>
);

const DriverAudit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [overallStatus, setOverallStatus] = useState('Pending');
  
  const mockDriver = {
    id: id || 'DRV942',
    name: 'Rohan Deshmukh',
    phone: '+91 91234 56789',
    email: 'rohan.deshmukh@gmail.com',
    city: 'Indore, M.P.',
    car: 'Maruti Suzuki Dzire (MP-09-AB-1234)',
    joinedOn: '24th Mar 2024',
    documents: [
       { title: 'Driving License (Front)', status: 'Verified', expiry: '12/2032', image: 'https://images.unsplash.com/photo-1590483734724-383b85ad92e0?q=80&w=400' },
       { title: 'Vehicle RC Card', status: 'Pending', expiry: '05/2026', image: 'https://images.unsplash.com/photo-1627389955609-bf0114085512?q=80&w=400' },
       { title: 'Commercial Insurance', status: 'Pending', expiry: '09/2024', image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=400' },
       { title: 'Profile Selfie', status: 'Verified', expiry: 'N/A', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400' },
    ]
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-6xl mx-auto pb-20">
      {/* Header Navigation */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
           <button onClick={() => navigate('/admin/drivers')} className="p-2 bg-white border border-gray-100 rounded-xl hover:bg-gray-50 text-gray-500 transition-all shadow-sm">
             <ArrowLeft size={20} />
           </button>
           <div>
             <h1 className="text-xl font-black tracking-tight text-gray-900">Audit Driver Application</h1>
             <p className="text-gray-400 font-bold text-[11px] mt-0.5 uppercase tracking-widest leading-none">Reviewing Details for {mockDriver.name}</p>
           </div>
        </div>
        <div className="flex items-center gap-2">
           <button className="bg-red-50 border border-red-100 text-red-600 px-6 py-2 rounded-xl text-[13px] font-black hover:bg-red-100 transition-all">
             REJECT APPLICATION
           </button>
           <button onClick={() => setOverallStatus('Verified')} className="bg-black text-white px-8 py-2 rounded-xl text-[13px] font-black hover:opacity-90 transition-all shadow-xl shadow-black/10 flex items-center gap-2">
             <ShieldCheck size={18} /> APPROVE DRIVER
           </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8">
         {/* Left Side: Profile & Vehicle Details */}
         <div className="space-y-6">
            <div className="bg-white rounded-[24px] border border-gray-100 p-8 shadow-sm text-center">
               <div className="relative w-32 h-32 mx-auto mb-6">
                 <img src={mockDriver.documents[3].image} className="w-full h-full object-cover rounded-full border-4 border-white shadow-2xl" alt="Driver" />
                 <div className="absolute bottom-1 right-1 w-8 h-8 bg-black rounded-full flex items-center justify-center text-white border-2 border-white">
                    <ShieldCheck size={14} />
                 </div>
               </div>
               <h3 className="text-2xl font-black text-gray-900 tracking-tight">{mockDriver.name}</h3>
               <p className="text-[11px] font-black text-primary uppercase tracking-widest mt-1">Application ID: {mockDriver.id}</p>
               
               <div className="mt-8 space-y-4 text-left border-t border-gray-50 pt-8">
                  <div className="flex items-center gap-4">
                     <div className="p-2.5 bg-gray-50 rounded-xl text-gray-400"><Phone size={18} /></div>
                     <div className="leading-none">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Phone Number</p>
                        <p className="text-[14px] font-bold text-gray-700">{mockDriver.phone}</p>
                     </div>
                  </div>
                  <div className="flex items-center gap-4">
                     <div className="p-2.5 bg-gray-50 rounded-xl text-gray-400"><Mail size={18} /></div>
                     <div className="leading-none">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Email Address</p>
                        <p className="text-[14px] font-bold text-gray-700">{mockDriver.email}</p>
                     </div>
                  </div>
                  <div className="flex items-center gap-4">
                     <div className="p-2.5 bg-gray-50 rounded-xl text-gray-400"><MapPin size={18} /></div>
                     <div className="leading-none">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Current City</p>
                        <p className="text-[14px] font-bold text-gray-700">{mockDriver.city}</p>
                     </div>
                  </div>
                  <div className="flex items-center gap-4">
                     <div className="p-2.5 bg-gray-50 rounded-xl text-gray-400"><Car size={18} /></div>
                     <div className="leading-none">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5">Assigned Vehicle</p>
                        <p className="text-[14px] font-bold text-gray-700">{mockDriver.car}</p>
                     </div>
                  </div>
               </div>
            </div>

            {/* Audit Status Tracker */}
            <div className="bg-gray-900 rounded-[24px] p-8 text-white space-y-6 shadow-2xl shadow-gray-200">
               <h4 className="text-sm font-black uppercase tracking-widest border-b border-white/5 pb-4">Audit Status</h4>
               <div className="space-y-4">
                  {[
                    { label: 'Background Check', status: 'Completed', icon: <CheckCircle2 size={16} />, color: 'text-green-400' },
                    { label: 'Document Integrity', status: 'In Progress', icon: <Clock size={16} />, color: 'text-orange-400' },
                    { label: 'Vehicle Readiness', status: 'Pending', icon: <AlertCircle size={16} />, color: 'text-gray-500' },
                    { label: 'Training Session', status: 'Not Started', icon: <AlertCircle size={16} />, color: 'text-gray-500' },
                  ].map((step, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                       <span className="text-[13px] font-bold text-gray-300">{step.label}</span>
                       <div className={`flex items-center gap-2 font-black text-[10px] uppercase tracking-tighter ${step.color}`}>
                          {step.icon} {step.status}
                       </div>
                    </div>
                  ))}
               </div>
            </div>
         </div>

         {/* Middle & Right: Document Grid */}
         <div className="col-span-2 space-y-6">
            <div className="flex items-center justify-between">
               <h4 className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Uploaded Documents (4)</h4>
               <div className="flex items-center gap-2">
                 <button className="text-[11px] font-black text-primary uppercase border-b-2 border-primary">RE-AUDIT ALL</button>
               </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
               {mockDriver.documents.map((doc, idx) => (
                  <DocumentCard 
                    key={idx} 
                    {...doc} 
                    onVerify={() => alert(`${doc.title} Verified`)}
                    onReject={() => alert(`${doc.title} Rejected`)}
                  />
               ))}
            </div>

            {/* Rejection Note Area */}
            <div className="bg-white rounded-[24px] border border-gray-100 p-8 shadow-sm">
               <h4 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-6">Internal Review Notes</h4>
               <textarea 
                  placeholder="Only visible to admin staff. Add observations here..." 
                  className="w-full bg-gray-50 border-none rounded-2xl p-4 text-[13px] font-medium placeholder:text-gray-300 focus:ring-1 focus:ring-primary/20 min-h-[120px]"
               ></textarea>
               <div className="flex items-center justify-between mt-6">
                  <div className="flex items-center gap-2 text-gray-400">
                     <AlertCircle size={14} />
                     <span className="text-[11px] font-bold">Notes will be saved upon application decision.</span>
                  </div>
                  <button className="text-primary font-black text-[12px] uppercase hover:underline flex items-center gap-2">
                     <CheckCircle2 size={16} /> SAVE DRAFT NOTE
                  </button>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default DriverAudit;
