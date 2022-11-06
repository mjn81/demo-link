import { io } from 'socket.io-client';

export const createSocket = (token: string) =>
  io('http://localhost:3000/', {
    auth: {
      token: `Token ${token}`,
    },
    autoConnect: false,
  });
