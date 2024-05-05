// create a function returning an axios instance with arguments is a token
import axios, { AxiosResponse } from 'axios';
import { store } from '../store';

const axiosClient = axios.create({
  baseURL: 'http://localhost:8079',
});

// Add a request interceptor
axiosClient.interceptors.request.use(
  async (config) => {
    const accessToken = store.getState().auth.user?.accessToken;
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  (error) => {
    throw error;
  },
);

axiosClient.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    throw error;
  },
);

export default axiosClient;
