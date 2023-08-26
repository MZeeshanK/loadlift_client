import React, {useEffect} from 'react';
import {View, Image, StyleSheet} from 'react-native';

import Linear from '../../../components/Linear';
import Header from '../../../components/Header';
import HomeButton from './UserButton';
import GFlatList from '../../../components/GFlatList';
import DriverButton from './DriverButton';

import {useDispatch, useSelector} from 'react-redux';
import {userDetails} from '../../../store/user';
import axios from 'axios';
import DriverRate from './DriverRate';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const Home = () => {
  const dispatch = useDispatch();

  const {type: userType, token: userToken} = useSelector(state => state.user);
  const {data: userData} = useSelector(state => state.user);
  console.log(userData);

  const getUser = async () => {
    const url =
      userType === 'user'
        ? `${BACKEND_URL}/api/users/me`
        : userType === 'driver'
        ? `${BACKEND_URL}/api/drivers/me`
        : null;

    try {
      const {data, status} = await axios({
        method: 'GET',
        url,
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      if (status === 200) {
        dispatch(userDetails(data));
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

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
