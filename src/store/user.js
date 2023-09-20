import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { setLoading } from './misc';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

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
      return err.response;
    } finally {
      dispatch(setLoading(false));
    }
  },
);

export const otpVerify = createAsyncThunk(
  'user/otpVerify',
  async ({ phone, otp }, { dispatch }) => {
    const url = `${BACKEND_URL}/api/verify`;
    dispatch(setLoading(true));
    try {
      const { data } = await axios.post(
        url,
        {
          phone,
          verificationCode: otp,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      return data.token;
    } catch (err) {
      return err.response.data;
    } finally {
      dispatch(setLoading(false));
    }
  },
);

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
  async ({ userType, inputs, phone, navigation }, { dispatch }) => {
    const url =
      userType === 'driver'
        ? `${BACKEND_URL}/api/drivers/register`
        : `${BACKEND_URL}/api/drivers/register`;
    dispatch(setLoading(true));

    try {
      await axios({
        method: 'POST',
        url,
        data: inputs,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      navigation.navigate('OTP', { phone });
    } catch (err) {
      return err.response.data;
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
      return data;
    } catch (err) {
      return err.response.data;
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
    builder.addCase(registerUser.fulfilled, state => {});
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
  },
});

// Action creators are generated for each case reducer function
export const { changeUserType, userLogout } = userSlice.actions;

export default userSlice.reducer;
