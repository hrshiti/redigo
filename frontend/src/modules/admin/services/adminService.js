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
   * Dashboard Stats
   */
  getDashboardStats: () => api.get('/admin/dashboard/stats'),
};
