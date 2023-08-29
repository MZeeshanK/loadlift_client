import {createSlice} from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    token: '',
    type: 'user',
    data: null,
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
    test: state => {
      const entireState = getStoredState();

      console.log(entireState);
    },
  },
});

// Action creators are generated for each case reducer function
export const {changeUserType, userLogin, userLogout, userDetails, test} =
  userSlice.actions;

export default userSlice.reducer;
