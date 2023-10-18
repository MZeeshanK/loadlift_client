import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

import Linear from '../../../components/Linear';
import Header from '../../../components/Header';
import HomeButton from './UserButton';
import GFlatList from '../../../components/GFlatList';
import DriverButton from './DriverButton';

import { useSelector } from 'react-redux';
import DriverCard from './DriverCard';

// const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API;

const Home = () => {
  const { type: userType, data: userData } = useSelector(state => state.user);

  const Driver = () => (
    <View className="flex-1 w-full items-center justify-between -mt-8">
      <DriverCard />
      <View className="flex-1" />
      <DriverButton isDisabled={userData.debit >= 500} />
    </View>
  );

  const orders = useSelector(state => state.orders.data);

  let homeOrders;

  if (orders.length && Array.isArray(orders)) {
    homeOrders = orders.filter(
      order =>
        order?.order.status.code !== 9 &&
        order?.order?.status.code !== 8 &&
        order?.order?.status.code !== 4,
    );
  } else {
    homeOrders = [];
  }

  // return;

  return (
    <Linear style={{ paddingVertical: 0, paddngHorizontal: 0 }}>
      <Header title="LoadLift" isBack={false} className="mb-10" />
      <View className="flex-1 w-full items-center justify-center">
        <Image
          style={styles.logo}
          source={require('../../../assets/logo.png')}
        />
        {userType === 'driver' ? (
          <Driver />
        ) : (
          <>
            {/* 3 last orders list */}
            <GFlatList home orders={homeOrders} />
            <HomeButton />
          </>
        )}
      </View>
    </Linear>
  );
};

const styles = StyleSheet.create({
  logo: { opacity: 0.08, position: 'absolute', top: 0, zIndex: -1 },
});

export default React.memo(Home);
