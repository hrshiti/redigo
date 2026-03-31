import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Box, Gift, FileText, ShoppingBag, Smartphone, LayoutGrid } from 'lucide-react';

const ParcelType = () => {
  const [selectedType, setSelectedType] = useState('Documents');
  const navigate = useNavigate();

  const categories = [
    { id: '1', title: 'Documents', icon: <FileText size={28} />, desc: 'Office files, paper' },
    { id: '2', title: 'Food & Groceries', icon: <ShoppingBag size={28} />, desc: 'Lunch, veggies' },
    { id: '3', title: 'Gifts & Cake', icon: <Gift size={28} />, desc: 'Birthday cake, gift box' },
    { id: '4', title: 'Clothes', icon: <Box size={28} />, desc: 'Laundry, new dress' },
    { id: '5', title: 'Electronics', icon: <Smartphone size={28} />, desc: 'Phone, laptop, cables' },
    { id: '6', title: 'Others', icon: <LayoutGrid size={28} />, desc: 'Any other item' },
  ];

  return (
    <div className="min-h-screen bg-[#FDFDFD] max-w-lg mx-auto flex flex-col font-sans relative">
      {/* Header */}
      <div className="bg-white px-5 py-6 flex items-center gap-6 border-b border-gray-50 shadow-sm sticky top-0 z-20">
         <button onClick={() => navigate(-1)} className="p-2 -ml-2 active:scale-90 transition-all">
            <ArrowLeft size={24} className="text-gray-900" strokeWidth={3} />
         </button>
         <div>
            <h1 className="text-[20px] font-extrabold text-gray-900 tracking-tight leading-none">Parcel Type</h1>
            <p className="text-[12px] font-bold text-gray-400 mt-1 uppercase tracking-widest">What are you sending?</p>
         </div>
      </div>

      <div className="flex-1 p-5 space-y-6">
        <h2 className="text-[17px] font-black text-gray-900 ml-1">Select Category</h2>
        <div className="grid grid-cols-2 gap-4">
            {categories.map((cat) => (
                <motion.div 
                    key={cat.id}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => setSelectedType(cat.title)}
                    className={`p-6 rounded-[32px] border-2 transition-all cursor-pointer flex flex-col items-center justify-center text-center gap-3 ${
                        selectedType === cat.title 
                        ? 'border-primary bg-orange-50/50 shadow-lg shadow-orange-100/50 scale-100' 
                        : 'border-gray-50 bg-white hover:border-gray-200'
                    }`}
                >
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${
                        selectedType === cat.title ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400'
                    }`}>
                        {cat.icon}
                    </div>
                    <div>
                        <span className={`text-[15px] font-black tracking-tight block ${
                            selectedType === cat.title ? 'text-gray-900' : 'text-gray-500'
                        }`}>{cat.title}</span>
                        <span className="text-[10px] font-bold text-gray-400 leading-tight mt-1 opacity-70">{cat.desc}</span>
                    </div>
                </motion.div>
            ))}
        </div>
      </div>

      {/* Button Sticky Area */}
      <div className="p-6 bg-white border-t border-gray-50 pb-10">
         <motion.button 
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/parcel/details')}
            className="w-full bg-[#1C2833] py-5 rounded-[28px] text-[18px] font-black text-white shadow-xl shadow-gray-200 active:bg-black transition-all"
         >
            Next: Item Details
         </motion.button>
      </div>
    </div>
  );
};

export default ParcelType;
