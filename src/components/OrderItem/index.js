import React from 'react';
import {View, StyleSheet, Text, Image, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import colors from '../../constants/colors';

const {dangerBackground, ongoingBackground, cardBackground} = colors;

const OrderItem = ({...props}) => {
  const navigation = useNavigation();

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
        <Text className="text-sm text-primary font-light tracking-wider">
          <Text className="font-bold">Status: </Text>
          {props.danger ? 'Cancelled By the Driver' : 'In Transit'}
        </Text>
        <Text className="font-black tracking-wide text-base">
          {props.ongoing ? 'Ongoing' : '02/11/2023'}
        </Text>
      </View>
      <View className="flex-1 w-full px-1 flex-row items-center justify-between">
        <View className="border-r border-primary items-center justify-start px-2 py-3">
          <Image
            source={require('../../assets/mini-truck-light.png')}
            style={styles.car}
          />
        </View>

        <View className="flex-1 items-between justify-between py-2 px-2 h-[90%]">
          <View className="flex-row items-center justify-between">
            <Text className="text-white text-xs tracking-wide">
              <Text className="font-bold">Name: </Text>
              Ghulam Nabi
            </Text>
            <Text className="text-white text-xs tracking-wide">
              <Text className="font-bold">Number: </Text>
              JK01AA 1234
            </Text>
          </View>
          <View className="flex-row items-center justify-between">
            <Text className="text-white text-xs tracking-wide">
              <Text className="font-bold">Price: </Text>
              Rs.1200
            </Text>
            <Text className="text-white text-xs tracking-wide">
              <Text className="font-bold">Distance: </Text>
              12.8 km
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
  car: {
    width: 50,
    height: 18,
    marginHorizontal: 5,
  },
});

export default React.memo(OrderItem);
