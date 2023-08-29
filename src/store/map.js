import {createSlice} from '@reduxjs/toolkit';

export const mapSlice = createSlice({
  name: 'map',
  initialState: {
    origin: {
      lat: 34.08057325838969,
      lng: 74.79995688423514,
      address: 'Gol Marker, Karanagar, Srinagar, Jammu and Kashmir, India',
      pinCode: '190010',
    },
    destination: {
      lat: 34.08057325838969,
      lng: 74.79995688423514,
      address: 'Gol Marker, Karanagar, Srinagar, Jammu and Kashmir, India',
      pinCode: '190010',
    },
    home: {
      lat: 34.08057325838969,
      lng: 74.79995688423514,
      address: 'Gol Marker, Karanagar, Srinagar, Jammu and Kashmir, India',
      pinCode: '190010',
    },
    work: {
      lat: 34.08057325838969,
      lng: 74.79995688423514,
      address: 'Gol Marker, Karanagar, Srinagar, Jammu and Kashmir, India',
      pinCode: '190010',
    },
  },
  reducers: {
    setOrigin: (state, action) => {
      state.origin = {
        lat: action.payload.lat,
        lng: action.payload.lng,
        address: action.payload.address,
        pinCode: action.payload.pinCode,
      };
    },
    setDestination: (state, action) => {
      state.destination = {
        lat: action.payload.lat,
        lng: action.payload.lng,
        address: action.payload.address,
        pinCode: action.payload.pinCode,
      };
    },
    setHome: (state, action) => {
      state.home = {
        lat: action.payload.lat,
        lng: action.payload.lng,
        address: action.payload.address,
        pinCode: action.payload.pinCode,
      };
    },
    setWork: (state, action) => {
      state.work = {
        lat: action.payload.lat,
        lng: action.payload.lng,
        address: action.payload.address,
        pinCode: action.payload.pinCode,
      };
    },
  },
});

export const {setOrigin, setDestination, setHome, setWork} = mapSlice.actions;

export default mapSlice.reducer;
