import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_API_BASE_URL.replace('/api/v1', '');

class SocketService {
  socket = null;

  connect() {
    const token = localStorage.getItem('token') || localStorage.getItem('adminToken');
    
    if (this.socket) return this.socket;

    this.socket = io(SOCKET_URL, {
      auth: {
        token: `Bearer ${token}`
      },
      transports: ['websocket'],
      autoConnect: true,
      reconnection: true
    });

    this.socket.on('connect', () => {
      console.log('🔌 Connected to Redigo Socket Server');
    });

    this.socket.on('disconnect', () => {
      console.log('🔌 Disconnected from Redigo Socket Server');
    });

    this.socket.on('connect_error', (err) => {
      console.error('🔌 Socket Connection Error:', err.message);
    });

    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  // Generic event listeners
  on(event, callback) {
    if (!this.socket) this.connect();
    this.socket.on(event, callback);
  }

  off(event, callback) {
    if (this.socket) {
      this.socket.off(event, callback);
    }
  }

  emit(event, data) {
    if (!this.socket) this.connect();
    this.socket.emit(event, data);
  }
}

export const socketService = new SocketService();
