import { get } from 'utils/api';

export const getRoomHistory = async (id: string) => get(`room/history/${id}`);
