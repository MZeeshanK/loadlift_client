import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { PermissionsAndroid, View, useColorScheme } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';

import { Provider } from 'react-redux';
import store from './src/store';
import { PersistGate } from 'redux-persist/integration/react';
import persistStore from 'redux-persist/es/persistStore';

import Toast from 'react-native-toast-message';

import Routes from './src/Routes';
import Title from './src/components/Title';
import colors from './src/constants/colors';

let persistor = persistStore(store);

function App() {
  const colorScheme = useColorScheme();
  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Loadlift Wants to use location',
          message: 'Loadlift wants to use location',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // console.log('You can use the location');
      } else {
        console.log('location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  useEffect(() => {
    SplashScreen.hide();
    requestLocationPermission();
  }, []);

  const card = colorScheme === 'dark' ? colors.card : colors.lightCard;
  const primary = colorScheme === 'dark' ? colors.primary : colors.lightPrimary;

  const toastConfig = {
    successToast: ({ text1 }) => (
      <View
        style={{
          backgroundColor: card,
          elevation: 2,
          borderWidth: 0.5,
          borderColor: primary,
        }}
        className="px-5 py-2 items-center justify-center rounded-lg">
        <Title primary bold base>
          {text1}
        </Title>
      </View>
    ),

    errorToast: ({ text1 }) => (
      <View
        style={{
          backgroundColor: card,
          elevation: 2,
          borderWidth: 0.5,
          borderColor: '#000',
        }}
        className="px-5 py-2 items-center justify-center rounded-lg">
        <Title danger bold base>
          {text1}
        </Title>
      </View>
    ),
  };

  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <NavigationContainer>
            <Routes />
          </NavigationContainer>
        </PersistGate>
      </Provider>
      <Toast config={toastConfig} />
    </>
  );
}

export default App;
