import 'react-native-gesture-handler';
import React from 'react';

import {Image, StyleSheet, View, useColorScheme} from 'react-native';
import colors from './src/constants/colors';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Splash from './src/screens/Splash';
import NotFound from './src/screens/NotFound';

import Login from './src/screens/auth/Login';
import OTP from './src/screens/auth/OTP';
import UserType from './src/screens/auth/UserType';
import CreateAccount from './src/screens/auth/CreateAccount';

import Home from './src/screens/app/Home';
import Activity from './src/screens/app/Activity';
import Account from './src/screens/app/Account';

import Booking from './src/screens/app/Booking';
import Order from './src/screens/app/Order';
import Profile from './src/screens/app/Profile';
import Settings from './src/screens/app/Settings';
import AccountSwitch from './src/screens/app/AccountSwitch';
import Payment from './src/screens/app/Payment';
import PaymentMethod from './src/screens/app/PaymentMethod';
import Premium from './src/screens/app/Premium';
import Map from './src/screens/app/Map';
import Call from './src/screens/app/Call';
import DriverList from './src/screens/app/DriverList';
import PaymentDone from './src/screens/app/PaymentDone';
import IncomingCall from './src/screens/app/IncomingCall';
import ComingSoon from './src/screens/ComingSoon';
import Title from './src/components/Title';

import {Provider} from 'react-redux';
import store from './src/store';
import {PersistGate} from 'redux-persist/integration/react';
import persistStore from 'redux-persist/es/persistStore';

let persistor = persistStore(store);

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function App() {
  const colorScheme = useColorScheme();

  const tab = colorScheme === 'dark' ? colors.tab : colors.lightTab;
  // Tab Navigator
  function Tabs() {
    return (
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          // Tab Bar styles
          tabBarStyle: {
            borderTopWidth: 0,
            backgroundColor: tab,
            borderTop: 'none',
            height: 50,
          },
          tabBarLabel: () => null,
        }}>
        {/* Tab Screen */}
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({focused}) => (
              <View className="h-full w-full items-center justify-center">
                <Image
                  style={styles.icon}
                  source={
                    colorScheme === 'dark' && focused
                      ? require('./src/assets/home-focused.png')
                      : colorScheme !== 'dark' && focused
                      ? require('./src/assets/home-light.png')
                      : require('./src/assets/home.png')
                  }
                />
                <Title className="text-xs" xs primary={focused} grey={!focused}>
                  Home
                </Title>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Activity"
          component={Activity}
          options={{
            tabBarIcon: ({focused}) => (
              <View className="h-full w-full items-center justify-center">
                <Image
                  style={styles.icon}
                  source={
                    colorScheme === 'dark' && focused
                      ? require('./src/assets/activity-focused.png')
                      : colorScheme !== 'dark' && focused
                      ? require('./src/assets/activity-light.png')
                      : require('./src/assets/activity.png')
                  }
                />
                <Title className="text-xs" xs primary={focused} grey={!focused}>
                  Activity
                </Title>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Account"
          component={Account}
          options={{
            tabBarIcon: ({focused}) => (
              <View className="h-full w-full items-center justify-center">
                <Image
                  style={styles.icon}
                  source={
                    colorScheme === 'dark' && focused
                      ? require('./src/assets/account-focused.png')
                      : colorScheme !== 'dark' && focused
                      ? require('./src/assets/account-light.png')
                      : require('./src/assets/account.png')
                  }
                />
                <Title className="text-xs" xs primary={focused} grey={!focused}>
                  Account
                </Title>
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    );
  }

  const Main = () => {
    return (
      <NavigationContainer>
        {/* Stack Navigtor */}
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="OTP" component={OTP} />
          <Stack.Screen name="UserType" component={UserType} />
          <Stack.Screen name="CreateAccount" component={CreateAccount} />
          <Stack.Screen name="Tabs" component={Tabs} />
          <Stack.Screen name="Booking" component={Booking} />
          <Stack.Screen name="Order" component={Order} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen name="Payment" component={Payment} />
          <Stack.Screen name="PaymentMethod" component={PaymentMethod} />
          <Stack.Screen name="AccountSwitch" component={AccountSwitch} />
          <Stack.Screen name="Map" component={Map} />
          <Stack.Screen name="DriverList" component={DriverList} />
          <Stack.Screen name="Premium" component={Premium} />
          <Stack.Screen name="Call" component={Call} />
          <Stack.Screen name="PaymentDone" component={PaymentDone} />
          <Stack.Screen name="IncomingCall" component={IncomingCall} />
          <Stack.Screen name="ComingSoon" component={ComingSoon} />
          <Stack.Screen name="NotFound" component={NotFound} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  };

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Main />
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 22,
    height: 22,
  },
});

export default App;
