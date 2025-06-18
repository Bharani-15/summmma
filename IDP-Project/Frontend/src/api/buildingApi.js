// src/api/buildingApi.js
import axios from './axiosInstance';

export const getAllBuildings = () => axios.get('/Buildingss');
