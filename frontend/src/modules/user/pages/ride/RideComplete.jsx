import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, CheckCircle2, ChevronRight, Share2, Info } from 'lucide-react';

const TIP_OPTIONS = [10, 20, 50, 100];

const RideComplete = () => {
  const [rating, setRating] = useState(0);
  const [selectedTip, setSelectedTip] = useState(null);
  const [customTip, setCustomTip] = useState('');
  const [showCustomTip, setShowCustomTip] = useState(false);
  const [shareToast, setShareToast] = useState(false);
  const [ratingSubmitted, setRatingSubmitted] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state || {};

  const fare = state.fare || 22;
  const paymentMethod = state.paymentMethod || 'Cash';
  const driver = state.driver || { name: 'Kishan Kumawat' };
  const pickup = state.pickup || 'Pipaliyahana, Indore';
  const drop = state.drop || 'Vijay Nagar, Indore';

  const effectiveTip = selectedTip ?? (showCustomTip ? parseInt(customTip || '0', 10) : 0);
  const totalBill = fare + effectiveTip;

  // Auto-navigate to home after rating is given
  useEffect(() => {
    if (ratingSubmitted) {
      const timer = setTimeout(() => navigate('/'), 1500);
      return () => clearTimeout(timer);
    }
  }, [ratingSubmitted, navigate]);

  const handleRating = (num) => {
    setRating(num);
    // Brief delay to show selected state then mark as submitted
    setTimeout(() => setRatingSubmitted(true), 400);
  };

  const handleShare = () => {
    const receiptText = `Redigo Trip Receipt\nRoute: ${pickup} → ${drop}\nFare: ₹${fare}${effectiveTip > 0 ? `\nTip: ₹${effectiveTip}` : ''}\nTotal: ₹${totalBill}\nPayment: ${paymentMethod}\nDriver: ${driver.name}`;
    if (navigator.share) {
      navigator.share({ title: 'Redigo Trip Receipt', text: receiptText }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(receiptText).then(() => {
        setShareToast(true);
        setTimeout(() => setShareToast(false), 2500);
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F9F9] max-w-lg mx-auto relative font-sans p-5 flex flex-col justify-between">

      {/* Share Toast */}
      <AnimatePresence>
        {shareToast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-gray-900 text-white px-5 py-3 rounded-2xl text-sm font-black shadow-2xl whitespace-nowrap"
          >
            ✅ Receipt copied to clipboard!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Rating Submitted Overlay */}
      <AnimatePresence>
        {ratingSubmitted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-white/95 z-50 flex flex-col items-center justify-center gap-4 max-w-lg mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center text-white"
            >
              <CheckCircle2 size={40} strokeWidth={3} />
            </motion.div>
            <h2 className="text-xl font-black text-gray-900">Thanks for your feedback!</h2>
            <p className="text-sm font-bold text-gray-400">Taking you back to Home...</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-1 space-y-6 pt-6">
        {/* Success Header */}
        <div className="flex flex-col items-center gap-3 text-center">
          <motion.div
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center text-white shadow-2xl shadow-green-100"
          >
            <CheckCircle2 size={40} strokeWidth={3} />
          </motion.div>
          <div className="space-y-1">
            <h1 className="text-2xl font-black text-gray-900 tracking-tight leading-none">Arrived!</h1>
            <p className="text-[12px] font-bold text-gray-400 uppercase tracking-widest leading-none mt-1.5">Ride completed successfully</p>
          </div>
        </div>

        {/* Fare Summary Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-[40px] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.06)] border border-gray-50 flex flex-col items-center"
        >
          <span className="text-[12px] font-black text-gray-400 tracking-widest uppercase">Total Bill</span>
          <div className="flex items-baseline gap-1 mt-2">
            <span className="text-5xl font-black text-gray-900 tracking-tighter">₹{totalBill}</span>
            <span className="text-2xl font-black text-gray-400">.00</span>
          </div>
          {effectiveTip > 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[12px] font-black text-green-600 mt-1"
            >
              Includes ₹{effectiveTip} tip — Thank you! 🙏
            </motion.p>
          )}

          <div className="flex gap-4 mt-6 w-full border-t border-gray-50 pt-6">
            <div className="flex-1 text-center flex flex-col gap-1 border-r border-gray-50">
              <span className="text-[10px] font-black text-gray-400 tracking-widest uppercase mb-1">Payment</span>
              <span className="text-[14px] font-black text-gray-900">{paymentMethod}</span>
            </div>
            <div className="flex-1 text-center flex flex-col gap-1">
              <span className="text-[10px] font-black text-gray-400 tracking-widest uppercase mb-1">Fare</span>
              <span className="text-[14px] font-black text-gray-900">₹{fare}.00</span>
            </div>
          </div>
        </motion.div>

        {/* Tip Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="bg-white rounded-[32px] p-5 shadow-sm border border-gray-50"
        >
          <h3 className="text-[14px] font-black text-gray-900 mb-3 text-center uppercase tracking-widest">
            Tip your driver 🙏
          </h3>
          <div className="flex gap-2 justify-center flex-wrap">
            {TIP_OPTIONS.map((amount) => (
              <motion.button
                key={amount}
                whileTap={{ scale: 0.93 }}
                onClick={() => {
                  setSelectedTip(selectedTip === amount ? null : amount);
                  setShowCustomTip(false);
                  setCustomTip('');
                }}
                className={`px-5 py-2.5 rounded-full text-[13px] font-black transition-all border ${
                  selectedTip === amount
                    ? 'bg-primary text-white border-primary shadow-lg shadow-orange-100'
                    : 'bg-gray-50 text-gray-600 border-gray-100 hover:border-gray-200'
                }`}
              >
                ₹{amount}
              </motion.button>
            ))}
            <motion.button
              whileTap={{ scale: 0.93 }}
              onClick={() => {
                setShowCustomTip(!showCustomTip);
                setSelectedTip(null);
              }}
              className={`px-5 py-2.5 rounded-full text-[13px] font-black transition-all border ${
                showCustomTip
                  ? 'bg-gray-900 text-white border-gray-900'
                  : 'bg-gray-50 text-gray-600 border-gray-100'
              }`}
            >
              Custom
            </motion.button>
          </div>
          <AnimatePresence>
            {showCustomTip && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-3 overflow-hidden"
              >
                <div className="flex items-center gap-2 bg-gray-50 rounded-2xl px-4 py-3 border border-gray-100">
                  <span className="text-[16px] font-black text-gray-400">₹</span>
                  <input
                    type="number"
                    placeholder="Enter tip amount"
                    value={customTip}
                    onChange={(e) => setCustomTip(e.target.value)}
                    className="flex-1 bg-transparent border-none text-[15px] font-black text-gray-900 focus:outline-none placeholder:text-gray-300"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Rating Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.45 }}
          className="space-y-4 text-center"
        >
          <h3 className="text-xl font-black text-gray-900 tracking-tight">
            How was your ride with {driver.name?.split(' ')[0]}?
          </h3>
          <div className="flex justify-center gap-3">
            {[1, 2, 3, 4, 5].map((num) => (
              <motion.button
                key={num}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleRating(num)}
                className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                  rating >= num ? 'bg-[#F48C06] text-white shadow-lg shadow-orange-100' : 'bg-gray-100 text-gray-300'
                }`}
              >
                <Star size={24} className={rating >= num ? 'fill-white' : ''} />
              </motion.button>
            ))}
          </div>
          {rating > 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-primary font-black text-sm uppercase tracking-widest"
            >
              {rating === 5 ? '⭐ Awesome Experience!' : rating >= 3 ? '👍 Thanks for rating!' : '📝 We will improve!'}
            </motion.p>
          )}
        </motion.div>
      </div>

      {/* Bottom Action Area */}
      <div className="space-y-4 pb-4 mt-6">
        <div className="flex gap-4 px-2">
          <button
            onClick={handleShare}
            className="flex-1 flex items-center justify-center gap-2 bg-white border border-gray-100 py-3.5 rounded-[24px] text-sm font-black text-gray-900 shadow-sm active:scale-95 transition-all"
          >
            <Share2 size={18} />
            <span>Share Receipt</span>
          </button>
          <button
            onClick={() => navigate('/support')}
            className="flex-1 flex items-center justify-center gap-2 bg-white border border-gray-100 py-3.5 rounded-[24px] text-sm font-black text-gray-900 shadow-sm active:scale-95 transition-all"
          >
            <Info size={18} />
            <span>Support</span>
          </button>
        </div>
        <button
          onClick={() => navigate('/')}
          className="w-full bg-[#1C2833] py-5 rounded-[28px] text-lg font-black text-white shadow-2xl active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          <span>Back to Home</span>
          <ChevronRight size={22} className="opacity-50" />
        </button>
      </div>
    </div>
  );
};

export default RideComplete;
