import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, MapPin, X } from 'lucide-react';

const SelectLocation = () => {
  const [pickup, setPickup] = useState('Pipaliyahana, Indore');
  const [drop, setDrop] = useState('');
  const [stop, setStop] = useState('');
  const [showStops, setShowStops] = useState(false);
  const [mapToast, setMapToast] = useState(false);
  const navigate = useNavigate();

  // All known locations — filtered live as user types
  const allResults = [
    { title: 'Vijay Nagar', address: 'Vijay Nagar, Indore, Madhya Pradesh' },
    { title: 'Vijay Nagar Square', address: 'Vijay Nagar Square, Bhagyashree Colony, Indore' },
    { title: 'Vijayawada', address: 'Vijayawada, Andhra Pradesh, India' },
    { title: 'Vijay Nagar Police Station', address: 'Vijay Nagar Police Station, Sector D, Indore' },
    { title: 'Rajwada', address: 'Rajwada, Old Palasia, Indore, MP' },
    { title: 'Bhawarkua', address: 'Bhawarkua, Indore, Madhya Pradesh' },
    { title: 'MG Road', address: 'MG Road, Indore, Madhya Pradesh' },
    { title: 'Palasia Square', address: 'Palasia Square, AB Road, Indore' },
    { title: 'LIG Colony', address: 'LIG Colony, Indore, Madhya Pradesh' },
    { title: 'Scheme No 54', address: 'Scheme No 54, Vijay Nagar, Indore' },
    { title: 'Bhangadh', address: 'Bhangadh, Indore, Madhya Pradesh' },
    { title: 'AB Road', address: 'AB Road, Indore, Madhya Pradesh' },
  ];

  const searchResults = drop.trim().length >= 1
    ? allResults.filter(r =>
        r.title.toLowerCase().includes(drop.toLowerCase()) ||
        r.address.toLowerCase().includes(drop.toLowerCase())
      )
    : allResults.slice(0, 6);

  const showMapToast = () => {
    setMapToast(true);
    setTimeout(() => setMapToast(false), 2500);
  };

  const handleSelectDrop = (title) => {
    navigate('/ride/select-vehicle', {
      state: {
        pickup: pickup || 'Pipaliyahana, Indore',
        drop: title,
        stop: stop || null,
      },
    });
  };

  return (
    <div className="min-h-screen bg-white max-w-lg mx-auto font-sans">

      {/* Map Picker Toast */}
      <AnimatePresence>
        {mapToast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-gray-900 text-white px-5 py-3 rounded-2xl text-sm font-black shadow-2xl whitespace-nowrap"
          >
            🗺️ Map Picker — Coming Soon!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="p-3 flex items-center gap-6">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 active:scale-90 transition-all">
          <ArrowLeft size={24} className="text-gray-900" strokeWidth={2.5} />
        </button>
        <h1 className="text-[20px] font-extrabold text-gray-900 tracking-tight">Where to?</h1>
      </div>

      {/* Input Card */}
      <div className="px-5">
        <div className="bg-white rounded-[24px] p-3 shadow-[0_4px_30px_rgba(0,0,0,0.06)] border border-gray-100">
          <div className="space-y-3">

            {/* Pickup Row */}
            <div className="flex items-center gap-4">
              <div className="w-6 h-6 rounded-full border-2 border-green-700 flex items-center justify-center shrink-0">
                <div className="w-1.5 h-1.5 rounded-full bg-green-700" />
              </div>
              <div className="flex-1 flex items-center bg-gray-50 rounded-xl px-3 py-2.5">
                <input
                  type="text"
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  placeholder="Your pickup location"
                  className="w-full bg-transparent border-none text-[15px] font-bold text-gray-900 focus:outline-none placeholder:text-gray-300"
                />
                {pickup.length > 0 && (
                  <button onClick={() => setPickup('')} className="ml-2 shrink-0">
                    <X size={16} className="text-gray-300 hover:text-gray-600 transition-colors" />
                  </button>
                )}
              </div>
            </div>

            {/* Dotted connector line */}
            <div className="ml-[11px] h-3 w-[1.5px] border-l-[1.5px] border-dotted border-gray-300" />

            {/* Drop Row */}
            <div className="flex items-center gap-4">
              <div className="w-6 h-6 rounded-full border-2 border-orange-600 flex items-center justify-center shrink-0">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-600" />
              </div>
              <div className="flex-1 flex items-center bg-gray-50 rounded-xl px-3 py-2.5 ring-2 ring-orange-100">
                <input
                  type="text"
                  value={drop}
                  autoFocus
                  placeholder="Enter drop location..."
                  onChange={(e) => setDrop(e.target.value)}
                  className="w-full bg-transparent border-none text-[15px] font-bold text-gray-900 focus:outline-none placeholder:text-gray-300"
                />
                {drop.length > 0 && (
                  <button onClick={() => setDrop('')} className="ml-2 shrink-0">
                    <X size={16} className="text-gray-300 hover:text-gray-600 transition-colors" />
                  </button>
                )}
              </div>
            </div>

            {/* Optional Stop Row */}
            <AnimatePresence>
              {showStops && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-center gap-4 overflow-hidden"
                >
                  <div className="w-6 h-6 rounded-full border-2 border-blue-500 flex items-center justify-center shrink-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  </div>
                  <div className="flex-1 flex items-center bg-blue-50 rounded-xl px-3 py-2.5">
                    <input
                      type="text"
                      value={stop}
                      placeholder="Add a stop along the way..."
                      onChange={(e) => setStop(e.target.value)}
                      className="w-full bg-transparent border-none text-[15px] font-bold text-gray-900 focus:outline-none placeholder:text-blue-300"
                    />
                    {stop.length > 0 && (
                      <button onClick={() => setStop('')} className="ml-2 shrink-0">
                        <X size={16} className="text-blue-300 hover:text-blue-600 transition-colors" />
                      </button>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Action Pills */}
      <div className="flex gap-3 px-5 my-4">
        <button
          onClick={showMapToast}
          className="flex-1 flex items-center justify-center gap-2 bg-white border border-gray-100 rounded-full py-2.5 shadow-sm active:scale-95 transition-all text-sm font-black text-gray-800"
        >
          <MapPin size={16} className="text-gray-900" />
          <span>Select on map</span>
        </button>
        <button
          onClick={() => setShowStops(!showStops)}
          className={`flex-1 flex items-center justify-center gap-2 rounded-full py-2.5 shadow-sm active:scale-95 transition-all text-sm font-black border ${
            showStops
              ? 'bg-blue-50 border-blue-200 text-blue-600'
              : 'bg-white border-gray-100 text-gray-800'
          }`}
        >
          <div className={`w-4 h-4 rounded flex items-center justify-center ${showStops ? 'bg-blue-500' : 'bg-black'}`}>
            <span className="text-[10px] text-white font-bold leading-none">{showStops ? '−' : '+'}</span>
          </div>
          <span>{showStops ? 'Remove stop' : 'Add stops'}</span>
        </button>
      </div>

      {/* Search Results */}
      <div className="px-5 mb-4">
        <h2 className="text-[17px] font-extrabold text-gray-900 mb-2 ml-1">
          {drop.trim().length > 0 ? 'Search Results' : 'Popular Locations'}
        </h2>

        {searchResults.length > 0 ? (
          <div className="space-y-1">
            {searchResults.map((result, idx) => (
              <motion.div
                key={idx}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSelectDrop(result.title)}
                className="flex gap-4 py-2 group cursor-pointer"
              >
                <div className="mt-1 opacity-40 group-hover:opacity-100 shrink-0 transition-opacity">
                  <MapPin size={20} className="text-gray-400" />
                </div>
                <div className="flex-1 pb-3 border-b border-gray-50">
                  <h4 className="text-[16px] font-black text-gray-900 leading-tight">{result.title}</h4>
                  <p className="text-[13px] text-gray-400 font-bold mt-0.5 line-clamp-1">{result.address}</p>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-4xl mb-3">🔍</div>
            <p className="text-[15px] font-black text-gray-400">No results for <span className="text-gray-700">"{drop}"</span></p>
            <p className="text-[12px] font-bold text-gray-300 mt-1">Try a different search term</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectLocation;
