import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Navigation, 
    MessageSquare, 
    Phone, 
    ShieldAlert, 
    MapPin, 
    Check, 
    X, 
    Banknote, 
    CreditCard, 
    Wallet,
    QrCode,
    Scan,
    ChevronRight,
    Star,
    CheckCircle2,
    Package,
    User,
    ArrowUpRight,
    Box
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import MapPlaceholder from '@/assets/map_image.png';

const ActiveTrip = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    // Determining trip type from state or defaulting to 'ride'
    const tripType = location.state?.type || 'ride';
    const isParcel = tripType === 'parcel';

    const [phase, setPhase] = useState('to_pickup'); // to_pickup, otp_verification, in_trip, payment_confirm, review
    const [otp, setOtp] = useState('');
    const [selectedRating, setSelectedRating] = useState(0);
    const [driverPaymentStatus, setDriverPaymentStatus] = useState('pending'); // pending, selecting, qr_generated, success
    const [selectedPaymentMode, setSelectedPaymentMode] = useState('');

    const tripData = isParcel ? {
        sender: { name: 'Hritik Raghuwanshi', rating: '5.0', phone: '+91 96913 2XXXX' },
        receiver: { name: 'Vinay Kumar', phone: '+91 88712 1XXXX' },
        parcelType: 'Documents / Electronics',
        pickup: 'Flat 402, Swamclose Apts, JP Nagar',
        drop: 'Tea Villa Cafe, 12th Main, HSR Layout',
        fare: '₹120',
        payment: location.state?.paymentMethod || 'Online Payment'
    } : {
        user: { name: 'Vinay Kumar', rating: '4.8', phone: '+91 98765 43210' },
        pickup: 'Swamclose Apartments, JP nagar',
        drop: 'Tea Villa Cafe, HSR Layout',
        fare: '₹120',
        payment: location.state?.paymentMethod || 'Online Payment'
    };

    const handleOTP = (e) => {
        const val = e.target.value;
        if (val.length <= 4) setOtp(val);
        if (val === '1234') {
             setTimeout(() => setPhase('in_trip'), 500);
        }
    };

    return (
        <div className="min-h-screen bg-taxi-bg font-sans select-none overflow-hidden relative">
            {/* Map Area */}
            <div className="absolute inset-0 z-0 h-[65vh]">
                <img 
                    src={MapPlaceholder} 
                    alt="Active Trip Map" 
                    className="w-full h-full object-cover filter brightness-95"
                />
                
                {/* Navigation Header Overlay */}
                <div className="absolute top-16 left-6 right-6 flex items-center gap-4 bg-slate-900/95 backdrop-blur-xl p-4 rounded-[2.2rem] border border-white/10 shadow-2xl z-50">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-slate-900 shadow-xl transition-colors ${isParcel ? 'bg-orange-500' : 'bg-white'}`}>
                        {isParcel ? <Package size={28} strokeWidth={2.5} /> : <Navigation size={28} fill="currentColor" strokeWidth={2.5} className="-rotate-45" />}
                    </div>
                    <div className="flex-1 space-y-0.5 overflow-hidden">
                        <h4 className={`text-[12px] font-black uppercase tracking-widest leading-none flex items-center gap-2 ${isParcel ? 'text-orange-400' : 'text-emerald-400'}`}>
                            {phase === 'to_pickup' ? (isParcel ? 'Picking up Parcel' : 'Heading to Pickup') : (isParcel ? 'Delivering Parcel' : 'Heading to Drop')}
                            <ArrowUpRight size={14} strokeWidth={3} />
                        </h4>
                        <p className="text-[15px] font-black text-white leading-tight truncate">
                            {phase === 'to_pickup' ? tripData.pickup : tripData.drop}
                        </p>
                    </div>
                </div>

                {/* Simulated Marker */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <motion.div 
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className={`w-12 h-12 rounded-full border-4 border-white shadow-2xl relative z-20 flex items-center justify-center text-taxi-text ${isParcel ? 'bg-orange-500' : 'bg-taxi-primary'}`}
                    >
                        {isParcel ? <Box size={24} strokeWidth={2.5} /> : <Navigation size={24} fill="currentColor" strokeWidth={3} className="rotate-45" />}
                    </motion.div>
                </div>
            </div>

            {/* Bottom Actions Panel */}
            <div className="absolute bottom-0 left-0 right-0 z-40">
                <AnimatePresence mode="wait">
                    {/* Phase: To Pickup */}
                    {phase === 'to_pickup' && (
                        <motion.div 
                            key="to_pickup"
                            initial={{ y: '100%' }}
                            animate={{ y: 0 }}
                            exit={{ y: '100%' }}
                            className="bg-white rounded-t-[3.5rem] p-8 pb-12 shadow-[0_-15px_60px_rgba(0,0,0,0.2)] border-t border-white"
                        >
                            {/* Entity Label */}
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 bg-slate-50 rounded-2xl border-2 border-slate-100 shadow-sm overflow-hidden text-3xl flex items-center justify-center">
                                         {isParcel ? '📦' : '👨🏻‍💼'}
                                    </div>
                                    <div className="space-y-0.5">
                                        <div className="flex items-center gap-2">
                                             <h4 className="text-[17px] font-black text-taxi-text tracking-tight">
                                                 {isParcel ? tripData.sender.name : tripData.user.name}
                                             </h4>
                                             {isParcel && <span className="bg-orange-50 text-orange-600 px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-widest border border-orange-100">Sender</span>}
                                        </div>
                                        <div className="flex items-center gap-1.5 opacity-60">
                                            <Star size={12} fill="#f0c419" className="text-taxi-primary" />
                                            <p className="text-[11px] font-black text-slate-400">
                                                {isParcel ? tripData.sender.rating : tripData.user.rating} • 1.2km
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-2.5">
                                    <button className="w-14 h-14 bg-white rounded-2xl border-2 border-slate-50 flex items-center justify-center text-taxi-text shadow-sm active:scale-90 transition-transform"><MessageSquare size={22} strokeWidth={2.5} /></button>
                                    <button className="w-14 h-14 bg-white rounded-2xl border-2 border-slate-50 flex items-center justify-center text-emerald-500 shadow-sm active:scale-90 transition-transform"><Phone size={22} strokeWidth={2.5} /></button>
                                </div>
                            </div>

                            <motion.button 
                                whileTap={{ scale: 0.96 }}
                                onClick={() => setPhase('otp_verification')}
                                className={`w-full h-20 rounded-[2.2rem] flex items-center justify-center gap-3 text-[20px] font-black text-taxi-text shadow-2xl border-b-4 active:border-b-0 active:translate-y-1 transition-all uppercase tracking-tight ${
                                    isParcel ? 'bg-[#fdd835] border-[#cbb31b]' : 'bg-taxi-primary border-[#d4ac14]'
                                }`}
                            >
                                {isParcel ? 'Secure Parcel' : 'I Have Arrived'} <CheckCircle2 size={24} strokeWidth={3} />
                            </motion.button>
                        </motion.div>
                    )}

                    {/* Phase: OTP Verification */}
                    {phase === 'otp_verification' && (
                        <motion.div 
                            key="otp_verification"
                            initial={{ y: '100%' }}
                            animate={{ y: 0 }}
                            exit={{ y: '100%' }}
                            className="bg-white rounded-t-[3.5rem] p-8 pb-12 shadow-[0_-15px_60px_rgba(0,0,0,0.2)] border-t border-white"
                        >
                            <div className="text-center mb-10 space-y-3">
                                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${isParcel ? 'bg-orange-50 text-orange-500 border-orange-100' : 'bg-emerald-50 text-emerald-500 border-emerald-100'}`}>
                                    Security Verification
                                </span>
                                <h3 className="text-3xl font-black text-taxi-text tracking-tight uppercase">Confirm {isParcel ? 'Sender' : 'Identity'}</h3>
                                <p className="text-[12px] font-bold text-slate-400 tracking-tight max-w-[280px] mx-auto leading-relaxed">
                                    Enter 4-digit code provided by <span className="text-taxi-text">{isParcel ? tripData.sender.name : tripData.user.name}</span> to start.
                                </p>
                            </div>

                            <div className="flex justify-center mb-12">
                                <input 
                                    type="tel"
                                    maxLength={4}
                                    autoFocus
                                    value={otp}
                                    onChange={handleOTP}
                                    className="w-64 h-22 bg-slate-50 border-4 border-slate-100 rounded-[2.5rem] text-center text-5xl font-black text-taxi-text tracking-[0.4em] focus:outline-none focus:border-taxi-primary transition-all shadow-inner placeholder:text-slate-100"
                                    placeholder="0000"
                                />
                            </div>

                            <div className="flex gap-4">
                                <button onClick={() => setPhase('to_pickup')} className="flex-1 h-16 bg-slate-50 text-slate-500 rounded-3xl text-[14px] font-black uppercase tracking-widest active:scale-95 transition-all">Go Back</button>
                                <button className="flex-1 h-16 bg-slate-900 text-white rounded-3xl text-[14px] font-black uppercase tracking-widest shadow-xl active:scale-95 transition-all">Support</button>
                            </div>
                        </motion.div>
                    )}

                    {/* Phase: In Trip / Delivering */}
                    {phase === 'in_trip' && (
                        <motion.div 
                            key="in_trip"
                            initial={{ y: '100%' }}
                            animate={{ y: 0 }}
                            exit={{ y: '100%' }}
                            className="bg-white rounded-t-[3.5rem] p-8 pb-12 shadow-[0_-15px_60px_rgba(0,0,0,0.2)] border-t border-white"
                        >
                            {/* Trip Info Header */}
                            <div className="flex items-center justify-between mb-8 group">
                                <div className="space-y-1 flex-1 pr-6">
                                    <h4 className="text-[12px] font-black text-rose-500 uppercase tracking-widest leading-none">Drop Location</h4>
                                    <p className="text-[20px] font-black text-taxi-text tracking-tight leading-tight">{tripData.drop}</p>
                                </div>
                                <button className="w-16 h-16 bg-rose-50 text-rose-500 rounded-[2rem] flex items-center justify-center shadow-sm active:scale-90 transition-transform animate-pulse border border-rose-100">
                                    <ShieldAlert size={32} strokeWidth={2.5} />
                                </button>
                            </div>

                            {/* Secondary Entity Info (Receiver for Parcel) */}
                            {isParcel && (
                                <div className="bg-slate-50 rounded-[2.5rem] p-6 mb-8 border border-slate-100 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                         <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-taxi-secondary">
                                             <User size={20} />
                                         </div>
                                         <div className="space-y-0.5">
                                             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest opacity-60">Receiver</p>
                                             <h5 className="text-[15px] font-black text-taxi-text leading-none">{tripData.receiver.name}</h5>
                                         </div>
                                    </div>
                                    <button className="w-10 h-10 bg-white rounded-xl border border-slate-100 flex items-center justify-center text-emerald-500 shadow-sm"><Phone size={18} strokeWidth={2.5} /></button>
                                </div>
                            )}

                            <motion.button 
                                whileTap={{ scale: 0.96 }}
                                onClick={() => setPhase('payment_confirm')}
                                className={`w-full h-20 rounded-[2.2rem] flex items-center justify-center gap-3 text-[20px] font-black shadow-2xl border-b-4 active:border-b-0 active:translate-y-1 transition-all uppercase tracking-tight ${
                                    isParcel ? 'bg-orange-500 text-white border-orange-700 shadow-orange-500/20' : 'bg-taxi-primary text-taxi-text border-[#d4ac14]'
                                }`}
                            >
                                {isParcel ? 'Deliver Parcel' : 'Arrived at Destination'} <ChevronRight size={24} strokeWidth={3} />
                            </motion.button>
                        </motion.div>
                    )}

                    {/* Phase: Completion / Payment */}
                    {phase === 'payment_confirm' && (
                        <motion.div 
                            key="payment_confirm"
                            initial={{ y: '100%' }}
                            animate={{ y: 0 }}
                            exit={{ y: '100%' }}
                            className="bg-white rounded-t-[3.5rem] p-8 pb-12 shadow-[0_-15px_60px_rgba(0,0,0,0.2)] border-t border-white"
                        >
                            <div className="text-center mb-8">
                                <div className={`w-20 h-20 rounded-3xl mx-auto flex items-center justify-center mb-4 shadow-xl transition-all duration-500 ${
                                    driverPaymentStatus === 'success' ? 'bg-emerald-500 text-white rotate-[360deg]' : 'bg-taxi-primary text-taxi-text'
                                }`}>
                                    {driverPaymentStatus === 'success' ? <Check size={40} strokeWidth={4} /> : <QrCode size={40} strokeWidth={2} />}
                                </div>
                                <h2 className="text-3xl font-black text-taxi-text uppercase tracking-tight">
                                    {driverPaymentStatus === 'success' ? 'Payment Verified!' : 'Collect Payment'}
                                </h2>
                                <p className="text-sm font-bold text-slate-400 mt-1">
                                    Total Fare: <span className="text-taxi-text font-black text-xl ml-2">{tripData.fare}</span>
                                </p>
                            </div>

                            {driverPaymentStatus === 'pending' && (
                                <div className="space-y-3 mb-8">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 text-center">Select Payment Mode</p>
                                    <div className="grid grid-cols-3 gap-3">
                                        {[
                                            { id: 'cash', label: 'Cash', icon: Banknote, color: 'emerald' },
                                            { id: 'online', label: 'Online', icon: Scan, color: 'blue' },
                                            { id: 'wallet', label: 'Wallet', icon: Wallet, color: 'purple' }
                                        ].map((mode) => (
                                            <button
                                                key={mode.id}
                                                onClick={() => {
                                                    setSelectedPaymentMode(mode.id);
                                                    if (mode.id === 'online') setDriverPaymentStatus('qr_generated');
                                                    else setDriverPaymentStatus('success');
                                                }}
                                                className={`flex flex-col items-center justify-center p-4 rounded-3xl border-2 transition-all active:scale-95 ${
                                                    selectedPaymentMode === mode.id ? 'border-taxi-primary bg-taxi-primary/5 shadow-inner' : 'border-slate-50 bg-slate-50/50'
                                                }`}
                                            >
                                                <mode.icon size={26} className={mode.id === selectedPaymentMode ? `text-${mode.color}-600` : `text-slate-400`} strokeWidth={2.5} />
                                                <span className="text-[11px] font-black text-taxi-text uppercase tracking-tight mt-2">{mode.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {driverPaymentStatus === 'qr_generated' && (
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="bg-slate-900 rounded-[2.5rem] p-8 mb-8 text-center relative overflow-hidden group shadow-2xl"
                                >
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-taxi-primary to-transparent animate-pulse" />
                                    <div className="bg-white p-5 rounded-[2rem] inline-block mb-4 shadow-2xl relative">
                                        <div className="w-40 h-40 bg-slate-50 flex items-center justify-center relative overflow-hidden rounded-xl border border-slate-100">
                                            <QrCode size={120} className="text-slate-900 opacity-90" strokeWidth={1.5} />
                                            {/* Scanning Line Animation */}
                                            <motion.div 
                                                animate={{ top: ['0%', '100%', '0%'] }}
                                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                                className="absolute left-0 w-full h-0.5 bg-taxi-primary shadow-[0_0_10px_#fdd835]"
                                            />
                                        </div>
                                    </div>
                                    <h3 className="text-white font-black text-xl tracking-tight mb-1">Scan & Pay {tripData.fare}</h3>
                                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] opacity-60">UPI • Cards • Wallets</p>
                                    
                                    <button 
                                        onClick={() => setDriverPaymentStatus('success')}
                                        className="mt-8 w-full py-4 bg-white/10 hover:bg-white/20 text-white rounded-2xl text-[12px] font-black uppercase tracking-widest transition-all active:scale-[0.98] border border-white/5"
                                    >
                                        I've Received Payment
                                    </button>
                                </motion.div>
                            )}

                            {driverPaymentStatus === 'success' && (
                                <motion.div 
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    className="bg-emerald-50 border-2 border-emerald-100 rounded-[2.5rem] p-6 mb-8 flex items-center gap-5 shadow-sm"
                                >
                                    <div className="w-14 h-14 bg-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-200">
                                        <CheckCircle2 size={28} strokeWidth={3} />
                                    </div>
                                    <div>
                                        <h4 className="font-black text-emerald-900 uppercase text-sm tracking-tight">Success!</h4>
                                        <p className="text-[11px] font-bold text-emerald-600 uppercase tracking-widest opacity-80">
                                            {selectedPaymentMode === 'cash' ? 'Cash Collected' : selectedPaymentMode === 'wallet' ? 'Settled from Wallet' : 'Online Payment Received'}
                                        </p>
                                    </div>
                                </motion.div>
                            )}

                            <motion.button 
                                whileTap={{ scale: 0.96 }}
                                disabled={driverPaymentStatus !== 'success'}
                                onClick={() => setPhase('review')}
                                className={`w-full h-20 rounded-[2.5rem] flex items-center justify-center gap-4 text-[20px] font-black transition-all uppercase tracking-tight shadow-2xl ${
                                    driverPaymentStatus === 'success' 
                                    ? 'bg-slate-900 text-white active:scale-95' 
                                    : 'bg-slate-100 text-slate-300 cursor-not-allowed'
                                }`}
                            >
                                {driverPaymentStatus === 'success' ? 'Finalize Earnings' : 'Awaiting Payment'} 
                                <ChevronRight size={24} strokeWidth={3} className={driverPaymentStatus === 'success' ? 'text-taxi-primary' : 'text-slate-200'} />
                            </motion.button>
                        </motion.div>
                    )}

                    {/* Mutual Review */}
                    {phase === 'review' && (
                        <motion.div 
                            key="review"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-white rounded-t-[3.5rem] p-10 pb-12 shadow-[0_-15px_60px_rgba(0,0,0,0.2)] border-t border-white text-center"
                        >
                             <div className="mb-12 space-y-6">
                                <div className="w-28 h-28 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-5xl shadow-inner border border-slate-100">
                                     {isParcel ? '🤵🏻' : '🤵🏻‍♂️'}
                                </div>
                                <div className="space-y-1">
                                    <h3 className="text-2xl font-black text-taxi-text tracking-tight uppercase">Rate {isParcel ? tripData.sender.name : tripData.user.name}</h3>
                                    <p className="text-[13px] font-bold text-slate-400">Share your experience with the partner.</p>
                                </div>
                                <div className="flex justify-center gap-3">
                                     {[1,2,3,4,5].map(s => (
                                        <motion.div
                                            key={s}
                                            whileHover={{ scale: 1.2 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => setSelectedRating(s)}
                                            className="cursor-pointer"
                                        >
                                            <Star
                                                size={40}
                                                className={`transition-all ${s <= selectedRating ? 'text-taxi-primary' : 'text-slate-200'}`}
                                                fill={s <= selectedRating ? '#f0c419' : 'transparent'}
                                                strokeWidth={2}
                                            />
                                        </motion.div>
                                     ))}
                                </div>
                                {selectedRating > 0 && (
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="text-[12px] font-black text-emerald-500 uppercase tracking-widest"
                                    >
                                        {selectedRating === 5 ? '⭐ Excellent!' : selectedRating >= 3 ? '👍 Good!' : '📝 Could be better'}
                                    </motion.p>
                                )}
                             </div>

                             <motion.button 
                                whileTap={{ scale: 0.96 }}
                                onClick={() => navigate('/taxi/driver/dashboard')}
                                className="w-full h-20 bg-taxi-primary rounded-[2.5rem] flex items-center justify-center gap-4 text-[20px] font-black text-taxi-text shadow-xl border border-taxi-primary/80 active:scale-95 transition-all tracking-tight uppercase"
                             >
                                Finalize Session <Check size={28} strokeWidth={4} />
                             </motion.button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default ActiveTrip;
