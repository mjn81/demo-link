export interface IUser {
  id: string;
  username: string;
}

export interface IUserState {
  id: string;
  username: string;
  setId: (id: string) => void;
  setUsername: (username: string) => void;
  setUser: (user: IUser) => void;
  clearUser: () => void;
}
