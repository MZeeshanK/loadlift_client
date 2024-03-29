import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { setLoading } from './misc';
import { io } from 'socket.io-client';
import { fetchUser } from './user';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const socket = io(BACKEND_URL);

export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async ({ userToken, userType }, { dispatch }) => {
    const url =
      userType === 'driver'
        ? `${BACKEND_URL}/api/drivers/me/orders`
        : `${BACKEND_URL}/api/users/me/orders`;

    dispatch(setLoading(true));

    try {
      const { data } = await axios({
        method: 'GET',
        url,
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      return data;
    } catch (err) {
      // return err.response;
      console.log(err.response);
    } finally {
      dispatch(setLoading(false));
    }
  },
);

export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async (
    {
      userToken,
      transitDistance,
      origin,
      destination,
      driverId,
      userType,
      navigation,
    },
    { dispatch },
  ) => {
    const url = `${BACKEND_URL}/api/order/book`;

    dispatch(setLoading(true));

    try {
      const { data } = await axios({
        method: 'POST',
        url,
        data: {
          origin,
          destination,
          driverId,
          transitDistance,
        },
        headers: {
          Authorization: `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        },
      });

      socket.emit('send-message-to-user', {
        userId: driverId,
        message: 'Update Order',
      });

      dispatch(fetchOrders({ userToken, userType }));
      navigation.navigate('Tabs');
      return data;
    } catch (err) {
      console.log(err.response.data);
      return err.response.data;
    } finally {
      dispatch(setLoading(false));
    }
  },
);

export const updateOrderStatus = createAsyncThunk(
  'orders/updateOrderStatus',
  async (
    { userType, orderStatus, userId, driverId, orderId, userToken },
    { dispatch },
  ) => {
    const url =
      userType === 'driver'
        ? `${BACKEND_URL}/api/drivers/me/orders`
        : `${BACKEND_URL}/api/users/me/orders`;

    dispatch(setLoading(true));
    try {
      const { data } = await axios({
        method: 'PUT',
        url,
        data: {
          status: orderStatus,
          id: orderId,
        },
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      socket.emit('send-message-to-user', {
        userId: userType === 'driver' ? userId : driverId,
        message: 'Update Order',
      });

      dispatch(fetchOrders({ userToken, userType }));
      if (
        (userType === 'driver' && orderStatus.code === 1) ||
        (userType === 'driver' && orderStatus.code === 4)
      ) {
        dispatch(fetchUser({ userToken, userType: 'driver' }));
      }

      return data;
    } catch (err) {
      console.log(err.response.data);
      return err.response.data;
    } finally {
      dispatch(setLoading(false));
    }
  },
);

export const reviewOrder = createAsyncThunk(
  'orders/reviewOrder',
  async (
    { rating, orderId, driverId, userToken, navigation },
    { dispatch },
  ) => {
    const url = `${BACKEND_URL}/api/order/review`;

    dispatch(setLoading(true));
    try {
      const { data } = await axios({
        method: 'POST',
        url,
        data: {
          rating,
          orderId,
        },
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      socket.emit('send-message-to-user', {
        userId: driverId,
        message: 'Update Order',
      });

      socket.emit('send-message-to-user', {
        userId: driverId,
        message: 'Update User',
      });

      navigation.navigate('Tabs');

      return data;
    } catch (err) {
      return err.response.data;
    } finally {
      dispatch(setLoading(false));
    }
  },
);

export const declineOrder = createAsyncThunk(
  'orders/declineOrder',
  async ({ orderId, userToken, userId }, { dispatch }) => {
    const url = `${BACKEND_URL}/api/drivers/me/orders/decline`;

    dispatch(setLoading(true));
    try {
      await axios({
        method: 'POST',
        url,
        data: {
          orderId,
        },
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      dispatch(fetchOrders({ userToken, userType: 'driver' }));

      socket.emit('send-message-to-user', {
        userId,
        message: 'Update Order',
      });

      socket.emit('send-message-to-user', {
        userId,
        message: 'Order Declined',
      });
    } catch (err) {
      return err.response.data;
    } finally {
      dispatch(setLoading(false));
    }
  },
);

export const codOpt = createAsyncThunk(
  'orders/codOpt',
  async ({ orderId, userId, userToken, cod }, { dispatch }) => {
    const url = `${BACKEND_URL}/api/users/me/orders/cod`;

    dispatch(setLoading(true));

    try {
      await axios({
        url,
        method: 'PUT',
        data: {
          orderId,
          cod,
        },
        headers: {
          Authorization: `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        },
      });

      dispatch(fetchOrders({ userToken, userType: 'user' }));

      socket.emit('send-message-to-user', {
        userId,
        message: 'Update Order',
      });
    } catch (err) {
      console.log('error', err.response);
    } finally {
      dispatch(setLoading(false));
    }
  },
);

export const useLoadCoin = createAsyncThunk(
  'orders/useLoadCoin',
  async ({ orderId, userToken, userId }, { dispatch }) => {
    const url = `${BACKEND_URL}/api/users/me/loadcoin`;

    dispatch(setLoading(true));

    try {
      const { data } = await axios({
        method: 'PUT',
        url,
        data: {
          orderId,
        },
        headers: {
          Authorization: `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        },
      });

      dispatch(fetchUser({ userToken, userType: 'user' }));

      socket.emit('send-message-to-user', {
        userId,
        message: 'Update Order',
      });

      return data;
    } catch (err) {
      return err.response.data;
    } finally {
      dispatch(setLoading(false));
    }
  },
);

export const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    data: [],
    error: null,
  },
  extraReducers: builder => {
    // fetchOrders
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(fetchOrders.rejected, (state, action) => {
      // state.error = action.error.message;
      console.log(action.error.message);
    });
    // createOrder
    builder.addCase(createOrder.fulfilled, (state, action) => {
      state.data.unshift(action.payload);
    });
    builder.addCase(createOrder.rejected, (state, action) => {
      state.error = action.error.message;
    });
    // updateOrderStatus
    builder.addCase(updateOrderStatus.rejected, (state, action) => {
      state.error = action.error.message;
    });
    // reviewOrder
    builder.addCase(reviewOrder.fulfilled, (state, action) => {
      const order = state.data.find(order => order?._id === action.payload._id);
      order.order.rating = action.payload?.order.rating;
    });
    builder.addCase(reviewOrder.rejected, (state, action) => {
      state.error = action.error.message;
    });
    // declineOrder
    builder.addCase(
      declineOrder.rejected,
      (state, action) => (state.error = action.error.message),
    );
    //
    builder.addCase(useLoadCoin.fulfilled, (state, action) => {
      const index = state.data.findIndex(
        order => order?._id === action.payload._id,
      );

      const newArray = state.data
        .slice(0, index)
        .concat(state.data.slice(index + 1));

      state.data = [action.payload, ...newArray];
    });
  },
});

export const getSingleOrder = (state, orderId) =>
  state.orders.data.find(order => order?._id === orderId);

export default ordersSlice.reducer;
