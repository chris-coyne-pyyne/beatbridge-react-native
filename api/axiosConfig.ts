import axios from 'axios';

//192.168.1.218
export const apiClient = axios.create({
  baseURL: 'http://192.168.1.218:8000/',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});
