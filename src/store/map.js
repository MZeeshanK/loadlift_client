import {createSlice} from '@reduxjs/toolkit';

export const mapSlice = createSlice({
  name: 'user',
  initialState: {
    origin: {
      lat: 0,
      lng: 0,
    },
    destination: {
      lat: 0,
      lng: 0,
    },
    home: {
      lat: 0,
      lng: 0,
    },
    work: {
      lat: 0,
      lng: 0,
    },
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

      console.log(state.home);
    },
    setWork: (state, action) => {
      state.work = {
        lat: action.payload.lat,
        lng: action.payload.lng,
      };
      console.log(state.work);
    },
  },
});

export const {setOrigin, setDestination, setHome, setWork} = mapSlice.actions;

export default mapSlice.reducer;
