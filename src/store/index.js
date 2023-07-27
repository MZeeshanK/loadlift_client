import {configureStore, combineReducers} from '@reduxjs/toolkit';
import userReducer from './user';
import ordersReducer from './orders';
import miscReducer from './misc';
import persistReducer from 'redux-persist/es/persistReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'root',
  versions: 1,
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  user: userReducer,
  orders: ordersReducer,
  misc: miscReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({serializableCheck: false}),
});
