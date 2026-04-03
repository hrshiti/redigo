import api from '../../../shared/api/axiosInstance';

export const userService = {
  /**
   * Authentication
   */
  sendOtp: (mobile) => api.post('/mobile-otp', { mobile }),
  
  validateOtp: (mobile, otp) => api.post('/validate-otp', { mobile, otp }),
  
  login: (credentials) => api.post('/user/login', credentials),

  signup: (userData) => api.post('/user/signup', userData),

  /**
   * Profile
   */
  getProfile: () => api.get('/user/profile'),
  
  updateProfile: (profileData) => api.patch('/user/profile', profileData),

  /**
   * Ride Related
   */
  getRideHistory: () => api.get('/user/history'),
  
  createRideRequest: (rideData) => api.post('/user/request', rideData),

  cancelRide: (requestId, reason) => api.post(`/user/request/cancel/${requestId}`, { reason }),
};
