import {createSlice} from '@reduxjs/toolkit';

export const miscSlice = createSlice({
  name: 'user',
  initialState: {
    loading: false,
    error: {
      message: '',
      visible: false,
    },
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    resetLoading: state => {
      state.loading = false;
    },
    setError: (state, action) => {
      state.error = {
        message: action.payload,
        visible: true,
      };
    },
    removeError: state => {
      state.error = {
        message: '',
        visible: false,
      };
    },
  },
});

export const {setLoading, resetLoading, setError, removeError} =
  miscSlice.actions;

export default miscSlice.reducer;
