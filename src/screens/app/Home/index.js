import React, {useEffect, useState} from 'react';
import {View, Image, StyleSheet} from 'react-native';

import Linear from '../../../components/Linear';
import Header from '../../../components/Header';
import HomeButton from './UserButton';
import GFlatList from '../../../components/GFlatList';
import DriverButton from './DriverButton';
import DriverCard from './DriverCard';
import CustomModal from '../../../components/CustomModal';
import Card from '../../../components/Card';

import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import {activate, deactivate, userDetails} from '../../../store/user';
import {getAllOrders} from '../../../store/orders';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const Home = () => {
  const dispatch = useDispatch();

  const [isActive, setIsActive] = useState(false);
  const [isDelivering, setIsDelivering] = useState(false);
  const [deliveryModalVisible, setDeliveryModalVisible] = useState(false);

  const {
    type: userType,
    token: userToken,
    data: userData,
    isActive: active,
  } = useSelector(state => state.user);

  const activateDriver = async () => {
    try {
      const {data, status} = await axios({
        url: `${BACKEND_URL}/api/drivers/me/activate`,
        method: 'PUT',
        body: {
          active,
        },
        headers: {
          Authorization: `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        },
      });

      console.log(data, status);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // isActive ? setDeliveryModalVisible(true) : setDeliveryModalVisible(false);

    if (isActive) {
      dispatch(activate());

      // activateDriver();
    } else {
      dispatch(deactivate());
    }
  }, [isActive]);

  const url =
    userType === 'user'
      ? `${BACKEND_URL}/api/users/me`
      : userType === 'driver'
      ? `${BACKEND_URL}/api/drivers/me`
      : null;

  useEffect(() => {
    const getUser = async () => {
      try {
        const {data, status} = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${userToken}`,
            'Content-Type': 'application/json',
          },
        });

        if (status === 200) {
          dispatch(userDetails(data.user));
        }
      } catch (err) {
        console.log(err.response.data);
      }
    };

    if (!userData) {
      getUser();
    }
  }, []);

  useEffect(() => {
    dispatch(getAllOrders(userToken));
  }, [dispatch]);

  // const homeOrders = orders
  //   .filter(
  //     order => order.status !== 'completed' && order.status !== 'cancelled',
  //   )
  //   .slice(0, 2);

  const Driver = () => (
    <View className="flex-1 w-full items-center justify-between -mt-8">
      <CustomModal
        visible={deliveryModalVisible}
        setVisible={setDeliveryModalVisible}>
        <DriverCard
          deliveryModalVisible={deliveryModalVisible}
          setDeliveryModalVisible={setDeliveryModalVisible}
          isActive={isActive}
          isDelivering={isDelivering}
          setIsActive={setIsActive}
          setIsDelivering={setIsDelivering}
        />
      </CustomModal>

      {isDelivering && (
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
      )}
      <View className="flex-1" />

      <DriverButton
        isActive={isActive}
        setIsActive={setIsActive}
        isDelivering={isDelivering}
      />
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
