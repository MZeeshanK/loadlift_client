import {createSlice} from '@reduxjs/toolkit';
import orders from '../data/orders';

export const ordersSlice = createSlice({
  name: 'user',
  initialState: {
    data: orders,
  },
  reducers: {},
});

// Action creators are generated for each case reducer function
export const {} = ordersSlice.actions;

export default ordersSlice.reducer;
