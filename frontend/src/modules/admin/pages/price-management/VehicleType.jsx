import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Car, 
  ChevronRight, 
  ChevronLeft, 
  Trash2, 
  Edit2, 
  Save, 
  ArrowLeft,
  Filter,
  Image as ImageIcon,
  Upload,
  MapPin,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

const StatusToggle = ({ active, onToggle }) => (
  <button
    onClick={(e) => { e.stopPropagation(); onToggle(); }}
    className={`w-12 h-6 rounded-full transition-all duration-300 relative ${active ? 'bg-emerald-500' : 'bg-gray-300'}`}
  >
    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-300 ${active ? 'left-7' : 'left-1'}`} />
  </button>
);

const VehicleType = () => {
  const [view, setView] = useState('list'); // 'list' or 'create'
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    transport_type: 'taxi',
    dispatch_type: 'both',
    icon_types: 'taxi',
    image: null,
    status: true
  });

  const baseUrl = 'https://taxi-a276.onrender.com/api/v1/admin';
  const token = localStorage.getItem('adminToken');

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyAV4E1qGXwtxlcC7WCqSKrg1CAHTScZ_JE"
  });

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${baseUrl}/types/vehicle-types`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setVehicles(data.data.vehicle_types || []);
      }
    } catch (error) {
      console.error("Error fetching vehicles:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const method = editingId ? 'PATCH' : 'POST';
      const url = editingId ? `${baseUrl}/types/vehicle-types/${editingId}` : `${baseUrl}/types/vehicle-types`;
      
      // Use FormData for image upload
      const data = new FormData();
      data.append('name', formData.name);
      data.append('transport_type', formData.transport_type);
      data.append('dispatch_type', formData.dispatch_type);
      data.append('icon_types', formData.icon_types);
      data.append('status', formData.status);
      if (formData.image instanceof File) {
        data.append('image', formData.image);
      }

      const res = await fetch(url, {
        method,
        headers: { 'Authorization': `Bearer ${token}` },
        body: data
      });

      const result = await res.json();
      if (result.success) {
        setView('list');
        setEditingId(null);
        fetchVehicles();
      } else {
        alert(result.message || "Failed to save vehicle type");
      }
    } catch (error) {
      console.error("Error saving:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this vehicle type?")) return;
    try {
      const res = await fetch(`${baseUrl}/types/vehicle-types/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) fetchVehicles();
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  const handleEdit = (vehicle) => {
    setEditingId(vehicle._id);
    setFormData({
      name: vehicle.name,
      transport_type: vehicle.transport_type,
      dispatch_type: vehicle.dispatch_type || 'both',
      icon_types: vehicle.icon_types || 'taxi',
      image: vehicle.image,
      status: vehicle.status === undefined ? true : vehicle.status
    });
    setView('create');
  };

  const mapContainerStyle = {
    width: '100%',
    height: '400px',
    borderRadius: '24px'
  };

  const center = { lat: 22.7196, lng: 75.8577 }; // Default to Indore

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="max-w-[1600px] mx-auto p-4 lg:p-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-[#0F172A] rounded-2xl shadow-lg">
                <Car size={24} className="text-white" />
              </div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight uppercase">
                {view === 'list' ? 'Vehicle Type' : editingId ? 'Edit Vehicle Type' : 'Add New Vehicle'}
              </h1>
            </div>
            <p className="text-slate-500 font-medium text-sm ml-14">
              {view === 'list' ? 'Manage your fleet and vehicle categories' : 'Configure vehicle dispatch and visual parameters'}
            </p>
          </div>

          <div className="flex items-center gap-3 ml-14 md:ml-0">
            {view === 'list' ? (
              <button 
                onClick={() => {
                  setEditingId(null);
                  setFormData({ name: '', transport_type: 'taxi', dispatch_type: 'both', icon_types: 'taxi', image: null, status: true });
                  setView('create');
                }}
                className="group flex items-center gap-2 bg-[#0F172A] text-white px-6 py-3.5 rounded-2xl font-bold text-sm hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 active:scale-95"
              >
                <Plus size={18} className="group-hover:rotate-90 transition-transform duration-300" />
                ADD VEHICLE
              </button>
            ) : (
              <button 
                onClick={() => setView('list')}
                className="flex items-center gap-2 bg-white text-slate-600 px-6 py-3.5 rounded-2xl font-bold text-sm border border-slate-200 hover:bg-slate-50 transition-all active:scale-95"
              >
                <ArrowLeft size={18} /> BACK TO LIST
              </button>
            )}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {view === 'list' ? (
            <motion.div
              key="list"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Table Controls */}
              <div className="bg-white p-4 rounded-[28px] border border-slate-100 shadow-sm flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-[12px] font-bold">
                    <span>Show</span>
                    <select className="bg-transparent border-none focus:ring-0">
                      <option>10</option>
                      <option>25</option>
                    </select>
                    <span>entries</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 flex-1 max-w-md">
                  <div className="relative flex-1 group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      type="text" 
                      placeholder="Search vehicle..."
                      className="w-full bg-slate-50 border-slate-200 border rounded-2xl py-3 pl-12 pr-4 text-sm font-medium focus:ring-2 focus:ring-indigo-600/20"
                    />
                  </div>
                  <button className="p-3.5 bg-rose-500 text-white rounded-2xl hover:bg-rose-600 transition-all shadow-lg shadow-rose-100 flex items-center gap-2 px-6 font-bold text-sm">
                    <Filter size={18} /> FILTERS
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="bg-white rounded-[32px] border border-slate-100 shadow-xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-slate-50 text-left">
                        <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">Vehicle</th>
                        <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">Dispatch Type</th>
                        <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">Transport Type</th>
                        <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest text-center">Image</th>
                        <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest text-center">Status</th>
                        <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {loading ? (
                        [...Array(3)].map((_, i) => (
                          <tr key={i} className="animate-pulse">
                            {[...Array(6)].map((_, j) => (
                              <td key={j} className="px-8 py-6"><div className="h-4 bg-slate-100 rounded-full w-full"></div></td>
                            ))}
                          </tr>
                        ))
                      ) : vehicles.map((vehicle, idx) => (
                        <tr key={vehicle._id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-8 py-6">
                            <span className="text-sm font-bold text-slate-900">{vehicle.name}</span>
                          </td>
                          <td className="px-8 py-6">
                            <span className="text-sm font-medium text-slate-500 italic">{vehicle.dispatch_type || 'both'}</span>
                          </td>
                          <td className="px-8 py-6">
                            <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-[11px] font-black uppercase tracking-wider">{vehicle.transport_type}</span>
                          </td>
                          <td className="px-8 py-6 text-center">
                            <div className="w-12 h-12 bg-slate-50 rounded-xl mx-auto flex items-center justify-center overflow-hidden border border-slate-100">
                              {vehicle.image ? <img src={vehicle.image} alt={vehicle.name} className="w-full h-full object-contain p-2" /> : <Car size={20} className="text-slate-300" />}
                            </div>
                          </td>
                          <td className="px-8 py-6">
                            <div className="flex justify-center">
                               <StatusToggle active={vehicle.status !== false} onToggle={() => {}} />
                            </div>
                          </td>
                          <td className="px-8 py-6 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button onClick={() => handleEdit(vehicle)} className="p-2.5 bg-amber-50 text-amber-600 rounded-xl hover:bg-amber-100 transition-all active:scale-90"><Edit2 size={16} /></button>
                              <button onClick={() => handleDelete(vehicle._id)} className="p-2.5 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-100 transition-all active:scale-90"><Trash2 size={16} /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="px-8 py-5 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
                   <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Showing {vehicles.length} entries</p>
                   <div className="flex items-center gap-1">
                      <button className="p-2 text-slate-400"><ChevronLeft size={16} /></button>
                      <button className="w-8 h-8 rounded-lg bg-[#0F172A] text-white text-[12px] font-bold">1</button>
                      <button className="p-2 text-slate-400"><ChevronRight size={16} /></button>
                   </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="create"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white rounded-[40px] border border-slate-100 shadow-2xl overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2">
                
                {/* Left: Map Preview */}
                <div className="bg-slate-50 p-8 border-r border-slate-100">
                  <div className="mb-6 flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-black text-slate-900 tracking-tight uppercase">Operational Zone Preview</h3>
                      <p className="text-sm text-slate-500 font-medium">Verify vehicle availability in specific regions</p>
                    </div>
                    <div className="p-3 bg-white rounded-2xl shadow-sm"><MapPin size={20} className="text-indigo-600" /></div>
                  </div>
                  
                  {isLoaded ? (
                    <GoogleMap
                      mapContainerStyle={mapContainerStyle}
                      center={center}
                      zoom={12}
                    >
                      <Marker position={center} />
                    </GoogleMap>
                  ) : (
                    <div className="w-full h-[400px] bg-slate-200 rounded-[24px] animate-pulse"></div>
                  )}

                  <div className="mt-8 grid grid-cols-2 gap-4">
                     <div className="bg-white p-4 rounded-2xl border border-slate-200/60 shadow-sm flex items-center gap-3">
                        <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg"><CheckCircle2 size={18} /></div>
                        <span className="text-[12px] font-bold text-slate-600 uppercase tracking-tight">Active Engine</span>
                     </div>
                     <div className="bg-white p-4 rounded-2xl border border-slate-200/60 shadow-sm flex items-center gap-3">
                        <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg"><Car size={18} /></div>
                        <span className="text-[12px] font-bold text-slate-600 uppercase tracking-tight">Standard Unit</span>
                     </div>
                  </div>
                </div>

                {/* Right: Form */}
                <div className="p-8 lg:p-12 space-y-10">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                     <div className="md:col-span-2">
                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3 block">Vehicle Name *</label>
                        <input 
                          type="text" 
                          placeholder="e.g. Economy Sedan"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="w-full bg-slate-50 border-slate-200 border rounded-2xl py-4 px-5 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-indigo-600/20 transition-all outline-none" 
                        />
                     </div>

                     <div>
                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3 block">Icon Type *</label>
                        <select 
                          value={formData.icon_types}
                          onChange={(e) => setFormData({...formData, icon_types: e.target.value})}
                          className="w-full bg-slate-50 border-slate-200 border rounded-2xl py-4 px-5 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-indigo-600/20 outline-none"
                        >
                          <option value="taxi">Taxi / Cab</option>
                          <option value="auto">Auto Rikshaw</option>
                          <option value="bike">Bike / Motorcycle</option>
                          <option value="truck">Truck / Parcel</option>
                        </select>
                     </div>

                     <div>
                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3 block">Transport Type *</label>
                        <select 
                          value={formData.transport_type}
                          onChange={(e) => setFormData({...formData, transport_type: e.target.value})}
                          className="w-full bg-slate-50 border-slate-200 border rounded-2xl py-4 px-5 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-indigo-600/20 outline-none"
                        >
                          <option value="taxi">Taxi</option>
                          <option value="delivery">Delivery</option>
                        </select>
                     </div>

                     <div>
                        <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3 block">Trip Dispatch Type *</label>
                        <select 
                          value={formData.dispatch_type}
                          onChange={(e) => setFormData({...formData, dispatch_type: e.target.value})}
                          className="w-full bg-slate-50 border-slate-200 border rounded-2xl py-4 px-5 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-indigo-600/20 outline-none"
                        >
                          <option value="normal">Normal Dispatch</option>
                          <option value="bidding">Bidding System</option>
                          <option value="both">Both (Classic & Bid)</option>
                        </select>
                     </div>

                     <div className="flex flex-col justify-end pb-4">
                        <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200 border-dashed cursor-pointer hover:border-indigo-400 transition-colors">
                           <StatusToggle active={formData.status} onToggle={() => setFormData({...formData, status: !formData.status})} />
                           <span className="text-sm font-bold text-slate-700">Vehicle Status {formData.status ? '(Active)' : '(Inactive)'}</span>
                        </div>
                     </div>
                   </div>

                   {/* Image Upload Area */}
                   <div className="space-y-4">
                      <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest block">Vehicle Icon Image</label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                         <div className="md:col-span-2 relative group">
                            <input 
                              type="file" 
                              accept="image/*"
                              onChange={(e) => setFormData({...formData, image: e.target.files[0]})}
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                            />
                            <div className="w-full h-40 bg-slate-50 rounded-[32px] border-2 border-dashed border-slate-200 group-hover:border-indigo-400 flex flex-col items-center justify-center transition-all">
                               <div className="p-4 bg-white rounded-full shadow-sm mb-3 text-slate-400 group-hover:text-indigo-600">
                                  <Upload size={24} />
                               </div>
                               <p className="text-[13px] font-bold text-slate-500 uppercase tracking-tight">Drop icon or <span className="text-indigo-600 underline">Upload</span></p>
                               <p className="text-[10px] font-bold text-slate-300 mt-1 uppercase">PNG, SVG (Max 2MB)</p>
                            </div>
                         </div>
                         <div className="w-full h-40 bg-[#0F172A] rounded-[32px] flex items-center justify-center p-6 shadow-xl shadow-slate-200">
                            {formData.image ? (
                              <img src={formData.image instanceof File ? URL.createObjectURL(formData.image) : formData.image} alt="Preview" className="w-full h-full object-contain" />
                            ) : (
                              <div className="text-center">
                                <ImageIcon size={32} className="text-slate-700 mx-auto mb-2" />
                                <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Live Preview</p>
                              </div>
                            )}
                         </div>
                      </div>
                   </div>

                   <div className="pt-8 flex justify-end gap-4 border-t border-slate-100">
                      <button 
                        onClick={() => setView('list')}
                        className="px-10 py-4 text-slate-400 font-black text-sm uppercase tracking-widest hover:text-slate-600"
                      >
                        Cancel
                      </button>
                      <button 
                        onClick={handleSave}
                        className="group px-12 py-4 bg-[#0F172A] text-white rounded-2xl font-black text-sm hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 flex items-center gap-3 tracking-widest uppercase"
                      >
                        <Save size={18} />
                        {editingId ? 'Update vehicle' : 'Save vehicle type'}
                      </button>
                   </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default VehicleType;
