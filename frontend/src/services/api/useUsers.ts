import { useMutation } from '@tanstack/react-query';
import apiClient from './apiClient';
import { UserType } from '../../types/User.type';

interface IUserLogin {
  email: string;
  password: string;
}

export function useLogin() {
  return useMutation({
    mutationFn: async ({ email, password }: IUserLogin) => {
      const url = 'api/user/login';
      const response = await apiClient.post<UserType>(url, { email, password });
      return response.data;
    },
  });
}

export function useRegister() {
  return useMutation({
    mutationFn: async ({ fullName, email, password }: UserType) => {
      const url = 'api/user/register';
      const response = await apiClient.post<UserType>(url, {
        fullName,
        email,
        password,
      });
      return response.data;
    },
  });
}
