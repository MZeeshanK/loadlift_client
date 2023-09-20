import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  Pressable,
  useColorScheme,
} from 'react-native';

import Linear from '../../../components/Linear';
import Header from '../../../components/Header';
import Card from '../../../components/Card';
import Button from '../../../components/Button';

import categories from '../../../data/categories';

import colors from '../../../constants/colors';
import styleConstants from '../../../constants/styles';
import Title from '../../../components/Title';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../../../store/orders';
// import { getOrderMetrics } from '../../../data/functions';
import axios from 'axios';

const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API;
const API_URL = 'https://maps.googleapis.com/maps/api/directions/json';

const DriverList = ({ route }) => {
  const { drivers } = route.params;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const colorScheme = useColorScheme();

  const primary = colorScheme === 'dark' ? colors.primary : colors.lightPrimary;
  const ongoing = colorScheme === 'dark' ? colors.ongoing : colors.lightOngoing;

  const [driver, setDriver] = useState(null);
  const [isMount, setIsMount] = useState(false);
  const [orderMetrics, setOrderMetrics] = useState(null);
  const [isMetrics, setIsMetrics] = useState(false);

  const { token: userToken, type: userType } = useSelector(state => state.user);
  const { origin, destination } = useSelector(state => state.map);

  const getOrderMetrics = async ({ origin, destination }) => {
    const params = {
      origin: `${origin?.lat} ${origin?.lng}`,
      destination: `${destination?.lat} ${destination?.lng}`,
      key: API_KEY,
      departure_time: 'now', // You can also specify a specific time
      traffic_model: 'pessimistic', // Or 'optimistic', or '
    };

    try {
      const { data } = await axios({
        method: 'GET',
        url: API_URL,
        params,
      });
      const routes = data.routes;
      if (routes.length > 0) {
        const legs = routes[0].legs;
        if (legs.length > 0) {
          const distance = legs[0].distance.value / 1000;
          const duration = legs[0].duration.value / 60;

          setOrderMetrics({
            distance,
            duration,
          });
          setIsMetrics(true);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrderMetrics({ origin, destination });
    if (isMount) {
      if (driver) {
        dispatch(
          createOrder({
            userToken,
            transitDistance: orderMetrics.distance,
            origin,
            destination,
            driverId: driver?._id,
            userType,
            navigation,
          }),
        );
      }
      setIsMount(false);
    }
  }, [isMount]);

  const Item = ({ item }) => {
    const category = categories.find(
      category => category?.value === item?.typeOfVehicle,
    );

    return (
      <Pressable
        onPress={() => setDriver(item)}
        className="flex-1 flex-row items-center justify-center mb-5 rounded-xl py-4"
        style={{
          backgroundColor: driver === item ? primary : ongoing,
          elevation: 2,
        }}>
        <View
          className="items-center justify-center border-r-2 w-16 h-full"
          style={{
            borderColor:
              driver === item && colorScheme === 'dark'
                ? colors.black
                : driver === item && colorScheme !== 'dark'
                ? colors.white
                : colorScheme === 'dark'
                ? colors.white
                : colors.black,
          }}>
          <Image
            source={
              driver === item && colorScheme === 'dark'
                ? category?.darkIcon
                : driver === item && colorScheme === 'light'
                ? category?.icon
                : colorScheme !== 'dark'
                ? category?.darkIcon
                : category?.icon
            }
            style={styles.icon}
          />
          <Title className="tracking-tighter" xxs black={driver === item}>
            {category?.title}
          </Title>
        </View>
        <View className="flex-1 flex-row items-center justify-between px-1">
          <View className="w-1/2 items-start justify-center">
            <Title
              semibold
              sm
              left
              className="tracking-tighter leading-5 "
              black={driver === item}>
              {item?.firstName} {item?.lastName}
            </Title>
            <View className="flex-row items-center">
              <Title
                className="tracking-tighter leading-4 "
                xxs
                semibold
                black={driver === item}>
                {item?.ratings.toFixed(1)}
              </Title>
              <Image
                source={
                  driver === item && colorScheme === 'dark'
                    ? require('../../../assets/star-dark.png')
                    : driver === item && colorScheme === 'light'
                    ? require('../../../assets/star-light.png')
                    : colorScheme !== 'dark'
                    ? require('../../../assets/star-dark.png')
                    : require('../../../assets/star-light.png')
                }
                style={styles.star}
              />
            </View>
          </View>
          <View className="flex-row items-center justify-center px-1">
            <Title
              className="tracking-tighter"
              xsm
              bold
              black={driver === item}>
              Rate/Km:{' '}
            </Title>
            <Title
              className="tracking-tighter"
              xsm
              semibold
              black={driver === item}>
              {'\u20b9'} {item?.ratePerKm}
            </Title>
          </View>
        </View>
        <View
          className={`items-center justify-center border-l-2 h-full border-primary ${
            driver === item && 'border-black'
          } px-3`}
          style={{
            borderColor:
              driver === item && colorScheme === 'dark'
                ? colors.black
                : driver === item && colorScheme === 'light'
                ? colors.white
                : colorScheme === 'dark'
                ? colors.white
                : colors.black,
          }}>
          <Title
            className="tracking-tighter"
            xsm
            semibold
            black={driver === item}>
            {item?.distance.toFixed(2)} km
          </Title>
          <Title
            className="tracking-tighter leading-3"
            xsm
            semibold
            black={driver === item}>
            away
          </Title>
        </View>
      </Pressable>
    );
  };

  return (
    <Linear>
      <Header title="Driver List" />
      <View className="w-full flex-1 items-center justify-center">
        <View className="w-full flex-1 mb-5">
          <Card style={{ width: '100%', flex: 1 }}>
            {drivers.length ? (
              <>
                <Title className="tracking-wider my-2 mb-8" xl bold>
                  Choose a driver from the list.
                </Title>
                <FlatList
                  // showsVerticalScrollIndicator={false}
                  className="flex-1 w-full"
                  data={drivers}
                  keyExtractor={item => item?._id}
                  renderItem={({ item }) => <Item item={item} />}
                />
              </>
            ) : (
              <>
                <Image
                  source={require('../../../assets/fail.png')}
                  className="w-20 h-20 mb-10"
                />
                <Title bold xl>
                  No Drivers available Right Now.
                </Title>
                <Title bold base>
                  Please try again later.
                </Title>
              </>
            )}
          </Card>
        </View>
        <Button
          title="Book Vehicle"
          isDisabled={!isMetrics || !driver}
          style={{ marginVertical: 15 }}
          onPress={() => setIsMount(true)}
        />
      </View>
    </Linear>
  );
};

const styles = StyleSheet.create({
  icon: {
    ...styleConstants.icon,
  },
  star: {
    width: 10,
    height: 10,
    marginLeft: 2,
    marginTop: 1,
  },
});

export default React.memo(DriverList);
