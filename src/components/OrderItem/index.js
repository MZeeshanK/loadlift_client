import React from 'react';
import {View, StyleSheet, Image, useColorScheme} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import styleConstants from '../../constants/styles';
import colors from '../../constants/colors';

import categories from '../../data/categories';
import Title from '../Title';
import Card from '../Card';
import {useSelector} from 'react-redux';

const OrderItem = ({item, ...props}) => {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();

  const userType = useSelector(state => state.user.type);

  const imageSource = categories.find(
    category => category?.value === item?.driver?.typeOfVehicle,
  );

  const image =
    colorScheme === 'dark' ? imageSource?.icon : imageSource?.darkIcon;

  const primary = colorScheme === 'dark' ? colors.primary : colors.lightPrimary;

  const DriverOrderItem = () => {
    return (
      <View className="flex-1 justify-center px-2">
        <View className="w-full flex-row items-center pt-1 justify-between">
          <Title primary bold left>
            Name:{' '}
            <Title>
              {item?.user?.firstName} {item?.user?.lastName}{' '}
            </Title>
          </Title>

          <Title primary bold right>
            Price:{' '}
            <Title>
              {'\u20b9'} {item?.order?.price}
            </Title>
          </Title>
        </View>
        <View className="w-full flex-1 pb-2">
          <Title numberOfLines={2} bold primary left>
            Destination:{' '}
            <Title>
              {item?.order?.destination?.address}{' '}
              {item?.order?.destination?.pinCode}{' '}
            </Title>
          </Title>
        </View>
      </View>
    );
  };

  const UserOrderItem = () => {
    return (
      <>
        <View
          className="border-r items-center justify-start px-1 py-3"
          style={{borderColor: primary}}>
          <Image source={image} style={styles.car} />
        </View>

        <View className="flex-1 items-between justify-between py-2 px-2 h-[90%]">
          <View className="flex-row items-center justify-between">
            <Title left className="tracking-tight w-1/2" xsm>
              <Title semibold xsm>
                Name:{' '}
              </Title>
              {item?.driver?.firstName} {item?.driver?.lastName}
            </Title>
            <Title right className="tracking-tight" xsm>
              <Title semibold xsm>
                Price:{' '}
              </Title>
              {'\u20b9'} {item?.order?.price}
            </Title>
          </View>
          <View className="flex-row items-center justify-between">
            <Title left className="tracking-tight w-1/2" xsm>
              <Title semibold xsm>
                Vehicle:{' '}
              </Title>
              {item?.driver?.vehicleNumber}
            </Title>
            <Title right className="tracking-tight" xsm>
              <Title semibold xsm>
                Distance:{' '}
              </Title>
              {item?.order?.distance} km
            </Title>
          </View>
        </View>
      </>
    );
  };

  return (
    <Card
      onPress={() => navigation.navigate('Order', {orderId: item?._id})}
      className={`rounded-2xl mb-3 py-1 px-1 items-center justify-between`}
      style={styles.order}
      ongoing={props.ongoing}
      danger={props.danger}>
      <View
        className="border-b-2 w-[95%] items-center justify-between flex-row py-2"
        style={{borderColor: primary}}>
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
        {userType === 'driver' ? <DriverOrderItem /> : <UserOrderItem />}
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
