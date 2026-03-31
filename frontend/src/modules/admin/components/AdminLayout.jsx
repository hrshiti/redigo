import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { 
  BarChart3, 
  Users, 
  Car, 
  Settings, 
  LogOut, 
  Menu, 
  Bell,
  Search,
  IndianRupee,
  ShieldAlert,
  Layers,
  MapPin,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  Package,
  Command
} from 'lucide-react';

const SidebarItem = ({ icon: Icon, label, path, isCollapsed }) => (
  <NavLink
    to={path}
    className={({ isActive }) =>
      `flex items-center gap-3 px-3.5 py-2.5 rounded-lg transition-all duration-200 group ${
        isActive 
          ? 'bg-white/10 text-white' 
          : 'text-gray-400 hover:text-white hover:bg-white/5'
      }`
    }
  >
    <Icon size={18} className="shrink-0" />
    {!isCollapsed && <span className="font-semibold text-[13px] tracking-tight">{label}</span>}
  </NavLink>
);

const SidebarGroup = ({ icon: Icon, label, subItems, isCollapsed }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="space-y-1">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg transition-all duration-200 group text-gray-400 hover:text-white hover:bg-white/5`}
      >
        <div className="flex items-center gap-3">
          <Icon size={18} className="shrink-0" />
          {!isCollapsed && <span className="font-semibold text-[13px] tracking-tight">{label}</span>}
        </div>
        {!isCollapsed && (
          <ChevronRight size={14} className={`transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`} />
        )}
      </button>
      
      {!isCollapsed && isOpen && (
        <div className="pl-9 pr-2 space-y-1 mt-1">
           {subItems.map((item, idx) => (
              <NavLink
                key={idx}
                to={item.path}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-lg text-[12px] font-medium transition-all ${
                    isActive ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
                  }`
                }
              >
                <span className="flex items-center gap-2">
                   <div className="w-1 h-1 rounded-full bg-gray-500"></div>
                   {item.label}
                </span>
              </NavLink>
           ))}
        </div>
      )}
    </div>
  );
};

const AdminLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isCollapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { icon: BarChart3, label: 'Dashboard', path: '/admin/dashboard' },
    { 
       icon: Users, 
       label: 'Passenger Mgmt', 
       subItems: [
         { label: 'Passenger List', path: '/admin/users' },
         { label: 'Delete Requests', path: '/admin/users/delete-requests' },
         { label: 'Bulk Upload', path: '/admin/users/bulk-upload' },
       ]
    },
    { 
       icon: Car, 
       label: 'Driver Mgmt', 
       subItems: [
         { label: 'Approved Drivers', path: '/admin/drivers' },
         { label: 'Pending Approvals', path: '/admin/drivers/pending' },
         { label: 'Driver Wallet', path: '/admin/drivers/wallet' },
         { label: 'Verification Docs', path: '/admin/drivers/documents' },
       ]
    },
    { icon: MapPin, label: 'Geo Fencing', path: '/admin/geo' },
    { icon: IndianRupee, label: 'Pricing', path: '/admin/pricing' },
    { icon: Layers, label: 'Finance', path: '/admin/finance' },
    { icon: ShieldAlert, label: 'Safety (SOS)', path: '/admin/safety' },
    { icon: Package, label: 'App CMS', path: '/admin/cms' },
  ];

  return (
    <div className="flex min-h-screen bg-[#F8F9FA] font-sans text-gray-900 overflow-hidden">
      {/* SIDEBAR - Dark Theme (Match 'Mate' Image) */}
      <aside 
        className={`bg-[#0F172A] border-r border-white/5 transition-all duration-300 flex flex-col relative z-50 ${
          isCollapsed ? 'w-20' : 'w-64'
        } ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="h-20 flex items-center px-6 justify-between border-b border-white/5">
             <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center text-white">
                   <Command size={20} />
                </div>
                {!isCollapsed && <span className="text-lg font-bold tracking-tight text-white">Redigo</span>}
             </div>
             <button 
                onClick={() => setCollapsed(!isCollapsed)}
                className="text-gray-400 hover:text-white p-1 hover:bg-white/10 rounded-md transition-all hidden lg:block"
             >
                {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
             </button>
          </div>

          {/* Search Placeholder in Sidebar */}
          {!isCollapsed && (
            <div className="px-4 mt-6 mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={14} />
                <input 
                  type="text" 
                  placeholder="Search" 
                  className="w-full bg-white/5 border-none rounded-lg py-2 pl-9 pr-4 text-[12px] text-white placeholder:text-gray-500 focus:ring-1 focus:ring-white/20"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-gray-600 bg-white/5 px-1 rounded">⌘F</span>
              </div>
            </div>
          )}

          {/* Navigation Links */}
          <nav className="flex-1 px-3 mt-4 space-y-1 overflow-y-auto no-scrollbar">
            {menuItems.map((item, idx) => (
              item.subItems ? (
                <SidebarGroup key={idx} {...item} isCollapsed={isCollapsed} />
              ) : (
                <SidebarItem key={idx} {...item} isCollapsed={isCollapsed} />
              )
            ))}
            
            <div className={`mt-8 mb-4 px-3 text-[10px] font-bold text-gray-500 tracking-widest uppercase ${isCollapsed ? 'text-center' : ''}`}>
               {isCollapsed ? '...' : 'System'}
            </div>
            
            <SidebarItem icon={Bell} label="Notifications" path="/admin/notifications" isCollapsed={isCollapsed} />
            <SidebarItem icon={HelpCircle} label="Help & support" path="/admin/support" isCollapsed={isCollapsed} />
            <SidebarItem icon={Settings} label="Settings" path="/admin/settings" isCollapsed={isCollapsed} />
          </nav>

          {/* User Profile Hook */}
          <div className="p-4 border-t border-white/5 mt-auto">
             <div className={`flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 cursor-pointer transition-all ${isCollapsed ? 'justify-center' : ''}`}>
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-orange-400 border-2 border-white/10 flex items-center justify-center text-white text-[10px] font-black">SA</div>
                {!isCollapsed && (
                   <div className="flex-1 min-w-0">
                      <p className="text-[12px] font-bold text-white truncate leading-tight">Super Admin</p>
                      <p className="text-[10px] text-gray-500 truncate mt-0.5">Admin Operations</p>
                   </div>
                )}
             </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-white">
        {/* HEADER - Transparent & Minimal */}
        <header className="h-12 flex items-center justify-between px-8 mt-4 sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">Dashboard</h2>
          </div>

          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 bg-gray-50 border border-gray-200 px-4 py-1.5 rounded-lg text-[13px] font-bold text-gray-700 hover:bg-gray-100 transition-all">
               Filter Data
            </button>
            <button className="flex items-center gap-2 bg-black text-white px-4 py-1.5 rounded-lg text-[13px] font-bold hover:opacity-90 transition-all shadow-sm">
               Generate Report
            </button>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 overflow-y-auto no-scrollbar scroll-smooth">
          <div className="p-8 pb-20">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

