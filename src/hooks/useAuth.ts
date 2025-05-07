import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../api/client';
import { useAuthStore } from '../store/authStore';
import { showNotification } from '@mantine/notifications';
import { LoginCredentials, RegisterData } from '../types/Index';
import { AxiosError } from 'axios';

export const useLogin = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => authAPI.login(credentials),
    onSuccess: (response) => {
      const { token, user } = response.data;
      login(token, user);
      showNotification({
        title: 'Success',
        message: 'You have been logged in successfully',
        color: 'green',
      });
      navigate('/');
    },
    onError: (error: AxiosError) => {
      showNotification({
        title: 'Error',
        message: (error.response?.data as { message?: string })?.message || 'Failed to login',
        color: 'red',
      });
    },
  });
};

export const useRegister = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (userData: RegisterData) => authAPI.register(userData),
    onSuccess: () => {
      showNotification({
        title: 'Success',
        message: 'Account created successfully. Please login.',
        color: 'green',
      });
      navigate('/login');
    },
    onError: (error: AxiosError) => {
      showNotification({
        title: 'Error',
        message: (error.response?.data as { message?: string })?.message || 'Failed to login',
        color: 'red',
      });
    },
  });
};

export const useLogout = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  return () => {
    logout();
    navigate('/login');
    showNotification({
      title: 'Success',
      message: 'You have been logged out',
      color: 'blue',
    });
  };
};