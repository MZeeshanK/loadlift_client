import {createSlice} from '@reduxjs/toolkit';

export const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    data: [],
  },
  reducers: {
    setOrders: (state, action) => {
      state.data = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setOrders} = ordersSlice.actions;

export default ordersSlice.reducer;
