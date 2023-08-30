import React from 'react';
import {View, Image, StyleSheet} from 'react-native';

import Linear from '../../../components/Linear';
import Header from '../../../components/Header';
import HomeButton from './UserButton';
import GFlatList from '../../../components/GFlatList';
import DriverButton from './DriverButton';

import {useSelector} from 'react-redux';
import DriverRate from './DriverRate';
import axios from 'axios';

const Home = () => {
  const {type: userType} = useSelector(state => state.user);

  const {origin, destination} = useSelector(state => state.map);

  // Google directions api for calculating distance and time between origin and destination

  const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API;
  const API_URL = 'https://maps.googleapis.com/maps/api/directions/json';
  const params = {
    origin: `${origin?.lat} ${origin?.lng}`,
    destination: `${destination?.lat} ${destination?.lng}`,
    key: API_KEY,
    departure_time: 'now', // You can also specify a specific time
    traffic_model: 'best_guess', // Or 'optimistic', or 'pessimistic
  };
  // const getOrderMetrics = async () => {
  //   try {
  //     const {data} = await axios({
  //       method: 'GET',
  //       url: API_URL,
  //       params,
  //     });
  //     const routes = data.routes;
  //     if (routes.length > 0) {
  //       const legs = routes[0].legs;
  //       if (legs.length > 0) {
  //         const distance = legs[0].distance.text;
  //         const duration = legs[0].duration.text;
  //         console.log(`Distance: ${distance}, Duration: ${duration}`);
  //       }
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  const Driver = () => (
    <View className="flex-1 w-full items-center justify-between -mt-8">
      {/* <CustomModal
        visible={deliveryModalVisible}
        setVisible={setDeliveryModalVisible}>
        <DriverCard
          deliveryModalVisible={deliveryModalVisible}
          setDeliveryModalVisible={setDeliveryModalVisible}
          isActive={active}
          // isDelivering={isDelivering}
          // setIsActive={setIsActive}
          // setIsDelivering={setIsDelivering}
        />
      </CustomModal> */}
      {/* {isDelivering && (
        <Card>
          <DriverCard
            deliveryModalVisible={deliveryModalVisible}
            setDeliveryModalVisible={setDeliveryModalVisible}
            isActive={isActive}
            isDelivering={isDelivering}
            setIsActive={setIsActive}
            setIsDelivering={setIsDelivering}
          />
        </Card>
      )} */}
      <View className="flex-1" />
      <DriverRate />
      <View className="flex-1" />
      <DriverButton />
    </View>
  );
  return (
    <Linear style={{paddingVertical: 0, paddngHorizontal: 0}}>
      <Header title="LoadLift" isBack={false} />
      <View className="flex-1 w-full items-center justify-between">
        <Image
          style={styles.logo}
          source={require('../../../assets/logo.png')}
        />
        {userType === 'driver' ? (
          <Driver />
        ) : (
          <>
            {/* 3 last orders list */}
            <GFlatList home orders={[]} />
            <HomeButton />
          </>
        )}
      </View>
    </Linear>
  );
};

const styles = StyleSheet.create({
  logo: {opacity: 0.08, position: 'absolute', top: 0, zIndex: -1},
});

export default React.memo(Home);
