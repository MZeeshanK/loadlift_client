import {createSlice} from '@reduxjs/toolkit';

export const miscSlice = createSlice({
  name: 'misc',
  initialState: {
    loading: false,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    resetLoading: state => {
      state.loading = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setLoading, resetLoading} = miscSlice.actions;

export default miscSlice.reducer;
