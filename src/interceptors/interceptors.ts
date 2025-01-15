import axios from 'axios';
import environment from '../env';

axios.interceptors.request.use(async (config) => {
  config.baseURL = environment.baseUrl;

  return config;
});

axios.interceptors.response.use(
  (response) => response?.data,
  (error) => Promise.reject(error),
);

const demoTreeInstance = axios;

export default demoTreeInstance;
