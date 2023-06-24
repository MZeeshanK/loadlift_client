import React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';

import Linear from '../../../components/Linear';
import Header from '../../../components/Header';
import Button from '../../../components/Button';
import Card from '../../../components/Card';
import Rating from '../../../components/Rating';

import orders from '../../../data/orders';
import categories from '../../../data/categories';
import styleConstants from '../../../constants/styles';

const Order = ({navigation}) => {
  return (
    <Linear>
      <Header title="Order" />
      <View className="flex-1 w-full">
        <View className=" w-full items-center justify-center flex-1 ">
          <View className="flex-row items-center justify-between">
            <View className="flex-1" />
            <Button title="Report" mini />
          </View>
          <View className="w-full items-center justify-between flex-1 my-4 ">
            <Card>
              <View className="w-full flex-row items-center justify-between border-b border-primary pb-5 pt-2">
                <View className="items-center justify-center">
                  <Image
                    source={require('../../../assets/mini-truck-light.png')}
                    style={styleConstants.icon}
                    className="mb-2"
                  />
                  <Text className="text-white text-xs">Mini Truck</Text>
                </View>
                <Text className="text-bold text-white text-sm tracking-wider">
                  Status: <Text className="text-normal">Arriving</Text>
                </Text>
              </View>
              <View className="w-full items-center justify-between flex-row py-5 border-b border-primary">
                <Text className="font-bold text-white text-sm tracking-wider">
                  Name: <Text className="font-normal">Ghulam Nabi</Text>
                </Text>
                <Text className="text-white font-bold tracking-wider">
                  JK01AA 1234
                </Text>
              </View>
              <View className="w-full items-start justify-center py-8 border-b border-primary gap-y-6 ">
                <Text
                  className="font-bold tracking-wide text-white text-sm leading-5"
                  numberOfLines={2}>
                  Pick Up Location:{' '}
                  <Text className="font-normal">
                    121, Hawwal, Srinagar, Jammu and Kashmir
                  </Text>
                </Text>

                <Text
                  className="font-bold tracking-wide text-white text-sm leading-5"
                  numberOfLines={2}>
                  Destination Location:{' '}
                  <Text className="font-normal">
                    203, Rainawari, Srinagar, Jammu and Kashmir
                  </Text>
                </Text>
              </View>
              <View className="w-full pt-6 pb-3 flex-row items-center justify-between">
                <Text className="font-bold text-base text-white tracking-widest">
                  Price: <Text className="font-normal"> {'\u20b9'}1200</Text>
                </Text>

                <Text className="font-bold text-base text-white tracking-widest">
                  Distance: <Text className="font-normal">11.8 km</Text>
                </Text>
              </View>
            </Card>

            <Card>
              <View className="w-full items-center justify-center gap-y-4 mb-8">
                <Text className="text-xl font-semibold text-white">
                  Leave a Rating
                </Text>
                <Rating rating={4.5} style={{height: 28, width: 28}} />
              </View>
              <View className="items-center justify-between gap-3 px-2 py-4 flex-row">
                <Button title="Cancel" half card border />
                <Button title="Call" half />
              </View>
            </Card>
          </View>
        </View>
      </View>
    </Linear>
  );
};

const styles = StyleSheet.create({});

export default React.memo(Order);
