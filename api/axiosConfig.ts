import axios from 'axios';
import * as Keychain from 'react-native-keychain';

// Replace with URL of the server you are connecting to
export const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

apiClient.interceptors.request.use(
  async config => {
    try {
      const credentials = await Keychain.getGenericPassword();
      if (credentials) {
        config.headers.Authorization = `Bearer ${credentials.password}`;
      }
    } catch (error) {
      console.log('Error retrieving the token', error);
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);
