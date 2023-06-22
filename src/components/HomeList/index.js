import React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';

const HomeList = ({...props}) => {
  return (
    <View
      className="rounded-2xl mb-5 items-center justify-between"
      style={styles.order}>
      <View className="text-center border-b-2 w-[95%] border-primary pt-3 pb-1">
        <Text className="text-base text-white text-center font-bold tracking-wider">
          The Driver has been alerted.
        </Text>
      </View>
      <View className="flex-1 w-full px-1 flex-row items-center justify-between">
        <View className="border-r border-primary items-center justify-start px-2 py-3">
          <Image
            source={require('../../assets/mini-truck.png')}
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
    </View>
  );
};

const styles = StyleSheet.create({
  order: {
    width: '100%',
    alignSelf: 'center',
    height: 110,
    elevation: 3,
    shadowColor: '#000',
    backgroundColor: 'rgba(18,51,69,.4)',
  },
  car: {
    width: 55,
    height: 28,
  },
});

export default React.memo(HomeList);
