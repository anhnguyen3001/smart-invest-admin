// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'authentication',
  initialState: {
    user: null,
    accessToken: undefined,
    initingIam: true,
  },
  reducers: {
    handleUpdateUser: (state, action) => {
      state.user = action.payload;
    },
    handleUpdateAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    handleUpdateInitingIam: (state, action) => {
      state.initingIam = action.payload;
    },
  },
});

export const {
  handleUpdateUser,
  handleUpdateAccessToken,
  handleUpdateInitingIam,
} = authSlice.actions;

export default authSlice.reducer;
