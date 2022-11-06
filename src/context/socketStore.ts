import create from 'zustand';
import { ISocketState } from 'interfaces';

export const useSocketStore = create<ISocketState>(set => ({
  socket: null,
  setSocket: socket => set({ socket }),
}));
