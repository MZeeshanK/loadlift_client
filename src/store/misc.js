import { createSlice } from '@reduxjs/toolkit';

export const miscSlice = createSlice({
  name: 'user',

  initialState: {
    loading: false,
    popUp: {
      message: '',
      display: false,
    },
  },

  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    resetLoading: state => {
      state.loading = false;
    },
    setPopUp: (state, action) => {
      state.popUp.message = action.payload.message;
      state.popUp.display = true;
    },
    removePopUp: state => {
      state.popUp.message = '';
      state.popUp.display = false;
    },
  },
});

export const { setLoading, resetLoading, setPopUp, removePopUp } =
  miscSlice.actions;

export default miscSlice.reducer;
