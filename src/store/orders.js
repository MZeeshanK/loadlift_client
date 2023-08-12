import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import orders from '../data/orders';
import axios from 'axios';
import {setLoading} from './misc';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const getAllOrders = createAsyncThunk(
  'orders/getAllOrders',
  async (payload, thunkApi) => {
    thunkApi.dispatch(setLoading(false));
    try {
      const {data, status} = await axios.get(
        `${BACKEND_URL}/api/users/me/orders`,
        {
          headers: {
            Authorization: `Bearer ${payload}`,
          },
        },
      );

      if (status === 200) {
        return data.orders;
      }
    } catch (err) {
      console.log(err);
    }
    // thunkApi.dispatch(setLoading(false));
  },
);

export const ordersSlice = createSlice({
  name: 'user',
  initialState: {
    data: orders,
  },
  reducers: {
    addOrder: (state, action) => {
      state.data.push(action.payload);
    },
  },
  extraReducers: builder => {
    builder.addCase(getAllOrders.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

// Action creators are generated for each case reducer function
export const {addOrder} = ordersSlice.actions;

export default ordersSlice.reducer;
