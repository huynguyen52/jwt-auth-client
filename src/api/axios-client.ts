// create a function returning an axios instance with arguments is a token
import axios, { AxiosResponse } from 'axios';
import { store } from '../store';
import { userApi } from './users-api';
import { login } from '../redux/authSlice';


const axiosClient = axios.create({
  baseURL: '/api',
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
  async (error) => {
    const originalRequest = error.config;
    const isRefresh = originalRequest?.url?.startsWith('/authentication/refresh');

    // make a refresh token api call
    if (error?.response?.status === 401 && !originalRequest._retry && !isRefresh) {
      originalRequest._retry = true;

      const response = await userApi.refreshToken();
      store.dispatch(login(response));

      // Retry the original request with the new token
      originalRequest.headers.Authorization = `Bearer ${response.accessToken}`;
      return axiosClient(originalRequest);
    }
    // redirect to login page if refresh-token invalidate
    if(isRefresh) {
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
