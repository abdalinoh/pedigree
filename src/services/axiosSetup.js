import axios from 'axios';

// Créez une instance d'axios
const axiosInstance = axios.create({
  baseURL: 'http://192.168.86.55:5000/api',
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Ajoutez un intercepteur pour inclure le token dans les requêtes
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
