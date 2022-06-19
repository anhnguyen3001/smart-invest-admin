// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit';
import { getCurrentMerchant, setCurrentMerchant } from 'utility/Utils';

export const authSlice = createSlice({
  name: 'authentication',
  initialState: {
    user: null,
    currentMerchantId: getCurrentMerchant(),
    fetchedOwnerMerchants: false,
    selectionMerchants: [],
    initingIam: true,
  },
  reducers: {
    handleUpdateUser: (state, action) => {
      state.user = action.payload;
    },
    handleUpdateStatusInitOwnerMerchants: (state, action) => {
      state.fetchedOwnerMerchants = action.payload;
    },
    handleUpdateSelectionMerchants: (state, action) => {
      state.selectionMerchants = action.payload;
    },
    handleUpdateInitingIam: (state, action) => {
      state.initingIam = action.payload;
    },
    handleUpdateCurrentMerchantId: (state, action) => {
      state.currentMerchantId = action.payload;
      setCurrentMerchant(action.payload);
    },
  },
});

export const {
  handleUpdateUser,
  handleUpdateStatusInitOwnerMerchants,
  handleUpdateSelectionMerchants,
  handleUpdateInitingIam,
  handleUpdateCurrentMerchantId,
} = authSlice.actions;

export default authSlice.reducer;
