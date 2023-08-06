import {createSlice} from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    token: '',
    type: '',
    data: null,
    what: 'null',
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
  },
});

// Action creators are generated for each case reducer function
export const {changeUserType, userLogin, userLogout, userDetails} =
  userSlice.actions;

export default userSlice.reducer;
