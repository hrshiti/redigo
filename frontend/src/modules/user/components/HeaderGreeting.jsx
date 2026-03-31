import React from 'react';
import RedigoLogo from '@/assets/redigologo.png';

const HeaderGreeting = ({ name = "hritik raghuwanshi" }) => {
  return (
    <div className="pt-8 pb-3 space-y-4">
      {/* Brand Header */}
      <div className="px-4 md:px-5 flex items-center justify-between">
         <img src={RedigoLogo} alt="Redigo" className="h-8 object-contain drop-shadow-sm" />
         <div className="w-10 h-10 rounded-full border border-gray-100 p-0.5 overflow-hidden shadow-sm shrink-0">
            <img 
              src="https://ui-avatars.com/api/?name=Hritik+Raghuwanshi&background=E85D04&color=fff" 
              alt="Profile" 
              className="w-full h-full rounded-full object-cover"
            />
         </div>
      </div>

      {/* Greeting Row */}
      <div className="px-4 md:px-5">
        <h1 className="text-[17px] md:text-[19px] font-black text-gray-900 tracking-tight whitespace-nowrap overflow-hidden text-ellipsis">
          Good Morning, <span className="capitalize">{name}</span> 👋
        </h1>
      </div>
    </div>
  );
};

export default HeaderGreeting;
