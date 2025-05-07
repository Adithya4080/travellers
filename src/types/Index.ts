export interface User {
  id: number;
  name: string;
  email: string;
}

export interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
}

export interface Place {
  id: number;
  name: string;
  location: string;
  description: string;
  image: string;
  is_featured: boolean;
  category_name: string;
  gallery: GalleryItem[];
}

export interface GalleryItem {
  id: number;
  image: string;
}

export interface WeatherData {
  temperature: string;
  condition: string;
  humidity: string;
  windSpeed: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  status?: string;
}