import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Pressable,
  Image,
  useColorScheme,
} from 'react-native';

import Linear from '../../../components/Linear';
import Header from '../../../components/Header';
import InputButton from '../../../components/InputButton';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import Card from '../../../components/Card';
import categories from '../../../data/categories';
import Title from '../../../components/Title';
import colors from '../../../constants/colors';
import { useDispatch, useSelector } from 'react-redux';
import TextLabel from '../../../components/TextLabel';
import { useNavigation } from '@react-navigation/native';
import { setLoading } from '../../../store/misc';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const Booking = () => {
  const dispatch = useDispatch();
  const colorScheme = useColorScheme();
  const navigation = useNavigation();

  const { origin, destination } = useSelector(state => state.map);

  const primary = colorScheme === 'dark' ? colors.primary : colors.lightPrimary;
  const ongoing = colorScheme === 'dark' ? colors.ongoing : colors.lightOngoing;

  const [weight, setWeight] = useState(true);
  const [weightStr, setWeightStr] = useState('');
  const [vehicle, setVehicle] = useState(categories[0]);
  const [isMount, setIsMount] = useState(false);

  const weightVal = +weightStr;

  let typeOfVehicle;

  if (weight) {
    if (weightVal < 3000) typeOfVehicle = 'mini-truck';
    if (weightVal < 6000 && weightVal >= 3000) typeOfVehicle = 'light-truck';
    if (weightVal < 9000 && weightVal >= 6000) typeOfVehicle = 'medium-truck';
    if (weightVal >= 9000) typeOfVehicle = 'heavy-truck';
  } else {
    typeOfVehicle = vehicle.value;
  }

  const findDrivers = async () => {
    const url = `${BACKEND_URL}/api/order/nearby`;

    dispatch(setLoading(true));
    try {
      const { data } = await axios({
        method: 'GET',
        url,
        params: {
          latitude: origin.lat,
          longitude: origin.lng,
          typeOfVehicle,
        },
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log(data);

      navigation.navigate('DriverList', { drivers: data });
    } catch (err) {
      if (err.response.status)
        navigation.navigate('DriverList', { drivers: [] });

      console.log(err.response.data);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (isMount) {
      findDrivers();
      setIsMount(false);
    }
  }, [isMount]);

  const ChipButton = () => (
    <Pressable
      className="w-[70%] border-2 rounded-full flex-row items-center justify-center mb-4"
      style={{ borderColor: primary }}
      onPress={() => setWeight(weight => !weight)}>
      <View
        className="flex-1 bg-transparent rounded-full items-center justify-center"
        style={{ backgroundColor: weight && primary }}>
        <Title primary={!weight} black={weight} bold>
          Weight
        </Title>
      </View>
      <View
        className="flex-1 bg-transparent rounded-full items-center justify-center"
        style={{ backgroundColor: !weight && primary }}>
        <Title primary={weight} black={!weight} bold>
          Vehicle
        </Title>
      </View>
    </Pressable>
  );

  const VehicleCard = () => (
    <Card className="w-full mb-5 py-2 flex-1">
      <Title primary xxl bold className="pb-2">
        Categories
      </Title>
      <FlatList
        className="w-full"
        showsVerticalScrollIndicator={false}
        data={categories}
        keyExtractor={item => item?.id}
        renderItem={({ item, index }) => {
          const icon = colorScheme === 'dark' ? item?.icon : item?.darkIcon;
          const darkIcon = colorScheme === 'dark' ? item?.darkIcon : item?.icon;

          return (
            <Card
              onPress={() => {
                setVehicle(item);
              }}
              style={[
                {
                  backgroundColor: vehicle === item ? primary : ongoing,
                  width: '100%',
                  flexDirection: 'row',
                },
                index === categories.length - 1 && { marginBottom: 50 },
              ]}>
              <View
                className={`border-r-2 pr-3 h-12 items-center justify-center ${
                  vehicle === item && 'border-black'
                }`}
                style={
                  vehicle === item && colorScheme === 'dark'
                    ? { borderColor: colors.black }
                    : vehicle === item && colorScheme !== 'dark'
                    ? {
                        borderColor: colors.white,
                      }
                    : vehicle !== item && colorScheme === 'dark'
                    ? {
                        borderColor: colors.white,
                      }
                    : {
                        borderColor: colors.black,
                      }
                }>
                <Image
                  source={vehicle === item ? darkIcon : icon}
                  style={styles.icon}
                />
              </View>
              <View className="flex-row flex-1 px-2 items-center justify-between">
                <Title base bold black={vehicle === item}>
                  {item?.title}
                </Title>
                <View className="items-start justify-center px-2">
                  <Title
                    className="tracking-tighter"
                    xsm
                    bold
                    black={vehicle === item}>
                    Max Capacity:{' '}
                    <Title xsm medium black={vehicle === item}>
                      {item?.weight}T
                    </Title>
                  </Title>
                </View>
              </View>
            </Card>
          );
        }}
      />
    </Card>
  );

  return (
    <Linear>
      <Header title="Booking" />
      <View className="w-full flex-1 items-center justify-start">
        <TextLabel title="Pick Up: " />
        <InputButton
          style={{ marginTop: 0 }}
          title={origin?.address || 'Set Pick Up Location'}
          onPress={() =>
            navigation.navigate('Map', {
              location: origin,
              state: 'origin',
            })
          }
        />
        <TextLabel title="Destination: " />
        <InputButton
          title={destination?.address || 'Set Destination Location'}
          style={{ marginTop: 0 }}
          onPress={() =>
            navigation.navigate('Map', {
              location: destination,
              state: 'destination',
            })
          }
        />

        <View
          className="w-full h-[1] rounded-full my-5"
          style={{ backgroundColor: primary }}
        />

        <ChipButton />

        {weight ? (
          <>
            <TextLabel title="Set Weight: " />
            <Input
              placeholder="Enter Weight in Kg"
              value={weightStr}
              onChangeText={setWeightStr}
              keyboardType="numeric"
              style={{ marginTop: 0 }}
            />
          </>
        ) : (
          <VehicleCard />
        )}
      </View>
      <Button
        title="Search for drivers"
        onPress={() => setIsMount(isMount => !isMount)}
        style={{ marginBottom: 16 }}
      />
    </Linear>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 50,
    height: 21,
  },
});

export default React.memo(Booking);
