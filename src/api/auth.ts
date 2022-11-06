import { ILogin } from 'interfaces';
import { post } from 'utils/api';

export const postRegister = async (data: ILogin) => post('/auth/user', data);

export const postLogin = async (data: ILogin) => post('/auth/user/login', data);
