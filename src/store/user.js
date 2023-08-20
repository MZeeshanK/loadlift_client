import {createSlice} from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    token: '',
    type: 'user',
    data: null,
    rate: 100,
    isActive: false,
    bank: {
      name: '',
      accountNumber: '',
      ifscCode: '',
    },
    rating: 4,
  },
  reducers: {
    changeUserType: (state, action) => {
      state.type = action.payload;
    },
    userLogin: (state, action) => {
      state.token = action.payload;
    },
    userLogout: state => {
      state.token = '';
      state.type = '';
      state.data = null;
    },
    userDetails: (state, action) => {
      state.data = action.payload;
    },
    changeRate: (state, action) => {
      state.rate = action.payload;
    },
    activate: state => {
      state.isActive = true;
    },
    deactivate: state => {
      state.isActive = false;
    },
    setBankDetails: (state, action) => {
      state.bank = action.payload;
    },
    switchUser: (state, action) => {
      state.user = 'driver';
      state.data = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  changeUserType,
  userLogin,
  userLogout,
  userDetails,
  changeRate,
  activate,
  deactivate,
  setBankDetails,
  switchUser,
} = userSlice.actions;

export default userSlice.reducer;
