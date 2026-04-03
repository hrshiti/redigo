import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronRight, Share2, Smartphone, ShieldCheck, Check, Loader2 } from 'lucide-react';
import { driverService } from '../../services/driverService';

const DriverAuth = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState('phone'); // 'phone' or 'otp'
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [timer, setTimer] = useState(30);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        let interval;
        if (step === 'otp' && timer > 0) {
            interval = setInterval(() => setTimer((t) => t - 1), 1000);
        }
        return () => clearInterval(interval);
    }, [step, timer]);

    const handleSendOtp = async () => {
        if (phoneNumber.length !== 10) return;
        setLoading(true);
        setError('');
        try {
            const res = await driverService.sendOtp(phoneNumber);
            if (res.success) {
                setStep('otp');
                setTimer(30);
            } else {
                setError(res.message || 'Failed to send OTP');
            }
        } catch (err) {
            setError(err.message || 'Network error');
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async () => {
        const fullOtp = otp.join('');
        if (fullOtp.length < 6) return;
        setLoading(true);
        setError('');
        try {
            const res = await driverService.validateOtp(phoneNumber, fullOtp);
            if (res.success || res.token || res.access_token) {
                const token = res.token || res.access_token || res.data?.token;
                const driver = res.user || res.data?.user || res.driver || res.data?.driver;
                
                if (token) {
                    localStorage.setItem('token', token);
                    if (driver) localStorage.setItem('userInfo', JSON.stringify(driver));
                    
                    // If driver is already approved, go to dashboard
                    if (driver?.approve) {
                        navigate('/taxi/driver/dashboard');
                    } else {
                        navigate('/taxi/driver/dashboard-reg');
                    }
                } else {
                    // Registration flow
                    navigate('/taxi/driver/dashboard-reg', { state: { phone: phoneNumber } });
                }
            } else {
                setError(res.message || 'Invalid OTP');
            }
        } catch (err) {
            setError(err.message || 'Verification failed');
        } finally {
            setLoading(false);
        }
    }

    const handleOtpChange = (index, value) => {
        if (isNaN(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value.substring(value.length - 1);
        setOtp(newOtp);
        if (value && index < 5) {
            document.getElementById(`otp-${index + 1}`).focus();
        }
    };

    const handleBack = () => {
        if (step === 'otp') setStep('phone');
        else navigate(-1);
    };

    return (
        <div className="min-h-screen bg-taxi-bg font-sans select-none overflow-x-hidden p-6 flex flex-col">
            {/* Simple Header */}
            <header className="flex items-center justify-between mb-8">
                <button 
                    onClick={handleBack}
                    className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center text-taxi-text active:scale-90 transition-transform"
                >
                    <ArrowLeft size={20} strokeWidth={2.5} />
                </button>
                <div className="text-center">
                    <h1 className="text-xl font-black text-taxi-text tracking-tight uppercase">Partner Login</h1>
                </div>
                <div className="w-12" />
            </header>

            <AnimatePresence mode="wait">
                {step === 'phone' ? (
                    <motion.div 
                        key="phone-step"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="flex-1 space-y-10 flex flex-col pt-10"
                    >
                        <div className="space-y-2">
                            <h2 className="text-2xl font-black text-taxi-text leading-tight tracking-tight">
                                Enter your<br />mobile number
                            </h2>
                            <p className="text-[14px] font-bold text-slate-400">
                                We'll send you an OTP to verify your identity.
                            </p>
                        </div>

                        <div className="space-y-2">
                             <div className="relative group">
                                 <div className="absolute left-6 top-1/2 -translate-y-1/2 flex items-center gap-2 pr-3 border-r border-slate-200">
                                     <span className="text-[16px] font-black text-taxi-text">+91</span>
                                 </div>
                                 <input 
                                    type="tel"
                                    maxLength={10}
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    placeholder="00000 00000"
                                    className="w-full h-14 bg-white border-2 border-slate-100 rounded-2xl pl-16 pr-6 text-xl font-black text-taxi-text focus:outline-none focus:border-taxi-primary transition-all font-mono placeholder:text-slate-200 shadow-sm"
                                 />
                             </div>
                             <div className="flex items-center gap-2 pl-4 pt-2">
                                 <ShieldCheck size={14} className="text-emerald-500" />
                                 <p className="text-[11px] font-bold text-slate-400">Secure & encrypted connection</p>
                             </div>
                        </div>

                        <div className="flex-1" />

                        {error && (
                            <p className="text-red-500 text-[12px] font-bold text-center bg-red-50 py-2 rounded-lg">{error}</p>
                        )}

                        <motion.button 
                            whileTap={{ scale: 0.96 }}
                            disabled={phoneNumber.length !== 10 || loading}
                            onClick={handleSendOtp}
                            className={`w-full h-14 rounded-2xl flex items-center justify-center gap-3 text-[17px] font-black shadow-xl transition-all tracking-tight uppercase ${
                                phoneNumber.length === 10 && !loading
                                ? 'bg-taxi-primary text-taxi-text border border-taxi-primary/80' 
                                : 'bg-slate-100 text-slate-400 border border-slate-200 grayscale cursor-not-allowed'
                            }`}
                        >
                            {loading ? <Loader2 size={24} className="animate-spin" /> : <>Next Step <ChevronRight size={20} strokeWidth={3} /></>}
                        </motion.button>
                    </motion.div>
                ) : (
                    <motion.div 
                        key="otp-step"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="flex-1 space-y-10 flex flex-col pt-10"
                    >
                        <div className="space-y-2">
                            <h2 className="text-2xl font-black text-taxi-text leading-tight tracking-tight">
                                Verify your<br />identity
                            </h2>
                            <p className="text-[14px] font-bold text-slate-400">
                                Enter the 6-digit code sent to<br />
                                <span className="text-taxi-text">+91 {phoneNumber}</span>
                            </p>
                        </div>

                        <div className="flex gap-2.5 justify-center">
                            {otp.map((digit, index) => (
                                <input 
                                    key={index}
                                    id={`otp-${index}`}
                                    type="tel"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleOtpChange(index, e.target.value)}
                                    className="w-11 h-14 bg-white border-2 border-slate-100 rounded-xl text-center text-xl font-black text-taxi-text focus:outline-none focus:border-taxi-primary transition-all shadow-sm"
                                />
                            ))}
                        </div>

                        <div className="text-center pt-2">
                            {timer > 0 ? (
                                <p className="text-[13px] font-bold text-slate-400 uppercase tracking-widest">
                                    Resend code in <span className="text-taxi-text">{timer}s</span>
                                </p>
                            ) : (
                                <button className="text-[13px] font-black text-blue-600 uppercase tracking-widest hover:underline active:scale-95 transition-transform">
                                    Resend OTP now
                                </button>
                            )}
                        </div>

                        <div className="flex-1" />

                        {error && (
                            <p className="text-red-500 text-[12px] font-bold text-center bg-red-50 py-2 rounded-lg">{error}</p>
                        )}

                        <motion.button 
                            whileTap={{ scale: 0.96 }}
                            disabled={loading}
                            onClick={handleVerifyOtp}
                            className={`w-full h-14 bg-taxi-primary text-taxi-text py-4 rounded-2xl flex items-center justify-center gap-3 text-[17px] font-black shadow-xl border border-taxi-primary/80 active:scale-95 transition-all tracking-tight uppercase ${loading ? 'opacity-70' : ''}`}
                        >
                            {loading ? <Loader2 size={24} className="animate-spin" /> : <>Confirm Identity <Check size={20} strokeWidth={3} /></>}
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default DriverAuth;
