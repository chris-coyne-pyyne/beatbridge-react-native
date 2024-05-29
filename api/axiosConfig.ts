import axios from 'axios';

// Replace with URL of the server you are connecting to
export const apiClient = axios.create({
  baseURL: 'http://192.168.1.218:8000/',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});
