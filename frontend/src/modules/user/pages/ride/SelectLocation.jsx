import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Search, PlusCircle, X } from 'lucide-react';

const SelectLocation = () => {
  const [pickup, setPickup] = useState('pipl');
  const [drop, setDrop] = useState('vija');
  const navigate = useNavigate();

  const searchResults = [
    { title: 'Vijay Nagar', address: 'Vijay Nagar, Indore, Madhya Pradesh, ...' },
    { title: 'Vijay Nagar', address: 'Vijay Nagar, Scheme No 54, Indore, M...' },
    { title: 'Vijay Nagar Square', address: 'Vijay Nagar Square, Bhagyashree Col...' },
    { title: 'Vijayawada', address: 'Vijayawada, Andhra Pradesh, India' },
    { title: 'Vijay Nagar Police Station', address: 'Vijay Nagar Police Station, Vijay Naga...' },
  ];

  return (
    <div className="min-h-screen bg-white max-w-lg mx-auto font-sans">
      {/* Header */}
      <div className="p-4 flex items-center gap-6">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 active:scale-90 transition-all">
          <ArrowLeft size={24} className="text-gray-900" strokeWidth={2.5} />
        </button>
        <h1 className="text-[20px] font-extrabold text-gray-900 tracking-tight">Drop</h1>
      </div>

      {/* Input Card - EXACT AS IMAGE */}
      <div className="px-5">
        <div className="bg-white rounded-[24px] p-4 shadow-[0_4px_30px_rgba(0,0,0,0.04)] border border-gray-100">
           <div className="space-y-4">
              {/* Pickup Input Row */}
              <div className="flex items-center gap-4">
                 <div className="w-6 h-6 rounded-full border-2 border-green-700 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-700"></div>
                 </div>
                 <div className="flex-1 flex items-center bg-gray-50/50 rounded-xl px-3 py-2.5">
                    <input 
                      type="text" 
                      value={pickup} 
                      onChange={(e) => setPickup(e.target.value)}
                      className="w-full bg-transparent border-none text-[16px] font-bold text-gray-900 focus:outline-none"
                    />
                    <X size={18} className="text-gray-300 ml-2" />
                 </div>
              </div>

              {/* Vertical dotted line between inputs */}
              <div className="absolute left-[39px] top-[108px] h-4 w-[1.5px] border-l-[1.5px] border-dotted border-gray-300"></div>

              {/* Drop Input Row */}
              <div className="flex items-center gap-4">
                 <div className="w-6 h-6 rounded-full border-2 border-orange-600 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-600"></div>
                 </div>
                 <div className="flex-1 flex items-center bg-gray-50/50 rounded-xl px-3 py-2.5 outline-none ring-2 ring-orange-100 ring-offset-0">
                    <input 
                      type="text" 
                      value={drop} 
                      autoFocus
                      onChange={(e) => setDrop(e.target.value)}
                      className="w-full bg-transparent border-none text-[16px] font-bold text-gray-900 focus:outline-none"
                    />
                    <X size={18} className="text-gray-300 ml-2" />
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* Action Buttons - PILLS */}
      <div className="flex gap-4 px-5 my-6">
        <button className="flex-1 flex items-center justify-center gap-2 bg-white border border-gray-100 rounded-full py-3.5 shadow-sm active:scale-95 transition-all text-sm font-black text-gray-800">
          <MapPin size={18} className="text-gray-900" />
          <span>Select on map</span>
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 bg-white border border-gray-100 rounded-full py-3.5 shadow-sm active:scale-95 transition-all text-sm font-black text-gray-800">
          <div className="w-4 h-4 bg-black rounded flex items-center justify-center">
            <span className="text-[10px] text-white font-bold">+</span>
          </div>
          <span>Add stops</span>
        </button>
      </div>

      {/* Search Result Section */}
      <div className="px-5 mb-4">
        <h2 className="text-[18px] font-extrabold text-gray-900 mb-4 ml-1">Search Result</h2>
        <div className="space-y-4">
          {searchResults.map((result, idx) => (
            <motion.div 
               key={idx}
               whileTap={{ backgroundColor: "#f9fafb" }}
               onClick={() => navigate('/ride/select-vehicle')}
               className="flex gap-4 py-1 group cursor-pointer"
            >
              <div className="mt-1 opacity-40 group-hover:opacity-100">
                <MapPin size={22} className="text-gray-400" />
              </div>
              <div className="flex-1 pb-4 border-b border-gray-50">
                <h4 className="text-[17px] font-black text-gray-900 leading-tight">{result.title}</h4>
                <p className="text-[14px] text-gray-400 font-bold mt-1 line-clamp-1">{result.address}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectLocation;
