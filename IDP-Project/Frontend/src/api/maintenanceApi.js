// src/api/maintenanceApi.js
import axios from './axiosInstance';

export const updateStatusToDirty = () => axios.get('/updateStatusToDirty');


export const updateRoomMaintenance = (roomId, hasProjector, hasBlackboard) => {
      return axios.post(`/${roomId}/updateMaintenance`, null, {
        params: {
          hasProjector,
          hasBlackboard,
        },
      });
    };
    