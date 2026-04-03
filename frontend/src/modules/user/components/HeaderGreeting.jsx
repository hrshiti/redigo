import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Wallet } from 'lucide-react';
import RedigoLogo from '@/assets/redigologo.png';

const HeaderGreeting = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('User');

  useEffect(() => {
    const info = localStorage.getItem('userInfo');
    if (info) {
      try {
        const user = JSON.parse(info);
        setUserName(user.name || user.first_name || 'User');
      } catch (e) {
        console.error("Failed to parse user info", e);
      }
    }
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="pt-6 pb-2 space-y-3">
      {/* Brand Header */}
      <div className="px-4 md:px-5 flex items-center justify-between">
         <img src={RedigoLogo} alt="Redigo" className="h-8 object-contain drop-shadow-sm" />
         <button 
           onClick={() => navigate('/wallet')}
           className="w-10 h-10 rounded-full border border-gray-100 bg-white flex items-center justify-center shadow-sm shrink-0 active:scale-95 transition-transform"
         >
            <Wallet size={20} className="text-gray-900" strokeWidth={2.5} />
         </button>
      </div>

      {/* Greeting Row */}
      <div className="px-4 md:px-5">
        <h1 className="text-[17px] md:text-[19px] font-black text-gray-900 tracking-tight whitespace-nowrap overflow-hidden text-ellipsis">
          {getGreeting()}, <span className="capitalize">{userName}</span> 👋
        </h1>
      </div>
    </div>
  );
};

export default HeaderGreeting;
