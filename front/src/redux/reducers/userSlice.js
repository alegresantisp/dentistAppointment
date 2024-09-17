import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userId: null,
  username: '',
  isAuthenticated: false,
  userAppointments: []
  
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: { 
    setUser: (state, action) => {
      state.userId = action.payload.userId;
      state.username = action.payload.username; 
      state.isAuthenticated = true;
    },
    logoutUser: (state) => {
      state.userId = null;
      state.username = '';
      state.isAuthenticated = false;
      state.userAppointments = []; 
    },
    setUserAppointments: (state, action) => {
      state.userAppointments = action.payload; 
    },
    addAppointment: (state, action) => {
      state.userAppointments.push(action.payload);
    },
    updateAppointmentStatus: (state, action) => {
      const { id, status } = action.payload;
      const appointment = state.userAppointments.find(app => app.id === id);
      if (appointment) {
        appointment.status = status;
      }
    },
    cancelAppointments: (state, action) => {
      const { id } = action.payload;
      const appointment = state.userAppointments.find(app => app.id === id);
      if (appointment) {
        appointment.status = 'cancelled';
      }
    },
  }
});


export const { setUser, logoutUser, setUserAppointments, addAppointment, updateAppointmentStatus, cancelAppointments} = userSlice.actions;
export default userSlice.reducer;