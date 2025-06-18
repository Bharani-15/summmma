// src/api/axios.js
import axios from 'axios';
 
const instance = axios.create({
baseURL: 'http://localhost:8083/roombooking', // adjust port as needed
  headers: {
    'Content-Type': 'application/json',
  },
});
 
export default instance;