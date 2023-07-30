import {createSlice} from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    type: '',
    token: '',
    data: {},
  },
  reducers: {
    changeUserType: (state, action) => {
      state.type = action.payload;
    },
    userLogin: (state, action) => {
      state.token = action.payload.token;
      // state.type = action.payload.type;
      // state.data = action.payload.data;
    },
    userLogout: state => {
      state.token = '';
      state.data = {};
      state.type = '';
    },
    userDetails: (state, action) => {
      state.data = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {changeUserType, userLogin, userDetails} = userSlice.actions;

export default userSlice.reducer;
