export interface ILogin {
	username: string;
	password: string;
}

export interface ILoginResponse {
	token: string;
}

export interface IProfileResponse {
	user: {
		_id: string;
		username: string;
	};
}

export interface IRegister {
	username: string;
	password: string;
}
