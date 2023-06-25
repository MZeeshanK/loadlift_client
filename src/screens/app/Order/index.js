import React, {useState} from 'react';
import {View, StyleSheet, Image} from 'react-native';

import Linear from '../../../components/Linear';
import Header from '../../../components/Header';
import Button from '../../../components/Button';
import Card from '../../../components/Card';
import Rating from '../../../components/Rating';

import orders from '../../../data/orders';
import categories from '../../../data/categories';
import styleConstants from '../../../constants/styles';
import Title from '../../../components/Title';

const Order = ({navigation}) => {
  const [rating, setRating] = useState(0);

  const order = orders[0];

  let imageSource = categories.find(
    category => category?.title === order.typeOfVehicle,
  );
  imageSource = imageSource?.icon;

  return (
    <Linear>
      <Header title="Order" />
      <View className="flex-1 w-full -mt-5">
        <View className="flex-row items-center justify-between">
          <View className="flex-1" />
          <Button title="Report" mini />
        </View>
        <View className="w-full items-center justify-between flex-1 mt-0 ">
          <Card>
            <View className="w-full flex-row items-center justify-between border-b border-primary pb-5 pt-2 px-1">
              <View className="items-start justify-center">
                <Image source={imageSource} style={styleConstants.icon} />
                <Title xsm>{order?.typeOfVehicle}</Title>
              </View>
              <View className="items-end justify-center">
                <Title lg bold>
                  {order?.date}
                </Title>
                <Title xsm bold>
                  Status: <Title xsm>{order?.substatus}</Title>
                </Title>
              </View>
            </View>
            <View className="w-full items-center justify-between flex-row py-5 border-b border-primary px-1">
              <Title sm bold left>
                Name: <Title sm>{order?.driverName}</Title>
              </Title>
              <Title bold right>
                {order?.vehicleNumber}
              </Title>
            </View>
            <View className="w-full items-start justify-center py-8 border-b border-primary gap-y-6 px-1 ">
              <Title
                className="tracking-wide leading-5"
                numberOfLines={2}
                press
                left
                bold
                sm>
                Pick Up Location: <Title sm>{order?.pickUp}</Title>
              </Title>

              <Title
                className="tracking-wide leading-5"
                numberOfLines={2}
                press
                left
                bold
                sm>
                Destination Location: <Title sm>{order?.destination}</Title>
              </Title>
            </View>
            <View className="w-full pt-6 pb-3 flex-row items-center justify-between px-1">
              <Title className="tracking-widest" bold>
                Price:{' '}
                <Title>
                  {' '}
                  {'\u20b9'}
                  {order?.price}
                </Title>
              </Title>

              <Title className="tracking-widest" bold>
                Distance: <Title>{order?.distance} km</Title>
              </Title>
            </View>
          </Card>

          <Card>
            <View className="w-full items-center justify-center mb-8">
              <Title className="mb-2" xl semibold>
                Leave a Rating
              </Title>
              <Rating
                rating={rating}
                setRating={setRating}
                style={{height: 32, marginRight: 5}}
              />
            </View>
            <View className="items-center justify-between gap-3 px-2 flex-row">
              <Button
                title="Cancel"
                half
                card
                border
                onPress={() => navigation.goBack('')}
              />
              <Button
                title="Call"
                half
                onPress={() => navigation.navigate('Call')}
              />
            </View>
          </Card>
        </View>
      </View>
    </Linear>
  );
};

const styles = StyleSheet.create({});

export default React.memo(Order);
