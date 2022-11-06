import { get } from 'utils/api';

export const getContactList = async () => get('/room/self');

export const getProfile = async () => get('/user/profile');

export const getContactDetail = async (contactId: string) =>
	get(`/room/${contactId}`);
