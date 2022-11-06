import { IContactState } from 'interfaces';
import create from 'zustand';
// import { persist, devtools } from 'zustand/middleware';

export const useContactStore = create<IContactState>(set => ({
  contact: null,
  setContact: room => set({ contact: room }),
  clearContact: () => set({ contact: null }),
}));
