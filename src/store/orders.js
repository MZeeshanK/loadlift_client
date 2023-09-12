import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {setLoading} from './misc';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async ({userToken, userType}, {dispatch}) => {
    const url =
      userType === 'driver'
        ? `${BACKEND_URL}/api/drivers/me/orders`
        : `${BACKEND_URL}/api/users/me/orders`;

    dispatch(setLoading(true));

    try {
      const {data, status} = await axios({
        method: 'GET',
        url,
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      if (status === 200) return data;
    } catch (err) {
      return err.response.data;
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
    {dispatch},
  ) => {
    const url = `${BACKEND_URL}/api/order/book`;

    dispatch(setLoading(true));

    try {
      const {data} = await axios({
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

      navigation.navigate('Tabs');
      return data;
    } catch (err) {
      return err.response.data;
    } finally {
      dispatch(fetchOrders({userToken, userType}));
      dispatch(setLoading(false));
    }
  },
);

export const findDrivers = async ({
  origin,
  navigation,
  typeOfVehicle,
  dispatch,
}) => {
  const url = `${BACKEND_URL}/api/order/nearby`;

  const {lat, lng} = origin;

  dispatch(setLoading(true));

  try {
    const {data} = await axios({
      method: 'GET',
      url,
      params: {
        latitude: lat,
        longitude: lng,
        typeOfVehicle,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });

    navigation.navigate('DriverList', {drivers: data});
  } catch (err) {
    if (err.response.status === 404)
      navigation.navigate('DriverList', {drivers: []});
    console.log(err.response.data);
  }

  dispatch(setLoading(false));
};

export const updateOrderStatus = createAsyncThunk(
  'orders/updateOrderStatus',
  async ({userType, orderStatus, orderId, userToken}, {dispatch}) => {
    const url =
      userType === 'driver'
        ? `${BACKEND_URL}/api/drivers/me/orders`
        : `${BACKEND_URL}/api/users/me/orders`;

    dispatch(setLoading(true));
    try {
      const {data} = await axios({
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

      return data;
    } catch (err) {
      console.log(err.response.data);
      return err.response.data;
    } finally {
      dispatch(setLoading(false));
      dispatch(fetchOrders({userToken, userType}));
    }
  },
);

export const reviewOrder = createAsyncThunk(
  'orders/reviewOrder',
  async ({rating, orderId, userToken, navigation}, {dispatch}) => {
    const url = `${BACKEND_URL}/api/order/review`;

    dispatch(setLoading(true));
    try {
      const {data} = await axios({
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
  async ({orderId, userToken}, {dispatch}) => {
    const url = `${BACKEND_URL}/api/drivers/me/orders`;

    dispatch(setLoading(true));
    try {
      await axios({
        method: 'DELETE',
        url,
        params: {
          q: {
            orderId,
          },
        },
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      return orderId;
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
    activeOrder: {},
    error: null,
  },

  extraReducers: builder => {
    // fetchOrders
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(fetchOrders.rejected, (state, action) => {
      state.error = action.error.message;
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
    builder.addCase(declineOrder.fulfilled, (state, action) => {
      state.data = state.data.filter(order => order._id !== action.payload);
      console.log(action.payload);
    });
    builder.addCase(
      declineOrder.rejected,
      (state, action) => (state.error = action.error.message),
    );
  },
});

export const getSingleOrder = (state, orderId) =>
  state.orders.data.find(order => order?._id === orderId);

export default ordersSlice.reducer;
