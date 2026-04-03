/**
 * Mock Socket Service
 * Standardized to prevent ReferenceErrors and console noise
 * All Socket.IO functionality has been removed.
 */
class SocketService {
  socket = null;

  connect() {
    console.log('🔇 Socket.IO has been disabled in the frontend.');
    return null;
  }

  disconnect() {
    // No action needed
  }

  // Generic event stub
  on(event, callback) {
    // No action needed
  }

  off(event, callback) {
    // No action needed
  }

  emit(event, data) {
    // No action needed
  }
}

export const socketService = new SocketService();
