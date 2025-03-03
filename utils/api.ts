// api.ts
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from './env';

const baseURL = API_BASE_URL;

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(async (config) => {
  const tokenData = await AsyncStorage.getItem('tokenData');
  if (tokenData) {
    const { token } = JSON.parse(tokenData);
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const get = async (url: string, params?: object) => {
  const response = await api.get(url, { params });
  return response.data;
};

export const post = async (url: string, data?: object) => {
  const response = await api.post(url, data);
  return response.data;
};

// Add other methods (put, delete, etc.) as needed