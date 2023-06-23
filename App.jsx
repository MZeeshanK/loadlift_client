import 'react-native-gesture-handler';
import React from 'react';

import {Image, StyleSheet, Text, View} from 'react-native';
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
import Premium from './src/screens/app/Premium';
import Logout from './src/screens/app/Logout';
import PaymentMethod from './src/screens/app/PaymentMethod';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function App() {
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
            backgroundColor: colors.tabBackground,
            borderTop: 'none',
            height: 45,
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
                    focused
                      ? require('./src/assets/home-focused.png')
                      : require('./src/assets/home.png')
                  }
                />
                <Text
                  className={`text-xs pt-0 ${
                    focused ? 'text-primary' : 'text-[#676767]'
                  }`}>
                  Home
                </Text>
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
                    focused
                      ? require('./src/assets/activity-focused.png')
                      : require('./src/assets/activity.png')
                  }
                />
                <Text
                  className={`text-xs pt-0 ${
                    focused ? 'text-primary' : 'text-[#676767]'
                  }`}>
                  Activity
                </Text>
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
                    focused
                      ? require('./src/assets/account-focused.png')
                      : require('./src/assets/account.png')
                  }
                />
                <Text
                  className={`text-xs pt-0 ${
                    focused ? 'text-primary' : 'text-[#676767]'
                  }`}>
                  Account
                </Text>
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    );
  }

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
        <Stack.Screen name="Premium" component={Premium} />
        <Stack.Screen name="Logout" component={Logout} />
        <Stack.Screen name="NotFound" component={NotFound} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 20,
    height: 20,
  },
});

export default App;
