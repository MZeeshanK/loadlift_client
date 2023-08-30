import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async ({userToken, userType}) => {
    const url =
      userType === 'driver'
        ? `${BACKEND_URL}/api/drivers/me/orders`
        : `${BACKEND_URL}/api/users/me/orders`;

    try {
      const {data} = await axios({
        method: 'GET',
        url,
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      return data;
    } catch (err) {
      return err.response.data;
    }
  },
);

export const fetchOrder = async ({userToken, userType, orderId}) => {
  const url =
    userType === 'driver'
      ? `${BACKEND_URL}/api/drivers/me/orders/${orderId}`
      : `${BACKEND_URL}/api/users/me/orders/${orderId}`;

  try {
    const {data} = await axios({
      method: 'GET',
      url,
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    return data;
  } catch (err) {
    return err.response.data;
  }
};

export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async ({userToken, distance, weight, origin, destination, driverId}) => {
    const url = `${BACKEND_URL}/api/order/book`;

    try {
      const {data} = await axios({
        method: 'POST',
        url,
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
        data: {
          distance,
          weight,
          origin,
          destination,
          driverId,
        },
      });
      return data;
    } catch (err) {
      return err.response.data;
    }
  },
);

export const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    setOrders: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: builder => {
    // fetchOrders
    builder.addCase(fetchOrders.pending, state => {
      state.status = 'loading';
    });
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.data = action.payload;
    });
    builder.addCase(fetchOrders.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.error.message;
    });
    // createOrder
    builder.addCase(createOrder.pending, state => {
      state.status = 'loading';
    });
    builder.addCase(createOrder.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.data.push(action.payload);
    });
    builder.addCase(createOrder.rejected, (state, action) => {
      state.status = 'rejected';
      state.error = action.error.message;
    });
  },
});

// Action creators are generated for each case reducer function
export const {setOrders} = ordersSlice.actions;

export default ordersSlice.reducer;
