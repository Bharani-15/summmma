// src/api/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8083/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
