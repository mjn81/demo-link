import { Socket } from 'socket.io-client';
export interface ISocketState {
  socket: Socket | null;
  setSocket: (socket: Socket | null) => void;
}
