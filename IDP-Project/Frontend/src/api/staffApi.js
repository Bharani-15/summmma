// src/api/staffApi.js
import axios from './axiosInstance';

export const getAllStaff = () => axios.get('/staff');

export const getRoomsByStaff = (staffId) =>
  axios.get(`/staff/${staffId}/rooms`);
