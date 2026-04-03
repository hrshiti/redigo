import React, { useState, useEffect, useRef } from 'react';
import { 
  Plus, Search, MapPin, Globe, Trash2, Edit2, 
  Map as MapIcon, Navigation, Save, ArrowLeft, 
  Loader2, Zap, Target, Maximize2 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  GoogleMap, useJsApiLoader, DrawingManager, Polygon 
} from '@react-google-maps/api';

const libraries = ['drawing', 'places'];
const mapContainerStyle = {
  width: '100%',
  height: '600px',
  borderRadius: '40px'
};

const ZoneManagement = () => {
  const [view, setView] = useState('list'); // 'list' or 'create'
  const [zones, setZones] = useState([]);
  const [serviceLocations, setServiceLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [enablePeakZoneGlobal, setEnablePeakZoneGlobal] = useState(true);
  const [editingId, setEditingId] = useState(null);

  // Map & Drawing States
  const [polygonCoords, setPolygonCoords] = useState([]);
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries
  });

  // Form State
  const [formData, setFormData] = useState({
    service_location_id: '',
    name: { English: '', Arabic: '', French: '', Spanish: '' },
    unit: 'km',
    peak_zone_ride_count: '',
    peak_zone_radius: '',
    peak_zone_selection_duration: '',
    peak_zone_duration: '',
    peak_zone_surge_percentage: '',
    status: 'active'
  });

  const token = localStorage.getItem('adminToken') || '';
  const baseUrl = 'https://taxi-a276.onrender.com/api/v1/admin';

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch Zones
      const zoneRes = await fetch(`${baseUrl}/zones`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (zoneRes.ok) {
        const data = await zoneRes.json();
        if (data.success) {
          setZones(Array.isArray(data.data) ? data.data : (data.data?.results || []));
        }
      }

      // Fetch Service Locations
      const slRes = await fetch(`${baseUrl}/service-locations`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (slRes.ok) {
        const slData = await slRes.json();
        if (slData.success) {
          setServiceLocations(Array.isArray(slData.data) ? slData.data : (slData.data?.results || []));
        }
      }
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onPolygonComplete = (polygon) => {
    const coords = polygon.getPath().getArray().map(p => ({
      lat: p.lat(),
      lng: p.lng()
    }));
    setPolygonCoords(coords);
    polygon.setMap(null);
  };

  const handleSave = async () => {
    if (!formData.service_location_id || !formData.name.English || polygonCoords.length === 0) {
      alert("Please complete the form and draw a zone boundary.");
      return;
    }

    setSaving(true);
    try {
      const zoneId = editingId;
      const url = zoneId ? `${baseUrl}/zones/${zoneId}` : `${baseUrl}/zones`;
      const method = zoneId ? 'PATCH' : 'POST';

      const payload = {
        ...formData,
        coordinates: polygonCoords,
        name: formData.name.English
      };

      const res = await fetch(url, {
        method,
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      
      const data = await res.json();
      if (data.success) {
        setView('list');
        setEditingId(null);
        fetchData();
        setFormData({
          service_location_id: '',
          name: { English: '', Arabic: '', French: '', Spanish: '' },
          unit: 'km',
          peak_zone_ride_count: '',
          peak_zone_radius: '',
          peak_zone_selection_duration: '',
          peak_zone_duration: '',
          peak_zone_surge_percentage: '',
          status: 'active'
        });
        setPolygonCoords([]);
      } else {
        alert(data.message || "Operation failed");
      }
    } catch (err) {
      console.error("Save error:", err);
    } finally {
      setSaving(false);
    }
  };

  const handleStatusToggle = async (zoneId, currentIsActive) => {
    const newActiveState = !currentIsActive;
    
    // Optimistic Update
    setZones(prev => prev.map(z => (z._id === zoneId || z.id === zoneId) ? { ...z, active: newActiveState } : z));

    try {
      const res = await fetch(`${baseUrl}/zones/${zoneId}`, {
        method: 'PATCH',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ active: newActiveState })
      });
      if (!res.ok) {
        // Rollback
        setZones(prev => prev.map(z => (z._id === zoneId || z.id === zoneId) ? { ...z, active: currentIsActive } : z));
        alert("Failed to update status");
      }
    } catch (err) {
      setZones(prev => prev.map(z => (z._id === zoneId || z.id === zoneId) ? { ...z, active: currentIsActive } : z));
    }
  };

  const handleDelete = async (zoneId) => {
    if (!window.confirm("Are you sure you want to delete this zone?")) return;
    try {
      const res = await fetch(`${baseUrl}/zones/${zoneId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setZones(prev => prev.filter(z => (z._id !== zoneId && z.id !== zoneId)));
      } else {
        alert("Delete failed");
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const handleEdit = (zone) => {
    console.log("Editing Zone Data:", zone);
    const zid = zone._id || zone.id;
    if (!zid) {
      console.warn("Zone ID missing, edit might fail.");
    }
    
    setEditingId(zid);
    
    // Safety check for name
    let zoneName = '';
    if (typeof zone.name === 'string') {
      zoneName = zone.name;
    } else if (zone.name && zone.name.English) {
      zoneName = zone.name.English;
    } else if (zone.zone_name) {
      zoneName = zone.zone_name;
    }

    setFormData({
      service_location_id: zone.service_location_id || '',
      name: { 
        English: zoneName,
        Arabic: '', French: '', Spanish: '' 
      },
      unit: zone.unit || 'km',
      peak_zone_ride_count: zone.peak_zone_ride_count || '',
      peak_zone_radius: zone.peak_zone_radius || '',
      peak_zone_selection_duration: zone.peak_zone_selection_duration || '',
      peak_zone_duration: zone.peak_zone_duration || '',
      peak_zone_surge_percentage: zone.peak_zone_surge_percentage || '',
      status: zone.active ? 'active' : 'inactive'
    });

    // Parse coordinates safely
    let parsedCoords = [];
    if (Array.isArray(zone.coordinates)) {
      parsedCoords = zone.coordinates.map(coord => {
        // Handle [lng, lat] array or {lat, lng} object
        if (Array.isArray(coord)) return { lat: coord[1], lng: coord[0] };
        if (coord && typeof coord === 'object') return { lat: Number(coord.lat), lng: Number(coord.lng) };
        return coord;
      });
    }
    
    setPolygonCoords(parsedCoords);
    setView('create');
  };

  const handleViewInMap = (zone) => {
    handleEdit(zone);
  };

  const StatusToggle = ({ active, onToggle }) => (
    <button 
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
      className={`relative w-12 h-6 rounded-full transition-all duration-300 ${active ? 'bg-emerald-500 shadow-inner' : 'bg-gray-200'}`}
    >
      <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-lg transition-transform duration-300 ${active ? 'translate-x-6' : ''}`} />
    </button>
  );

  return (
    <div className="space-y-6 min-h-screen pb-20">
      <AnimatePresence mode="wait">
        {view === 'list' ? (
          <motion.div 
            key="list"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm">
               <div>
                  <h1 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
                     <Target className="text-indigo-600" size={32} />
                     Zone Management
                  </h1>
                  <p className="text-gray-500 text-[14px] font-medium mt-1">Configure and oversee operational geofenced sectors</p>
               </div>
               <button 
                 onClick={() => {
                   setEditingId(null);
                   setFormData({
                     service_location_id: '',
                     name: { English: '', Arabic: '', French: '', Spanish: '' },
                     unit: 'km',
                     peak_zone_ride_count: '',
                     peak_zone_radius: '',
                     peak_zone_selection_duration: '',
                     peak_zone_duration: '',
                     peak_zone_surge_percentage: '',
                     status: 'active'
                   });
                   setPolygonCoords([]);
                   setView('create');
                 }}
                 className="bg-[#0F172A] text-white px-8 py-4 rounded-2xl font-black text-sm flex items-center gap-2 hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 active:scale-95"
               >
                 <Plus size={20} /> Add Market Zone
               </button>
            </div>

            {/* Peak Toggle */}
            <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm flex items-center justify-between group">
               <div className="flex items-center gap-5">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${enablePeakZoneGlobal ? 'bg-amber-100 text-amber-600' : 'bg-gray-100 text-gray-400'}`}>
                     <Zap size={28} className={enablePeakZoneGlobal ? 'animate-pulse' : ''} />
                  </div>
                  <div>
                     <p className="text-lg font-black text-gray-900">Enable Peak Zone</p>
                     <p className="text-[12px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">Toggle dynamic pricing modifiers globally</p>
                  </div>
               </div>
               <StatusToggle active={enablePeakZoneGlobal} onToggle={() => setEnablePeakZoneGlobal(!enablePeakZoneGlobal)} />
            </div>

            {/* Table */}
            <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden min-h-[600px]">
               <div className="p-6 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
                  <div className="relative w-96">
                     <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                     <input 
                       type="text" 
                       placeholder="Search zones by identifier..." 
                       className="w-full bg-white border border-gray-200 rounded-2xl py-3 pl-12 pr-6 text-[14px] focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all font-black placeholder:text-gray-300"
                     />
                  </div>
                  <button className="flex items-center gap-2 bg-rose-50 text-rose-600 px-6 py-3 rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-rose-100 transition-all">
                     <Trash2 size={16} /> Bulk Delete
                  </button>
               </div>

               {loading ? (
                 <div className="flex flex-col items-center justify-center h-[500px] gap-6">
                    <Loader2 className="animate-spin text-indigo-600" size={48} />
                    <p className="text-gray-400 font-bold uppercase tracking-widest text-[12px]">Acquiring Spatial Data...</p>
                 </div>
               ) : zones.length > 0 ? (
                 <div className="overflow-x-auto">
                    <table className="w-full text-left border-separate border-spacing-0">
                       <thead>
                          <tr className="bg-white">
                             <th className="px-8 py-6 text-[11px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50 text-center w-24">S.No</th>
                             <th className="px-8 py-6 text-[11px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50">Market Zone Identity</th>
                             <th className="px-8 py-6 text-[11px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50 text-center">Status</th>
                             <th className="px-8 py-6 text-[11px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50 text-right">Actions</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-gray-50">
                          {zones.map((zone, idx) => {
                             const zid = zone._id || zone.id;
                             return (
                                <tr key={zid || idx} className="hover:bg-indigo-50/30 transition-all group">
                                   <td className="px-8 py-6 text-center">
                                      <span className="text-[14px] font-black text-gray-400">{(idx + 1).toString().padStart(2, '0')}</span>
                                   </td>
                                   <td className="px-8 py-6">
                                      <div className="flex items-center gap-4">
                                         <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-all">
                                            <MapIcon size={22} />
                                         </div>
                                         <span className="text-[16px] font-black text-gray-900 tracking-tight">{zone.name || zone.zone_name}</span>
                                      </div>
                                   </td>
                                   <td className="px-8 py-6">
                                      <div className="flex justify-center">
                                         <StatusToggle 
                                           active={zone.active === true || zone.status === 'active'} 
                                           onToggle={() => handleStatusToggle(zid, zone.active)} 
                                         />
                                      </div>
                                   </td>
                                   <td className="px-8 py-6 text-right">
                                      <div className="flex items-center justify-end gap-3">
                                         <button 
                                           onClick={() => handleEdit(zone)}
                                           className="p-3 bg-amber-50 text-amber-600 rounded-2xl hover:bg-amber-100 transition-all active:scale-90 shadow-sm"
                                         >
                                           <Edit2 size={18} />
                                         </button>
                                         <button 
                                           onClick={() => handleViewInMap(zone)}
                                           className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl hover:bg-indigo-100 transition-all active:scale-90 shadow-sm"
                                         >
                                           <Globe size={18} />
                                         </button>
                                         <button 
                                           onClick={() => handleDelete(zid)}
                                           className="p-3 bg-rose-50 text-rose-600 rounded-2xl hover:bg-rose-100 transition-all active:scale-90 shadow-sm"
                                         >
                                           <Trash2 size={18} />
                                         </button>
                                      </div>
                                   </td>
                                </tr>
                             );
                          })}
                       </tbody>
                    </table>
                 </div>
               ) : (
                 <div className="flex flex-col items-center justify-center h-[500px] text-center">
                    <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center text-slate-200 mb-8">
                       <Navigation size={48} strokeWidth={1} />
                    </div>
                    <h3 className="text-xl font-black text-slate-900 tracking-tight">No Market Zones Configured</h3>
                    <p className="text-slate-400 text-[14px] max-w-xs mt-3 font-medium px-4 leading-relaxed">Map your operational sector boundaries to initiate geofencing and dynamic pricing.</p>
                 </div>
               )}
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="create"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="space-y-6 pb-20"
          >
             {/* Form Header */}
             <div className="flex items-center justify-between bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm">
                <div className="flex items-center gap-5">
                   <button 
                     onClick={() => {
                        setView('list');
                        setEditingId(null);
                     }}
                     className="p-4 bg-gray-50 rounded-2xl hover:bg-indigo-50 transition-all text-gray-400 hover:text-indigo-600 active:scale-90"
                   >
                      <ArrowLeft size={24} />
                   </button>
                   <div>
                      <h2 className="text-2xl font-black text-gray-1000 tracking-tight">
                        {editingId ? 'Edit Configuration: ' + (formData.name.English || 'Sector') : 'Calibrate New Market Zone'}
                      </h2>
                      <p className="text-[12px] font-bold text-gray-400 uppercase tracking-widest mt-1">
                        {editingId ? 'Updating geofenced boundary and parameters' : 'Mapping geospatial operational limits'}
                      </p>
                   </div>
                </div>
                <button 
                  onClick={handleSave}
                  disabled={saving}
                  className="bg-[#0F172A] text-white px-10 py-4 rounded-2xl font-black text-sm flex items-center gap-3 hover:bg-slate-800 transition-all shadow-2xl active:scale-95 disabled:opacity-50"
                >
                  {saving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                  {editingId ? 'Update Zone' : 'Finalize Boundary'}
                </button>
             </div>

             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
               {/* Config Column */}
               <div className="lg:col-span-1 space-y-6">
                  <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm space-y-8">
                     <div className="space-y-3">
                        <label className="text-[12px] font-black text-gray-400 uppercase tracking-widest ml-1">Market Location *</label>
                        <select 
                          value={formData.service_location_id}
                          onChange={(e) => setFormData({...formData, service_location_id: e.target.value})}
                          className="w-full bg-slate-50 border-none rounded-2xl py-4.5 px-6 text-[15px] font-bold text-gray-900 focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-inner appearance-none placeholder:text-gray-300"
                        >
                           <option value="">Select city/area...</option>
                           {serviceLocations.map(sl => (
                              <option key={sl._id || sl.id} value={sl._id || sl.id}>{sl.name || sl.service_location_name}</option>
                           ))}
                        </select>
                     </div>

                     <div className="space-y-3">
                        <label className="text-[12px] font-black text-gray-400 uppercase tracking-widest ml-1">Sector Name (En)</label>
                        <input 
                          type="text" 
                          placeholder="e.g. Uptown Alpha" 
                          value={formData.name.English}
                          onChange={(e) => setFormData({...formData, name: { ...formData.name, English: e.target.value }})}
                          className="w-full bg-slate-50 border-none rounded-2xl py-4.5 px-6 text-[15px] font-bold text-gray-900 focus:ring-4 focus:ring-indigo-500/10 transition-all placeholder:text-gray-300 shadow-inner"
                        />
                     </div>

                     <div className="space-y-3">
                        <label className="text-[12px] font-black text-gray-400 uppercase tracking-widest ml-1">Distance Unit</label>
                        <div className="grid grid-cols-2 gap-3 bg-slate-50 p-2 rounded-2xl shadow-inner border border-gray-100">
                           <button 
                             onClick={() => setFormData({...formData, unit: 'km'})}
                             className={`py-3 rounded-xl text-[12px] font-black transition-all ${formData.unit === 'km' ? 'bg-white text-indigo-600 shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}
                           >
                             METRIC (KM)
                           </button>
                           <button 
                             onClick={() => setFormData({...formData, unit: 'miles'})}
                             className={`py-3 rounded-xl text-[12px] font-black transition-all ${formData.unit === 'miles' ? 'bg-white text-indigo-600 shadow-lg' : 'text-slate-400 hover:text-slate-600'}`}
                           >
                             IMPERIAL (MI)
                           </button>
                        </div>
                     </div>
                  </div>

                  <div className="bg-indigo-600 p-8 rounded-[40px] text-white shadow-2xl shadow-indigo-100 flex items-start gap-4">
                     <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center shrink-0">
                        <Navigation size={24} className="animate-pulse" />
                     </div>
                     <div className="space-y-2">
                        <p className="text-[11px] font-black uppercase tracking-[0.2em] opacity-60">Mapping Protocol</p>
                        <p className="text-[15px] font-bold leading-relaxed opacity-90">
                           Use the polygon tool at the top of the map to trace the exact boundary. Connect the final point to close the geofence.
                        </p>
                     </div>
                  </div>
               </div>

               {/* Drawing Map */}
               <div className="lg:col-span-2 min-h-[700px] bg-slate-900 rounded-[48px] overflow-hidden relative border-[12px] border-white shadow-2xl group">
                  {isLoaded ? (
                    <GoogleMap
                      mapContainerStyle={{ width: '100%', height: '100%' }}
                      center={polygonCoords.length > 0 ? polygonCoords[0] : { lat: 22.7196, lng: 75.8577 }}
                      zoom={14}
                      options={{
                        disableDefaultUI: false,
                        zoomControl: true,
                        streetViewControl: false,
                        mapTypeControl: false,
                        fullscreenControl: true,
                        styles: [
                          {
                            "featureType": "water",
                            "elementType": "geometry",
                            "stylers": [{"color": "#e9e9e9"}, {"lightness": 17}]
                          },
                          {
                            "featureType": "landscape",
                            "elementType": "geometry",
                            "stylers": [{"color": "#f5f5f5"}, {"lightness": 20}]
                          },
                          {
                            "featureType": "road.highway",
                            "elementType": "geometry.fill",
                            "stylers": [{"color": "#ffffff"}, {"lightness": 17}]
                          },
                          // ... more refined styles
                        ]
                      }}
                    >
                      <DrawingManager
                        onPolygonComplete={onPolygonComplete}
                        options={{
                          drawingControl: true,
                          drawingControlOptions: {
                            position: isLoaded ? window.google.maps.ControlPosition.TOP_CENTER : 0,
                            drawingModes: [isLoaded ? window.google.maps.drawing.OverlayType.POLYGON : 'polygon'],
                          },
                          polygonOptions: {
                            fillColor: '#4f46e5',
                            fillOpacity: 0.3,
                            strokeWeight: 4,
                            strokeColor: '#4f46e5',
                            clickable: true,
                            editable: true,
                            zIndex: 1
                          },
                        }}
                      />
                      {polygonCoords.length > 0 && (
                        <Polygon
                          paths={polygonCoords}
                          options={{
                            fillColor: '#4f46e5',
                            fillOpacity: 0.4,
                            strokeColor: '#4f46e5',
                            strokeWeight: 5,
                            editable: true,
                            draggable: true
                          }}
                        />
                      )}
                    </GoogleMap>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-6 bg-slate-900">
                       <Loader2 className="animate-spin text-indigo-400" size={64} />
                       <p className="text-indigo-200/50 font-black uppercase tracking-[0.3em] text-[12px]">Booting Vector Engine...</p>
                    </div>
                  )}

                  {/* Vertices Counter */}
                  <div className="absolute top-24 right-8 bg-black/40 backdrop-blur-xl px-5 py-3 rounded-2xl border border-white/10 shadow-2xl flex items-center gap-4">
                     <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center text-white">
                        <Maximize2 size={20} />
                     </div>
                     <div>
                        <p className="text-[10px] font-black text-indigo-200 uppercase tracking-widest">Vertices Locked</p>
                        <p className="text-xl font-black text-white">{polygonCoords.length}</p>
                     </div>
                  </div>
               </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ZoneManagement;
