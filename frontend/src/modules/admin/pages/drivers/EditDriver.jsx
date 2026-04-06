import React, { useState, useEffect } from 'react';
import { 
  ChevronRight, 
  ArrowLeft, 
  Save, 
  X, 
  Upload, 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  Lock, 
  Users, 
  Car,
  CheckCircle2,
  AlertCircle,
  Globe
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

const EditDriver = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [locations, setLocations] = useState([]);
  const [countries, setCountries] = useState([]);
  const [transportTypes, setTransportTypes] = useState([]);
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [success, setSuccess] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const [formData, setFormData] = useState({
    area: '',
    country: '',
    name: '',
    mobile: '',
    gender: 'Male',
    email: '',
    password: '',
    confirmPassword: '',
    transportType: 'taxi',
    vehicleType: '',
    vehicleMake: '',
    vehicleModel: '',
    vehicleColor: '',
    vehicleNumber: ''
  });

  const [error, setError] = useState('');

  const providedToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5YzdiZTZhYmJlOTJlYjYwMGYwMmQxNiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwibW9iaWxlIjoiOTk5OTk5OTk5OSIsInJvbGUiOiJzdXBlci1hZG1pbiIsImlhdCI6MTc3NTA0OTExNywiZXhwIjoxODA2NTg1MTE3fQ.5KJmXJwaVefWhnc97EqtArkA1z7ZOhsJwA9fbyRVPdQ';
  const storedToken = localStorage.getItem('adminToken');
  const token = (storedToken && storedToken !== 'undefined' && storedToken !== 'null') ? storedToken : providedToken;

  useEffect(() => {
    const fetchInitialData = async () => {
      setIsFetching(true);
      try {
        
        // Fetch Service Locations
        const locRes = await fetch('https://taxi-a276.onrender.com/api/v1/admin/service-locations', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const locData = await locRes.json();
        if (locData.success || locData.data) {
          const results = locData.data?.results || locData.data || locData.results || [];
          setLocations(Array.isArray(results) ? results : []);
        }

        // Fetch Countries
        const countRes = await fetch('https://taxi-a276.onrender.com/api/v1/countries', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const countData = await countRes.json();
        if (countData.success || countData.data) {
          const results = countData.data?.results || countData.data || countData.results || [];
          setCountries(Array.isArray(results) ? results : []);
        }

        // Correct Transport Types API
        try {
          const transRes = await fetch('https://taxi-a276.onrender.com/api/v1/common/ride_modules', {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          const transData = await transRes.json();
          if (transData.success || transData.data) {
            const rawData = transData.data || transData.results || transData;
            const rawTrans = Array.isArray(rawData) ? rawData : (typeof rawData === 'object' ? Object.keys(rawData) : []);
            const mapped = rawTrans
              .map(t => {
                const id = (typeof t === 'string' ? t.toLowerCase() : (t.id || t._id)) || '';
                const name = (typeof t === 'string' ? t.charAt(0).toUpperCase() + t.slice(1) : (t.name || t.id)) || '';
                return { _id: id, name };
              })
              .filter(t => t._id === 'taxi' || t._id === 'delivery');

            setTransportTypes(mapped.length > 0 ? mapped : [
              { _id: 'taxi', name: 'Taxi' },
              { _id: 'delivery', name: 'Delivery' }
            ]);
          }
        } catch (e) {
          setTransportTypes([{ _id: 'taxi', name: 'Taxi' }, { _id: 'delivery', name: 'Delivery' }]);
        }

        // Fetch Driver
        const response = await fetch(`https://taxi-a276.onrender.com/api/v1/admin/drivers/${id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        
        if (response.ok && data.success) {
          const d = data.data;
          // Log for debugging if needed
          console.log("Driver Data:", d);
          
          setFormData({
            area: d.service_location_id?._id || d.service_location_id || d.service_location?._id || d.service_location || '',
            country: d.country?._id || d.country || d.service_location?.country?._id || d.service_location?.country || '',
            name: d.name || d.user_id?.name || '',
            mobile: d.mobile || d.user_id?.mobile || '',
            gender: d.gender ? d.gender.charAt(0).toUpperCase() + d.gender.slice(1) : 'Male',
            email: d.email || d.user_id?.email || '',
            password: '',
            confirmPassword: '',
            transportType: d.transport_type || 'taxi',
            vehicleType: d.car_type || d.vehicle_type || '',
            vehicleMake: d.car_make || d.vehicle_make || '',
            vehicleModel: d.car_model || d.vehicle_model || '',
            vehicleColor: d.car_color || d.vehicle_color || '',
            vehicleNumber: d.car_number || d.vehicle_number || ''
          });
        }
      } catch (err) {
        console.error('Fetch error:', err);
      } finally {
        setIsFetching(false);
      }
    };
    fetchInitialData();
  }, [id]);

  // Reactive Vehicle Types Fetching
  useEffect(() => {
    const fetchVehiclesForArea = async () => {
      if (!formData.area || !formData.transportType) return;
      try {
        // Map any existing transport type to 'taxi' or 'delivery' for the API filter
        const typeFilter = (formData.transportType.toLowerCase() === 'delivery') ? 'delivery' : 'taxi';
        const res = await fetch(`https://taxi-a276.onrender.com/api/v1/types/${formData.area}?transport_type=${typeFilter}`);
        const data = await res.json();
        if (data.success) {
          setVehicleTypes(Array.isArray(data.data) ? data.data : (data.data?.results || []));
        }
      } catch (e) {
        console.error("Vehicle types error:", e);
      }
    };
    fetchVehiclesForArea();
  }, [formData.area, formData.transportType]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'area') {
      const selectedLoc = locations.find(l => l._id === value);
      if (selectedLoc) {
        setFormData(prev => ({ 
          ...prev, 
          [name]: value,
          country: selectedLoc.country?._id || selectedLoc.country || prev.country
        }));
        return;
      }
    }
    
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const providedToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5YzdiZTZhYmJlOTJlYjYwMGYwMmQxNiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwibW9iaWxlIjoiOTk5OTk5OTk5OSIsInJvbGUiOiJzdXBlci1hZG1pbiIsImlhdCI6MTc3NTA0OTExNywiZXhwIjoxODA2NTg1MTE3fQ.5KJmXJwaVefWhnc97EqtArkA1z7ZOhsJwA9fbyRVPdQ';
      const storedToken = localStorage.getItem('adminToken');
      const token = (storedToken && storedToken !== 'undefined' && storedToken !== 'null') ? storedToken : providedToken;

      const payload = {
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        gender: formData.gender.toLowerCase(),
        transport_type: formData.transportType.toLowerCase(),
        car_make: formData.vehicleMake,
        car_model: formData.vehicleModel,
        car_color: formData.vehicleColor,
        car_number: formData.vehicleNumber,
        car_type: formData.vehicleType,
        service_location_id: formData.area,
        country: formData.country
      };

      const response = await fetch(`https://taxi-a276.onrender.com/api/v1/admin/drivers/${id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setSuccess(true);
        setTimeout(() => navigate('/admin/drivers'), 2000);
      } else {
        setError(data.message || 'Failed to update driver.');
      }
    } catch (err) {
      setError('Network error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50/30 font-sans">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
          <p className="text-[14px] font-black text-gray-400 uppercase tracking-widest">Fetching Operator Profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/30 p-8 font-sans text-gray-950 animate-in fade-in duration-500">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-10">
        <div>
          <div className="flex items-center gap-2 text-[13px] font-bold text-gray-400 mb-2">
            <span className="text-gray-950 uppercase tracking-widest">Admin Control</span>
            <ChevronRight size={14} />
            <span className="uppercase tracking-widest">Approved Drivers</span>
            <ChevronRight size={14} />
            <span className="text-gray-950 uppercase tracking-widest">Edit operator</span>
          </div>
          <h1 className="text-4xl font-black tracking-tight text-gray-900">Edit Operator Profile</h1>
        </div>
        <button 
          onClick={() => navigate('/admin/drivers')}
          className="bg-white border border-gray-200 text-gray-950 px-6 py-3 rounded-2xl text-[14px] font-black flex items-center gap-2 hover:bg-gray-50 transition-all shadow-sm"
        >
          <ArrowLeft size={18} /> Discard Changes
        </button>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* LEFT COLUMN: BASIC INFO */}
        <div className="xl:col-span-2 space-y-8">
          <div className="bg-white rounded-[40px] border border-gray-100 shadow-xl shadow-gray-200/50 p-10">
            <div className="flex items-center gap-4 mb-10 pb-6 border-b border-gray-50">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 shadow-inner">
                <User size={24} />
              </div>
              <div>
                <h3 className="text-xl font-black text-gray-950 tracking-tight">Identity Details</h3>
                <p className="text-[13px] font-bold text-gray-400">Manage names, contacts and regional access</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-[12px] font-black uppercase tracking-widest text-gray-400">
              <div className="space-y-3">
                <label className="flex items-center gap-2"><MapPin size={14} className="text-indigo-400" /> Select Area *</label>
                 <select 
                   name="area"
                   required
                   value={formData.area}
                   onChange={handleChange}
                   style={{ color: '#000000' }}
                   className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-[14px] font-bold text-gray-950 focus:bg-white focus:border-indigo-200 focus:ring-4 focus:ring-indigo-50/50 outline-none transition-all shadow-inner"
                 >
                   <option value="" className="bg-white text-gray-950 font-bold">Select Area</option>
                   {locations.map(loc => (
                     <option key={loc._id} value={loc._id} className="bg-white text-gray-950 font-bold">{loc.service_location_name}</option>
                   ))}
                 </select>
               </div>

               <div className="space-y-3">
                 <label className="text-gray-400 flex items-center gap-2">
                   <Globe size={14} className="text-indigo-400" /> Country *
                 </label>
                 <select 
                   name="country"
                   required
                   value={formData.country}
                   onChange={handleChange}
                   style={{ color: '#000000' }}
                   className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-[14px] font-bold text-gray-950 focus:bg-white focus:border-indigo-200 focus:ring-4 focus:ring-indigo-50/50 outline-none transition-all shadow-inner"
                 >
                   <option value="" className="bg-white text-gray-950 font-bold">Select Country</option>
                   {countries.map(c => (
                     <option key={c._id} value={c._id} className="bg-white text-gray-950 font-bold">{c.name}</option>
                   ))}
                 </select>
               </div>

              <div className="space-y-3">
                <label className="flex items-center gap-2"><User size={14} className="text-indigo-400" /> Name *</label>
                <input 
                  type="text" 
                  name="name"
                  required
                  placeholder="Enter Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-[14px] font-bold text-gray-950 focus:bg-white focus:border-indigo-200 focus:ring-4 focus:ring-indigo-50/50 outline-none transition-all shadow-inner"
                />
              </div>

              <div className="space-y-3">
                <label className="flex items-center gap-2"><Phone size={14} className="text-indigo-400" /> Mobile *</label>
                <input 
                  type="tel" 
                  name="mobile"
                  required
                  placeholder="Enter Number"
                  value={formData.mobile}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-[14px] font-bold text-gray-950 focus:bg-white focus:border-indigo-200 focus:ring-4 focus:ring-indigo-50/50 outline-none transition-all shadow-inner"
                />
              </div>

              <div className="space-y-3">
                <label className="flex items-center gap-2"><Users size={14} className="text-indigo-400" /> Select Gender *</label>
                <select 
                  name="gender"
                  required
                  value={formData.gender}
                  onChange={handleChange}
                  style={{ color: '#000000' }}
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-[14px] font-bold text-gray-950 focus:bg-white focus:border-indigo-200 focus:ring-4 focus:ring-indigo-50/50 outline-none transition-all shadow-inner"
                >
                  <option value="Male" className="bg-white text-gray-950 font-bold">Male</option>
                  <option value="Female" className="bg-white text-gray-950 font-bold">Female</option>
                  <option value="Other" className="bg-white text-gray-950 font-bold">Other</option>
                </select>
              </div>

              <div className="space-y-3 md:col-span-2">
                <label className="flex items-center gap-2"><Mail size={14} className="text-indigo-400" /> Email *</label>
                <input 
                  type="email" 
                  name="email"
                  required
                  placeholder="Enter Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-[14px] font-bold text-gray-950 focus:bg-white focus:border-indigo-200 focus:ring-4 focus:ring-indigo-50/50 outline-none transition-all shadow-inner"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[40px] border border-gray-100 shadow-xl shadow-gray-200/50 p-10">
            <div className="flex items-center gap-4 mb-10 pb-6 border-b border-gray-50">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 shadow-inner">
                <Car size={24} />
              </div>
              <div>
                <h3 className="text-xl font-black text-gray-950 tracking-tight">Fleet Information</h3>
                <p className="text-[13px] font-bold text-gray-400">Specifications of the assigned vehicle</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-[12px] font-black uppercase tracking-widest text-gray-400">
               <div className="space-y-3">
                  <label className="flex items-center gap-2">Transport Type *</label>
                  <select 
                     name="transportType"
                     required
                     value={formData.transportType}
                     onChange={handleChange}
                     style={{ color: '#000000' }}
                     className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-[14px] font-bold text-gray-950 focus:bg-white focus:border-emerald-200 focus:ring-4 focus:ring-emerald-50/50 outline-none transition-all shadow-inner"
                  >
                     <option value="taxi" className="bg-white text-gray-950 font-bold">Taxi / Car / Auto</option>
                     <option value="delivery" className="bg-white text-gray-950 font-bold">Delivery</option>
                  </select>
               </div>

               <div className="space-y-3">
                  <label>Vehicle Type *</label>
                  <select 
                     name="vehicleType"
                     required
                     value={formData.vehicleType}
                     onChange={handleChange}
                     style={{ color: '#000000' }}
                     className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-[14px] font-bold text-gray-950 focus:bg-white focus:border-emerald-200 focus:ring-4 focus:ring-emerald-50/50 outline-none transition-all shadow-inner"
                  >
                     <option value="" className="bg-white text-gray-950 font-bold">Select Vehicle Type</option>
                     {vehicleTypes.map(vt => (
                       <option key={vt._id} value={vt._id} className="bg-white text-gray-950 font-bold">{vt.vehicle_type || vt.name}</option>
                     ))}
                  </select>
               </div>

               <div className="space-y-3">
                  <label>Vehicle Make *</label>
                  <input 
                     type="text" 
                     name="vehicleMake"
                     required
                     value={formData.vehicleMake}
                     onChange={handleChange}
                     className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-[14px] font-bold text-gray-950 focus:bg-white focus:border-emerald-200 focus:ring-4 focus:ring-emerald-50/50 outline-none transition-all shadow-inner"
                  />
               </div>

               <div className="space-y-3">
                  <label>Vehicle Model *</label>
                  <input 
                     type="text" 
                     name="vehicleModel"
                     required
                     value={formData.vehicleModel}
                     onChange={handleChange}
                     className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-[14px] font-bold text-gray-950 focus:bg-white focus:border-emerald-200 focus:ring-4 focus:ring-emerald-50/50 outline-none transition-all shadow-inner"
                  />
               </div>

               <div className="space-y-3">
                  <label>Vehicle Color *</label>
                  <input 
                     type="text" 
                     name="vehicleColor"
                     required
                     value={formData.vehicleColor}
                     onChange={handleChange}
                     className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-[14px] font-bold text-gray-950 focus:bg-white focus:border-emerald-200 focus:ring-4 focus:ring-emerald-50/50 outline-none transition-all shadow-inner"
                  />
               </div>

               <div className="space-y-3">
                  <label>Vehicle Number *</label>
                  <input 
                     type="text" 
                     name="vehicleNumber"
                     required
                     value={formData.vehicleNumber}
                     onChange={handleChange}
                     className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-[14px] font-bold text-gray-950 focus:bg-white focus:border-emerald-200 focus:ring-4 focus:ring-emerald-50/50 outline-none transition-all shadow-inner"
                  />
               </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: ACTIONS & IMAGE */}
        <div className="space-y-8">
           <div className="bg-white rounded-[40px] border border-gray-100 shadow-xl shadow-gray-200/50 p-10">
              <h3 className="text-[14px] font-black text-gray-950 uppercase tracking-widest mb-8 text-center">Change profile Media</h3>
              
              <div className="relative group cursor-pointer">
                 <div className="w-full aspect-square rounded-[32px] bg-gray-50 border-2 border-dashed border-gray-200 flex flex-col items-center justify-center overflow-hidden transition-all group-hover:border-indigo-400 group-hover:bg-indigo-50/30">
                    {imagePreview ? (
                       <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                       <div className="flex flex-col items-center text-gray-400">
                          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 font-black mb-4">RS</div>
                          <p className="text-[12px] font-black uppercase tracking-widest">Update Photo</p>
                       </div>
                    )}
                 </div>
                 <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleImageChange}
                    className="absolute inset-0 opacity-0 cursor-pointer" 
                 />
              </div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center mt-6 leading-relaxed">System allows updates twice every 30 days for identification security.</p>
           </div>

           <div className="bg-gray-950 rounded-[40px] p-10 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10"><CheckCircle2 size={120} strokeWidth={1} /></div>
              <p className="text-[11px] font-black text-gray-500 uppercase tracking-widest mb-8 leading-none">Account Security</p>
              
              <div className="space-y-4 relative z-10">
                 <button 
                    type="submit"
                    disabled={isLoading || success}
                    className="w-full py-5 bg-white text-gray-950 rounded-2xl text-[14px] font-black uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-xl"
                 >
                    {isLoading ? (
                       <div className="w-5 h-5 border-2 border-gray-200 border-t-gray-950 rounded-full animate-spin"></div>
                    ) : success ? (
                       <CheckCircle2 className="text-emerald-500" />
                    ) : (
                       <Save size={18} />
                    )}
                    {success ? 'Profile Updated!' : isLoading ? 'Updating...' : 'Save Changes'}
                 </button>
                 
                 <button 
                    type="button"
                    onClick={() => navigate('/admin/drivers')}
                    className="w-full py-5 bg-white/10 hover:bg-white/20 border border-white/10 rounded-2xl text-[12px] font-black uppercase tracking-widest transition-all"
                 >
                    Discard Edits
                 </button>
                 
                 <div className="pt-6 border-t border-white/5 space-y-3">
                   <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Critical Actions</p>
                   <button 
                     type="button"
                     className="w-full py-3 bg-rose-500/20 hover:bg-rose-500/30 text-rose-500 rounded-xl text-[12px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2"
                   >
                     <AlertCircle size={14} /> Disable Account
                   </button>
                 </div>
              </div>

              {success && (
                 <div className="mt-8 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl animate-in slide-in-from-top-4 duration-500">
                    <p className="text-[12px] font-bold text-emerald-400 text-center">Operator profile synced with master fleet.</p>
                 </div>
              )}

              {error && (
                 <div className="mt-8 p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl animate-in slide-in-from-top-4 duration-500">
                    <p className="text-[12px] font-bold text-rose-500 text-center">{error}</p>
                 </div>
              )}
           </div>

           <div className="p-8 border-2 border-dashed border-gray-100 rounded-[32px] bg-white/50">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Metadata</p>
              <div className="space-y-2">
                 <div className="flex justify-between text-[11px] font-bold">
                    <span className="text-gray-400 uppercase">Operator ID:</span>
                    <span className="text-gray-950">DRV-{id?.substring(0, 8).toUpperCase() || 'NEW'}</span>
                 </div>
                 <div className="flex justify-between text-[11px] font-bold">
                    <span className="text-gray-400 uppercase">Registered:</span>
                    <span className="text-gray-950">12th Oct 2025</span>
                 </div>
              </div>
           </div>
        </div>
      </form>
    </div>
  );
};

export default EditDriver;
