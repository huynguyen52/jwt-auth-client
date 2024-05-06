import { RegisterUser, User } from '../types';
import axiosClient from './axios-client';

export const userApi = {
  login: ({ email, password }: { email: string; password: string }) => {
    return axiosClient.post<{ email: string; password: string }, User>(
      '/authentication/log-in',
      {
        email,
        password,
      },
      {
        withCredentials: true,
      },
    );
  },
  getUsers: async () => {
    return axiosClient.get<never, User[]>('/users');
  },
  refreshToken: async () => {
    return axiosClient.get<never, User>('/authentication/refresh', {
      withCredentials: true,
    });
  },
  register: async (user: RegisterUser) => {
    return axiosClient.post<RegisterUser, Omit<RegisterUser, 'password'>>(
      '/authentication/register',
      user,
    );
  },
};
