import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { useAuthStore } from '../store/authStore';
import { ApiResponse, LoginCredentials, Place, RegisterData } from '../types/Index';

const baseURL = 'https://traveller.talrop.works/api/v1';

export const client = axios.create({
  baseURL,
});

// Fix: Use InternalAxiosRequestConfig instead of AxiosRequestConfig
client.interceptors.request.use((config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  login: (credentials: LoginCredentials): Promise<AxiosResponse<{ token: string; user: any }>> => 
    client.post('/auth/token/', credentials),
  register: (userData: RegisterData): Promise<AxiosResponse<any>> => 
    client.post('/auth/register/', userData),
};

export const placesAPI = {
  getPlaces: (params?: any): Promise<AxiosResponse<ApiResponse<Place[]>>> => 
    client.get('/places/', { params }),
  getPlace: (id: string): Promise<AxiosResponse<ApiResponse<Place>>> => 
    client.get(`/places/view/${id}/`)
};
