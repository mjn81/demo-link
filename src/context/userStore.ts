import create from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import { IUser, IUserState } from 'interfaces';




export const useUserStore = create<IUserState>()(
	devtools(
		persist(
			(set, get) => ({
				id: '',
				username: '',
				setUser: (user: IUser) => set(user),
				setId: (id: string) => set({ id }),
				setUsername: (username: string) => set({ username , id: get().id }),
				clearUser: () => set({ id: '', username: '' }),
			}),
			{
				name: 'LINK-DEMO-USER',
			}
		)
	)
);
