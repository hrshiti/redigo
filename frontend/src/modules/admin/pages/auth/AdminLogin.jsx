import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Mail, Lock, ArrowRight, Car } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // For demo/mock, any input works
    navigate('/admin/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 font-sans overflow-hidden relative">
      {/* Background Decorative Elements */}
      <div className="absolute top-20 left-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg bg-white rounded-[40px] shadow-[0_20px_60px_rgba(0,0,0,0.05)] border border-gray-100 p-12 relative z-10"
      >
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-white shadow-xl shadow-primary/30 mb-6 group cursor-pointer hover:scale-110 transition-transform">
             <Car size={32} strokeWidth={3} />
          </div>
          <h1 className="text-[32px] font-black text-gray-900 tracking-tight text-center">Admin Console</h1>
          <p className="text-gray-400 font-bold text-[14px] mt-2 uppercase tracking-widest flex items-center gap-2">
            <ShieldCheck size={16} /> Restricted Access Control
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-4">
            <div className="relative group">
               <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
               <input 
                  type="email" 
                  placeholder="Email Address" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-14 pr-6 py-4 bg-gray-50 border-none rounded-2xl text-[15px] focus:ring-2 focus:ring-primary/20 transition-all font-medium placeholder:text-gray-300"
               />
            </div>
            <div className="relative group">
               <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
               <input 
                  type="password" 
                  placeholder="Password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-14 pr-6 py-4 bg-gray-50 border-none rounded-2xl text-[15px] focus:ring-2 focus:ring-primary/20 transition-all font-medium placeholder:text-gray-300"
               />
            </div>
          </div>

          <div className="flex items-center justify-between px-2">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary/20" />
              <span className="text-[13px] font-bold text-gray-400 group-hover:text-gray-600 transition-colors">Keep me signed in</span>
            </label>
            <button type="button" className="text-[13px] font-black text-primary hover:underline">Forgot Access Key?</button>
          </div>

          <button 
            type="submit"
            className="w-full bg-primary py-4 rounded-2xl text-white font-black text-lg shadow-xl shadow-primary/20 hover:bg-primary/95 active:scale-[0.98] transition-all flex items-center justify-center gap-3 mt-4"
          >
            Authenticate <ArrowRight size={20} />
          </button>
        </form>

        <div className="mt-12 pt-8 border-t border-gray-50 flex items-center justify-center gap-8">
           <div className="text-center">
              <p className="text-[20px] font-black text-gray-900 leading-none">2.4k</p>
              <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-wider">Active Rides</p>
           </div>
           <div className="text-center border-l border-gray-100 pl-8 pr-8 border-r">
              <p className="text-[20px] font-black text-gray-900 leading-none">842</p>
              <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-wider">Online Drivers</p>
           </div>
           <div className="text-center">
              <p className="text-[20px] font-black text-gray-900 leading-none">12</p>
              <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-wider">Open Cities</p>
           </div>
        </div>
      </motion.div>

      {/* Footer Branding */}
      <div className="absolute bottom-10 left-0 right-0 text-center">
         <p className="text-[12px] font-bold text-gray-300 tracking-widest uppercase mb-1">Redigo Enterprise © 2026</p>
         <p className="text-[10px] font-bold text-gray-200 tracking-tight px-10 max-w-xl mx-auto">This system is strictly for authorized personnel. All access is monitored and logged in compliance with operational security standards.</p>
      </div>
    </div>
  );
};

export default AdminLogin;
