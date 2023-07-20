import {createSlice} from '@reduxjs/toolkit';
import user from '../data/user';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    type: 'user',
    token: '',
    data: user.user,
  },
  reducers: {
    changeUserType: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.type = action.payload;
    },
    userLogin: (state, action) => {
      state.token = action.payload.token;
      // state.type = action.payload.type;
      // state.data = action.payload.data;
    },
  },
});

// Action creators are generated for each case reducer function
export const {changeUserType, userLogin} = userSlice.actions;

export default userSlice.reducer;
