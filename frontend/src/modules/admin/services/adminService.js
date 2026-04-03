import api from '../../../shared/api/axiosInstance';

export const adminService = {
  /**
   * Admin Authentication
   */
  login: (credentials) => api.post('/admin/login', credentials),

  /**
   * User Management
   */
  getUsers: (page = 1, limit = 50) => api.get(`/admin/users?page=${page}&limit=${limit}`),
  
  createUser: (userData) => api.post('/admin/users', userData),
  
  updateUser: (id, userData) => api.patch(`/admin/users/${id}`, userData),
  
  deleteUser: (id) => api.delete(`/admin/users/${id}`),

  /**
   * Driver Management
   */
  getDrivers: (page = 1, limit = 50) => api.get(`/admin/drivers?page=${page}&limit=${limit}`),
  updateDriverStatus: (id, data) => api.patch(`/admin/drivers/update-status/${id}`, data),
  updateDriverPassword: (id, password) => api.patch(`/admin/drivers/update-password/${id}`, { password }),
  deleteDriver: (id) => api.delete(`/admin/drivers/${id}`),

  /**
   * Subscription Management
   */
  getSubscriptionPlans: () => api.get('/admin/driver-subscriptions/plans/list'),
  createSubscriptionPlan: (planData) => api.post('/admin/driver-subscriptions/plans/create', planData),
  
  /**
   * Common / Configuration Data
   */
  getServiceLocations: () => api.get('/admin/service-locations'),
  getRideModules: () => api.get('/common/ride_modules'),
  getVehicleTypes: (locationId, transportType) => api.get(`/types/${locationId}?transport_type=${transportType}`),

  /**
   * Owner Management
   */
  getOwners: () => api.get('/admin/owner-management/manage-owners'),
  createOwner: (ownerData) => api.post('/admin/owner-management/manage-owners', ownerData),
  updateOwner: (id, ownerData) => api.patch(`/admin/owner-management/manage-owners/${id}`, ownerData),
  deleteOwner: (id) => api.delete(`/admin/owner-management/manage-owners/${id}`),
  approveOwner: (id, data) => api.patch(`/admin/owner-management/manage-owners/${id}/approve`, data),

  /**
   * Reports Management
   * PRO-TIP: We use window.open for downloads to handle the stream directly or axios with responseType: 'blob'
   */
  downloadUserReport: (params) => {
    const query = new URLSearchParams(params).toString();
    return api.get(`/admin/reports/user/download?${query}`, { responseType: 'blob' });
  },
  downloadDriverReport: (params) => {
    const query = new URLSearchParams(params).toString();
    return api.get(`/admin/reports/driver/download?${query}`, { responseType: 'blob' });
  },
  downloadDriverDutyReport: (params) => {
    const query = new URLSearchParams(params).toString();
    return api.get(`/admin/reports/driver-duty/download?${query}`, { responseType: 'blob' });
  },
  downloadOwnerReport: (params) => {
    const query = new URLSearchParams(params).toString();
    return api.get(`/admin/reports/owner/download?${query}`, { responseType: 'blob' });
  },
  downloadFinanceReport: (params) => {
    const query = new URLSearchParams(params).toString();
    return api.get(`/admin/reports/finance/download?${query}`, { responseType: 'blob' });
  },
  downloadFleetFinanceReport: (params) => {
    const query = new URLSearchParams(params).toString();
    return api.get(`/admin/reports/fleet-finance/download?${query}`, { responseType: 'blob' });
  },
  getReportOptions: () => api.get('/admin/reports/options'),

  /**
   * Dashboard Stats & Data (New Parity Routes)
   */
  getDashboardPage: () => api.get('/admin/dashboard/page'),
  getDashboardData: () => api.get('/admin/dashboard/data'),
  getTodayEarnings: () => api.get('/admin/dashboard/today-earnings'),
  getOverallEarnings: () => api.get('/admin/dashboard/overall-earnings'),
  getCancelChart: () => api.get('/admin/dashboard/cancel-chart'),

  /**
   * Wallet & Financials
   */
  getUserWallets: () => api.get('/admin/wallet/users'),
  getDriverWallets: () => api.get('/admin/wallet/drivers'),
  getWithdrawalRequests: () => api.get('/admin/wallet/withdrawals'),
  updateWithdrawalStatus: (id, status) => api.patch(`/admin/wallet/withdrawals/${id}`, { status }),

  /**
   * Notifications & Banners
   */
  getNotifications: () => api.get('/admin/notifications'),
  sendNotification: (data) => api.post('/admin/notifications/send', data),
  getBanners: () => api.get('/admin/banners'),

  /**
   * Geofencing & Zone Management
   */
  getZones: () => api.get('/admin/zones'),
  createZone: (zoneData) => api.post('/admin/zones', zoneData),
  updateZone: (id, zoneData) => api.patch(`/admin/zones/${id}`, zoneData),
  deleteZone: (id) => api.delete(`/admin/zones/${id}`),
  toggleZoneStatus: (id) => api.patch(`/admin/zones/${id}/toggle-status`),
   * Dashboard Stats
   */
  getDashboardData: () => api.get('/admin/dashboard/data'),

  /**
   * GeoFencing / Zones
   */
  getZones: () => api.get('/admin/zones'),

  /**
   * Finance / Withdrawals
   */
  getWithdrawals: () => api.get('/admin/wallet/withdrawals'),
};
