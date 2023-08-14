import {createSlice} from '@reduxjs/toolkit';

export const miscSlice = createSlice({
  name: 'user',
  initialState: {
    loading: false,
    error: {
      message: '',
      visible: false,
    },
    modalError: {
      message: '',
      visible: false,
      modal: false,
    },
    popUp: {
      visible: false,
      message: '',
    },
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    resetLoading: state => {
      state.loading = false;
    },
    setError: (state, action) => {
      state.error = {
        message: action.payload,
        visible: true,
      };
    },
    removeError: state => {
      state.error = {
        message: '',
        visible: false,
      };
    },
    setModalError: (state, action) => {
      state.modalError = {
        message: action.payload,
        visible: true,
        modal: true,
      };
    },
    removeModalError: state => {
      state.modalError = {
        message: '',
        visible: false,
        modal: true,
      };
    },
    removeModal: state => {
      state.modalError = {
        message: '',
        visible: false,
        modal: false,
      };
    },
    setPopUp: (state, action) => {
      state.popUp = {
        message: action.payload,
        visible: true,
      };
    },
    removePopUp: state => {
      state.popUp = {
        message: '',
        visible: false,
      };
    },
  },
});

export const {
  setLoading,
  resetLoading,
  setError,
  removeError,
  setModalError,
  removeModalError,
  removeModal,
  setPopUp,
  removePopUp,
} = miscSlice.actions;

export default miscSlice.reducer;
