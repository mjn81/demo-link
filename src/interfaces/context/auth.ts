export interface IAuthState {
	token: string;
	setToken: (token: string) => void;
	clearToken: () => void;
}
