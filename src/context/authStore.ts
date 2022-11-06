import { IAuthState } from 'interfaces';
import create from 'zustand';
import { persist, devtools } from 'zustand/middleware';


export const useAuthStore = create<IAuthState>()(
	devtools(
		persist(
			(set) => ({
        token: '',
        setToken: (token: string) => set({ token }),
        clearToken: () => set({ token: '' }),
      }),
			{
				name: 'LINK-DEMO-AUTH',
			}
		)
	)
);
