// src/api/roomApi.js
import axios from './axiosInstance';

import dayjs from 'dayjs';


export const getAllRooms = () => axios.get('/listRooms');

export const updateRoomStatus = (roomId, status) =>
  axios.post(`/${roomId}/updateStatus`, null, { params: { status } });

export const updateMaintenanceInfo = (roomId, data) =>
  axios.post(`/${roomId}/updateMaintenance`, null, { params: data });

export const assignStaffToRoom = (roomId, staffId) =>
  axios.put(`/${roomId}/assign/${staffId}`);

export const clearStaffFromRoom = (roomId) =>
  axios.post(`/${roomId}/clearStaff`);



export const updateLastCleanedTime = (roomId, lastCleanedTime) =>
    axios.post(`/${roomId}/updateLastCleanedTime`, null, {
      params: {
        lastCleanedTime: dayjs(lastCleanedTime).format('YYYY-MM-DDTHH:mm:ss'),
      },
    });
  
  
export const getAssignedStaff = (roomId) =>
  axios.get(`/${roomId}/assignedStaff`);
