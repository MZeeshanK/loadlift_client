import React from 'react';
import {View, StyleSheet, Image, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import colors from '../../constants/colors';
import styleConstants from '../../constants/styles';

import categories from '../../data/categories';
import Title from '../Title';
import Card from '../Card';

const OrderItem = ({item, ...props}) => {
  const navigation = useNavigation();

  const image = categories.find(
    category => category?.title === item?.typeOfVehicle,
  )?.icon;

  return (
    <Card
      onPress={() => navigation.navigate('Order')}
      className={`rounded-2xl mb-3 py-1 px-1 items-center justify-between`}
      style={styles.order}
      ongoing={props.ongoing}
      danger={props.danger}>
      <View className="border-b-2 w-[95%] items-center justify-between flex-row border-primary py-2">
        <Title className="tracking-wider" sm>
          <Title bold primary>
            Status:{' '}
          </Title>
          {props.danger
            ? 'Cancelled By the Driver'
            : props.ongoing
            ? 'In Transit'
            : 'Completed'}
        </Title>
        <Title className="tracking-wide" bold>
          {props.ongoing ? 'Ongoing' : item?.date}
        </Title>
      </View>
      <View className="flex-1 w-full px-1 flex-row items-center justify-between">
        <View className="border-r border-primary items-center justify-start px-1 py-3">
          <Image source={image} style={styles.car} />
        </View>

        <View className="flex-1 items-between justify-between py-2 px-2 h-[90%]">
          <View className="flex-row items-center justify-between">
            <Title className="tracking-tight" xsm>
              <Title semibold xsm>
                Name:{' '}
              </Title>
              {item?.driverName}
            </Title>
            <Title className="tracking-tight" xsm>
              <Title semibold xsm>
                Number:{' '}
              </Title>
              {item?.vehicleNumber}
            </Title>
          </View>
          <View className="flex-row items-center justify-between">
            <Title className="tracking-tight" xsm>
              <Title semibold xsm>
                Price:{' '}
              </Title>
              {'\u20b9'} {item?.price}
            </Title>
            <Title className="tracking-tight" xsm>
              <Title semibold xsm>
                Distance:{' '}
              </Title>
              {item?.distance} km
            </Title>
          </View>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  order: {
    width: '100%',
    alignSelf: 'center',
  },
  car: {...styleConstants.icon, marginHorizontal: 5},
});

export default React.memo(OrderItem);
