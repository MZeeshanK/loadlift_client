import 'react-native-gesture-handler';
import React, { useEffect } from 'react';

import {
  BackHandler,
  Image,
  StyleSheet,
  View,
  useColorScheme,
} from 'react-native';
import colors from './constants/colors';

import {
  TransitionPresets,
  createStackNavigator,
} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Auth Screens
import Splash from './screens/Splash';
import Login from './screens/auth/Login';
import OTP from './screens/auth/OTP';
import UserType from './screens/auth/UserType';
import CreateAccount from './screens/auth/CreateAccount';

// Tab Screens
import Home from './screens/app/Home';
import Activity from './screens/app/Activity';
import Account from './screens/app/Account';

// App Screens
import Booking from './screens/app/Booking';
import Order from './screens/app/Order';
import Profile from './screens/app/Profile';
import SwitchDetails from './screens/app/SwitchDetails';
import PaymentMethod from './screens/app/PaymentMethod';
import Map from './screens/app/Map';
import Call from './screens/app/Call';
import DriverList from './screens/app/DriverList';
import PaymentDone from './screens/app/PaymentDone';

// Misc Screens
import NotFound from './screens/NotFound';
import ComingSoon from './screens/ComingSoon';

// Component imports
import Title from './components/Title';

// Redux Imports
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from './store/misc';
import { fetchUser } from './store/user';
import { fetchOrders } from './store/orders';

import { io } from 'socket.io-client';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

function Routes() {
  const socket = io(BACKEND_URL);
  const colorScheme = useColorScheme();
  const dispatch = useDispatch();

  const card = colorScheme === 'dark' ? colors.card : colors.lightCard;

  // Tab Navigator
  const {
    type: userType,
    token: userToken,
    data: userData,
  } = useSelector(state => state.user);
  const { loading } = useSelector(state => state.misc);

  const onBackPress = () => {
    dispatch(setLoading(false));
  };

  const config = { userToken, userType };

  socket.emit('user-connected', userData._id);

  socket.on('new-message', message => {
    if (message === 'Update Order') {
      dispatch(fetchOrders(config));
    }
  });

  useEffect(() => {
    if (userType) {
      dispatch(fetchUser(config));
      dispatch(fetchOrders(config));
    }
  }, [dispatch]);

  if (loading) {
    setTimeout(() => {
      dispatch(setLoading(false));
    }, 15000);
  }

  BackHandler.addEventListener('hardwareBackPress', onBackPress);

  // Bottom Tab Navigator configuration
  const Tabs = () => {
    return (
      <Tab.Navigator
        initialRouteName="Home"
        shifting={false}
        screenOptions={{
          headerShown: false,
          // Tab Bar styles
          tabBarStyle: {
            borderTopWidth: 0,
            backgroundColor: card,
            height: 55,
          },
          tabBarHideOnKeyboard: true,
          tabBarLabel: () => null,
        }}>
        {/* Tab Screen */}
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({ focused }) => (
              <View className="h-full w-full items-center justify-center">
                <Image
                  style={styles.icon}
                  source={
                    colorScheme === 'dark' && focused
                      ? require('./assets/home-focused.png')
                      : colorScheme !== 'dark' && focused
                      ? require('./assets/home-light.png')
                      : require('./assets/home.png')
                  }
                />
                <Title xsm primary={focused} grey={!focused}>
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
            tabBarIcon: ({ focused }) => (
              <View className="h-full w-full items-center justify-center">
                <Image
                  style={styles.icon}
                  source={
                    colorScheme === 'dark' && focused
                      ? require('./assets/activity-focused.png')
                      : colorScheme !== 'dark' && focused
                      ? require('./assets/activity-light.png')
                      : require('./assets/activity.png')
                  }
                />
                <Title xsm primary={focused} grey={!focused}>
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
            tabBarIcon: ({ focused }) => (
              <View className="h-full w-full items-center justify-center">
                <Image
                  style={styles.icon}
                  source={
                    colorScheme === 'dark' && focused
                      ? require('./assets/account-focused.png')
                      : colorScheme !== 'dark' && focused
                      ? require('./assets/account-light.png')
                      : require('./assets/account.png')
                  }
                />
                <Title xsm primary={focused} grey={!focused}>
                  Account
                </Title>
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    );
  };

  // App Screen Navigator Configuration
  const AppScreens = () => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
          initialRouteName: 'Tabs',
        }}>
        <Stack.Screen name="Tabs" component={Tabs} />
        <Stack.Screen name="Booking" component={Booking} />
        <Stack.Screen name="Order" component={Order} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="PaymentMethod" component={PaymentMethod} />
        <Stack.Screen name="SwitchDetails" component={SwitchDetails} />
        <Stack.Screen name="Map" component={Map} />
        <Stack.Screen name="DriverList" component={DriverList} />
        <Stack.Screen name="PaymentDone" component={PaymentDone} />
        <Stack.Screen name="ComingSoon" component={ComingSoon} />
        <Stack.Screen name="NotFound" component={NotFound} />
        <Stack.Screen name="Call" component={Call} />
      </Stack.Navigator>
    );
  };

  if (userData) {
    return <AppScreens />;
  } else {
    // Auth Screen Navigator Configuration
    return (
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="OTP" component={OTP} />
        <Stack.Screen name="UserType" component={UserType} />
        <Stack.Screen name="CreateAccount" component={CreateAccount} />
      </Stack.Navigator>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    width: 20,
    height: 20,
  },
});

export default React.memo(Routes);
