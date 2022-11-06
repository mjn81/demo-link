import Axios from 'axios';

const axios = Axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

export const setApiHeader = (key: string, value: any) => {
  axios.interceptors.request.use(config => {
    // @ts-ignore
    config.headers[key] = value;
    return config;
  });
};

export const get = async (uri: string) => {
  return axios.get(uri).then(res => res.data);
};
export const post = async (uri: string, data: any) => {
  return axios.post(uri, data).then(res => res.data);
};

export const put = async (uri: string, data: any) => {
  return axios.put(uri, data).then(res => res.data);
};

export const del = async (uri: string, data: any) => {
  return axios.delete(uri, data).then(res => res.data);
};
