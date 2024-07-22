import axios from 'axios';

// Créez une instance d'axios
const axiosInstance = axios.create({
  baseURL: 'http://192.168.86.55:5000/api',
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Ajoutez un intercepteur pour inclure le token et l'idUser dans les requêtes
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    const idUser = localStorage.getItem('userId'); // Récupérer l'idUser du stockage local
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (idUser) {
      config.headers['idUser'] = idUser; // Ajouter l'idUser dans les en-têtes
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
