import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async ({userToken, userType}) => {
    const url =
      userType === 'driver'
        ? `${BACKEND_URL}/api/drivers/me`
        : `${BACKEND_URL}/api/users/me`;

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

export const otpVerify = createAsyncThunk(
  'user/otpVerify',
  async ({phone, otp}) => {
    const url = `${BACKEND_URL}/api/verify`;
    try {
      const {data} = await axios.post(
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
    }
  },
);

export const userLogin = createAsyncThunk(
  'user/userLogin',
  async ({phone, navigation}) => {
    const url = `${BACKEND_URL}/api/verify/login`;

    try {
      const {data, status} = await axios.post(
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
        navigation.navigate('OTP', {phone});
        return data.type;
      }
    } catch (err) {
      console.log(err);
      if (err.response.status === 404) {
        navigation.navigate('UserType', {phone});
      }
      return err.response.data;
    }
  },
);

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async ({userType, inputs, phone, navigation}) => {
    const url =
      userType === 'driver'
        ? `${BACKEND_URL}/api/drivers/register`
        : `${BACKEND_URL}/api/drivers/register`;

    try {
      await axios({
        method: 'POST',
        url,
        data: inputs,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      navigation.navigate('OTP', {phone});
    } catch (err) {
      return err.response.data;
    }
  },
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async ({userType, inputs, userToken, navigation}) => {
    const url =
      userType === 'driver'
        ? `${BACKEND_URL}/api/drivers/me`
        : `${BACKEND_URL}/api/users/me`;

    try {
      await axios({
        method: 'PUT',
        url,
        data: inputs,
        headers: {
          Authorization: `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        },
      });

      navigation.goBack();
    } catch (err) {
      return err.response.data;
    }
  },
);

export const activateDriver = createAsyncThunk(
  'user/activateDriver',
  async ({active, userToken}) => {
    const url = `${BACKEND_URL}/api/drivers/me/activate`;

    try {
      await axios({
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
    } catch (err) {
      return err.response.data;
    }
  },
);

export const setRate = createAsyncThunk(
  'user/setRate',
  async ({perKmRate, userToken}) => {
    const url = `${BACKEND_URL}/api/drivers/me/rate`;

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
    } catch (err) {
      return err.response.data;
    }
  },
);

const rejected = (state, action) => {
  state.status = 'rejected';
  state.error = action.error.message;
  console.log(state.error);
};

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    token: '',
    type: 'user',
    data: null,
    status: 'idle', // idle | loading | succeeded | rejected
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
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: builder => {
    // fetchUser
    builder.addCase(fetchUser.pending, state => {
      state.status = 'loading';
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.data = action.payload;
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      rejected(state, action);
    });

    // loginUser
    builder.addCase(userLogin.pending, state => {
      state.status = 'loading';
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.status = 'idle';
      state.type = action.payload;
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      rejected(state, action);
    });

    // VerifyOTP
    builder.addCase(otpVerify.pending, state => {
      state.status = 'loading';
    });
    builder.addCase(otpVerify.fulfilled, (state, action) => {
      state.status = 'idle';
      state.token = action.payload;
    });
    builder.addCase(otpVerify.rejected, (state, action) => {
      rejected(state, action);
    });

    // register
    builder.addCase(registerUser.pending, state => {
      state.status = 'loading';
    });
    builder.addCase(registerUser.fulfilled, state => {
      state.status = 'idle';
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      rejected(state, action);
    });

    // update User Details
    builder.addCase(updateUser.pending, state => {
      state.status = 'loading';
    });
    builder.addCase(updateUser.fulfilled, state => {
      state.status = 'idle';
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      rejected(state, action);
    });

    // activate Driver
    builder.addCase(activateDriver.pending, state => {
      state.status = 'loading';
    });
    builder.addCase(activateDriver.fulfilled, state => {
      state.status = 'idle';
    });
    builder.addCase(activateDriver.rejected, (state, action) => {
      rejected(state, action);
    });

    // setRate
    builder.addCase(setRate.pending, state => {
      state.status = 'loading';
    });
    builder.addCase(setRate.fulfilled, state => {
      state.status = 'idle';
    });
    builder.addCase(setRate.rejected, (state, action) => {
      rejected(state, action);
    });
  },
});

// Action creators are generated for each case reducer function
export const {changeUserType, userLogout} = userSlice.actions;

export default userSlice.reducer;
