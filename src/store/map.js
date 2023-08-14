import {createSlice} from '@reduxjs/toolkit';
import ThunkApi from 'redux-thunk';

export const mapSlice = createSlice({
  name: 'user',
  initialState: {
    origin: {},
    destination: {},
    home: {
      lat: 34.08057325838969,
      lng: 74.79995688423514,
    },
    work: {},
  },
  reducers: {
    setOrigin: (state, action) => {
      state.origin = {
        lat: action.payload.lat,
        lng: action.payload.lng,
      };
    },
    setDestination: (state, action) => {
      state.destination = {
        lat: action.payload.lat,
        lng: action.payload.lng,
      };
    },
    setHome: (state, action) => {
      state.home = {
        lat: action.payload.lat,
        lng: action.payload.lng,
      };
    },
    setWork: (state, action) => {
      state.work = {
        lat: action.payload.lat,
        lng: action.payload.lng,
      };
    },
  },
});

export const {setOrigin, setDestination, setHome, setWork} = mapSlice.actions;

export default mapSlice.reducer;
