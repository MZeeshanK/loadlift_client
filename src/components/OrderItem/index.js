import React from 'react';
import {View, StyleSheet, Text, Image, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import colors from '../../constants/colors';
import styleConstants from '../../constants/styles';

import categories from '../../data/categories';

const {dangerBackground, ongoingBackground, cardBackground} = colors;

const OrderItem = ({item, ...props}) => {
  const navigation = useNavigation();

  const image = categories.find(
    category => category?.title === item?.typeOfVehicle,
  )?.icon;

  return (
    <Pressable
      onPress={() => navigation.navigate('Order')}
      style={[
        styles.order,
        props.danger && {backgroundColor: dangerBackground},
        props.ongoing && {
          backgroundColor: ongoingBackground,
          borderColor: cardBackground,
        },
      ]}
      className={`rounded-2xl mb-5 items-center justify-between `}>
      <View className="border-b-2 w-[95%] items-center justify-between flex-row border-primary py-2">
        <Text className="text-sm text-white tracking-wider">
          <Text className="font-bold text-primary">Status: </Text>
          {props.danger
            ? 'Cancelled By the Driver'
            : props.ongoing
            ? 'In Transit'
            : 'Completed'}
        </Text>
        <Text className="font-bold text-white tracking-wide text-base">
          {props.ongoing ? 'Ongoing' : item?.date}
        </Text>
      </View>
      <View className="flex-1 w-full px-1 flex-row items-center justify-between">
        <View className="border-r border-primary items-center justify-start px-2 py-3">
          <Image source={image} style={styles.car} />
        </View>

        <View className="flex-1 items-between justify-between py-2 px-2 h-[90%]">
          <View className="flex-row items-center justify-between">
            <Text className="text-white text-xs tracking-wide">
              <Text className="font-bold">Name: </Text>
              {item?.driverName}
            </Text>
            <Text className="text-white text-xs tracking-wide">
              <Text className="font-bold">Number: </Text>
              {item?.vehicleNumber}
            </Text>
          </View>
          <View className="flex-row items-center justify-between">
            <Text className="text-white text-xs tracking-wide">
              <Text className="font-bold">Price: </Text>
              {'\u20b9'} {item?.price}
            </Text>
            <Text className="text-white text-xs tracking-wide">
              <Text className="font-bold">Distance: </Text>
              {item?.distance} km
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  order: {
    width: '100%',
    alignSelf: 'center',
    height: 105,
    elevation: 3,
    shadowColor: '#000',
    backgroundColor: cardBackground,
    borderWidth: 1,
    borderColor: colors.ongoingBackground,
  },
  car: {...styleConstants.icon, marginHorizontal: 5},
});

export default React.memo(OrderItem);
