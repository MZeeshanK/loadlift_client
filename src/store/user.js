import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { setLoading } from './misc';
import { fetchOrders } from './orders';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

// Fetching the user details using the token
export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async ({ userToken, userType }, { dispatch }) => {
    const url =
      userType === 'driver'
        ? `${BACKEND_URL}/api/drivers/me`
        : `${BACKEND_URL}/api/users/me`;

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
      console.log(err.response.data);
    } finally {
      dispatch(setLoading(false));
    }
  },
);

export const otpVerify = createAsyncThunk(
  'user/otpVerify',
  async ({ phone, otp, userType }, { dispatch }) => {
    const url = `${BACKEND_URL}/api/verify`;
    dispatch(setLoading(true));
    try {
      const { data } = await axios({
        method: 'POST',
        url,
        data: {
          phone,
          verificationCode: otp,
        },
        headers: {
          'Content-Type': 'application/json',
        },
      });

      dispatch(fetchUser({ userType, userToken: data.token }));
      dispatch(fetchOrders({ userType, userToken: data.token }));

      return data.token;
    } catch (err) {
      console.log('error', err.response.data);
      // return err.response.data;
    } finally {
      dispatch(setLoading(false));
    }
  },
);

// User login for getting the type and sending the OTP
export const userLogin = createAsyncThunk(
  'user/userLogin',
  async ({ phone, navigation }, { dispatch }) => {
    const url = `${BACKEND_URL}/api/verify/login`;
    dispatch(setLoading(true));

    try {
      const { data, status } = await axios.post(
        url,
        {
          phone,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (status === 200) {
        navigation.navigate('OTP', { phone });
        return data.type;
      }
    } catch (err) {
      console.log(err);
      if (err.response.status === 404) {
        navigation.navigate('UserType', { phone });
      }
      return err.response.data;
    } finally {
      dispatch(setLoading(false));
    }
  },
);

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async ({ userType, inputs, navigation }, { dispatch }) => {
    const url =
      userType === 'driver'
        ? `${BACKEND_URL}/api/drivers/register`
        : `${BACKEND_URL}/api/users/register`;

    dispatch(setLoading(true));

    try {
      await axios({
        method: 'POST',
        url,
        data: {
          ...inputs,
        },
        headers: {
          'Content-Type': 'application/json',
        },
      });

      navigation.navigate('Login', { registerPhone: inputs.phone });
    } catch (error) {
      console.log(error.response.data);
    } finally {
      dispatch(setLoading(false));
    }
  },
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async ({ userType, inputs, userToken, navigation }, { dispatch }) => {
    const url =
      userType === 'driver'
        ? `${BACKEND_URL}/api/drivers/me`
        : `${BACKEND_URL}/api/users/me`;

    dispatch(setLoading(true));

    try {
      const { data } = await axios({
        method: 'PUT',
        url,
        data: inputs,
        headers: {
          Authorization: `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        },
      });

      navigation.navigate('Tabs', { screen: 'Account' });
      return data;
    } catch (err) {
      return err.response.data;
    } finally {
      dispatch(setLoading(false));
    }
  },
);

export const activateDriver = createAsyncThunk(
  'user/activateDriver',
  async ({ active, userToken }, { dispatch }) => {
    const url = `${BACKEND_URL}/api/drivers/me/activate`;

    dispatch(setLoading(true));

    try {
      const { data } = await axios({
        method: 'PUT',
        url,
        data: {
          active: !active,
        },
        headers: {
          Authorization: `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        },
      });

      return data;
    } catch (err) {
      return err.response.data;
    } finally {
      dispatch(setLoading(false));
    }
  },
);

export const setRate = createAsyncThunk(
  'user/setRate',
  async ({ perKmRate, userToken }, { dispatch }) => {
    const url = `${BACKEND_URL}/api/drivers/me/rate`;

    dispatch(setLoading(true));

    try {
      await axios({
        method: 'PUT',
        url,
        data: {
          ratePerKm: perKmRate,
        },
        headers: {
          Authorization: `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        },
      });

      dispatch(fetchUser({ userType: 'driver', userToken }));

      socket.emit('send-message-to-user', {
        userId,
        message: 'Set Rate',
      });

      return data;
    } catch (err) {
      return err.response.data;
    } finally {
      dispatch(setLoading(false));
    }
  },
);

export const clearDebit = createAsyncThunk(
  'user/clearDebit',
  async ({ userToken }, { dispatch }) => {
    const url = `${BACKEND_URL}/api/drivers/me/debit`;

    dispatch(setLoading(true));

    try {
      const { data } = await axios({
        url,
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      return data;
    } catch (err) {
      console.log(err.response.data);
    } finally {
      dispatch(setLoading(false));
    }
  },
);

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    token: '',
    type: 'user',
    data: null,
    error: null,
  },
  reducers: {
    changeUserType: (state, action) => {
      state.type = action.payload;
    },
    userLogout: state => {
      state.token = '';
      state.type = '';
      state.data = null;
      state.error = null;
    },
  },
  extraReducers: builder => {
    // fetchUser
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      // console.log(action.payload);
      state.data = action.payload;
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.error = action.error.message;
      // console.log(action.error.message);
    });

    // loginUser
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.type = action.payload;
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      state.error = action.error.message;
    });

    // VerifyOTP
    builder.addCase(otpVerify.fulfilled, (state, action) => {
      state.token = action.payload;
    });
    builder.addCase(otpVerify.rejected, (state, action) => {
      state.error = action.error.message;
    });

    // register
    builder.addCase(registerUser.rejected, (state, action) => {
      state.error = action.error.message;
    });

    // update User Details
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.error = action.error.message;
    });

    // activate Driver
    builder.addCase(activateDriver.fulfilled, (state, action) => {
      state.data = action.payload;
    });
    builder.addCase(activateDriver.rejected, (state, action) => {
      state.error = action.error.message;
    });

    // setRate
    builder.addCase(setRate.fulfilled, state => {
      state.data = action.payload;
    });
    builder.addCase(setRate.rejected, (state, action) => {
      state.error = action.error.message;
    });

    // clearDebit
    builder.addCase(clearDebit.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

// Action creators are generated for each case reducer function
export const { changeUserType, userLogout } = userSlice.actions;

export default userSlice.reducer;
