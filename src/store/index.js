import {configureStore, combineReducers} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import userReducer from './user';
import ordersReducer from './orders';
import mapReducer from './map';
import miscReducer from './misc';
import persistReducer from 'redux-persist/es/persistReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'root',
  versions: 1,
  storage: AsyncStorage,
  blackList: ['misc'],
};

const rootReducer = combineReducers({
  user: userReducer,
  orders: ordersReducer,
  map: mapReducer,
  misc: miscReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});
