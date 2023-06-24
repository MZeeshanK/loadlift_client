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
  const order = orders[0];

  let imageSource = categories.find(
    category => category?.title === order.typeOfVehicle,
  );
  imageSource = imageSource?.icon;

  return (
    <Linear>
      <Header title="Order" />
      <View className="flex-1 w-full -mt-5">
        <View className=" w-full items-center justify-center flex-1 ">
          <View className="flex-row items-center justify-between">
            <View className="flex-1" />
            <Button title="Report" mini />
          </View>
          <View className="w-full items-center justify-between flex-1 my-4 ">
            <Card>
              <View className="w-full flex-row items-center justify-between border-b border-primary pb-5 pt-2 px-1">
                <View className="items-start justify-center gap-y-2">
                  <Image source={imageSource} style={styleConstants.icon} />
                  <Text className="text-white text-sm">
                    {order?.typeOfVehicle}
                  </Text>
                </View>
                <View className="items-end justify-center">
                  <Text className="font-bold text-white text-lg">
                    {order?.date}
                  </Text>
                  <Text className="text-bold text-white text-sm tracking-wider">
                    Status:{' '}
                    <Text className="text-normal">{order?.substatus}</Text>
                  </Text>
                </View>
              </View>
              <View className="w-full items-center justify-between flex-row py-5 border-b border-primary px-1">
                <Text className="font-bold text-white text-sm tracking-wider">
                  Name: <Text className="font-normal">{order?.driverName}</Text>
                </Text>
                <Text className="text-white font-bold tracking-wider">
                  {order?.vehicleNumber}
                </Text>
              </View>
              <View className="w-full items-start justify-center py-8 border-b border-primary gap-y-6 px-1 ">
                <Text
                  className="font-bold tracking-wide text-white text-sm leading-5"
                  numberOfLines={2}>
                  Pick Up Location:{' '}
                  <Text className="font-normal">{order?.pickUp}</Text>
                </Text>

                <Text
                  className="font-bold tracking-wide text-white text-sm leading-5"
                  numberOfLines={2}>
                  Destination Location:{' '}
                  <Text className="font-normal">{order?.destination}</Text>
                </Text>
              </View>
              <View className="w-full pt-6 pb-3 flex-row items-center justify-between px-1">
                <Text className="font-bold text-base text-white tracking-widest">
                  Price:{' '}
                  <Text className="font-normal">
                    {' '}
                    {'\u20b9'}
                    {order?.price}
                  </Text>
                </Text>

                <Text className="font-bold text-base text-white tracking-widest">
                  Distance:{' '}
                  <Text className="font-normal">{order?.distance} km</Text>
                </Text>
              </View>
            </Card>

            <Card>
              <View className="w-full items-center justify-center gap-y-4 mb-10">
                <Text className="text-xl font-semibold text-white">
                  Leave a Rating
                </Text>
                <Rating rating={4.5} style={{height: 32, aspectRatio: 1}} />
              </View>
              <View className="items-center justify-between gap-3 px-2 flex-row">
                <Button title="Cancel" half card border />
                <Button
                  title="Call"
                  half
                  onPress={() => navigation.navigate('Call')}
                />
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
