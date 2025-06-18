//import axios from 'axios';
import axios from './axiosInstance';
// Use API Gateway URL
const BASE_URL = 'http://localhost:8083/api';
// localStorage.setItem('isLoggedIn',true);

// export const getAllRooms = () => axios.get(`${BASE_URL}/listRooms`, { withCredentials: true });

export const getAllRooms = () =>
    axios.get(`/listRooms`);
  
// export const getAllEmployees = () => axios.get(`${BASE_URL}/listEmployees`, { withCredentials: true });

export const getAllEmployees = () =>
    axios.get(`/listEmployees`);
  
//export const updateEmployeeRoom = (empId, newRoomId) =>
  //axios.put(`${BASE_URL}/updateEmployee/${empId}/${newRoomId}`, {}, { withCredentials: true });


export const updateEmployeeRoom = (empId, newRoomId) =>
    axios.put(`/updateEmployee/${empId}/${newRoomId}`, {});
  

