// src/axiosConfig.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api', // URL de base de votre API
});

export default instance;
