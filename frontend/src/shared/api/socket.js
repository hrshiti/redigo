// SOCKET.IO COMPLETELY REMOVED TO PREVENT ERRORS
// Real-time Push functionality is disabled as requested.

class SocketService {
  constructor() {
    this.socket = null;
  }

  connect() {
    // console.log('🔌 Socket connection bypassed');
    return this;
  }

  disconnect() {
    // console.log('🔌 Socket disconnected');
  }

  // Pure mock implementation - satisfy calling components
  on(event, callback) {
    // Doing nothing - prevents errors in components
  }

  off(event, callback) {
    // Doing nothing
  }

  emit(event, data) {
    // Doing nothing
  }
}

export const socketService = new SocketService();

