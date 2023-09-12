import React from 'react';
import {View, useColorScheme} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import Title from '../../../components/Title';
import Button from '../../../components/Button';
import Card from '../../../components/Card';
import {useDispatch, useSelector} from 'react-redux';
import {declineOrder, updateOrderStatus} from '../../../store/orders';

const DriverCard = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const colorScheme = useColorScheme();

  const primary = colorScheme === 'dark' ? colors.primary : colors.lightPrimary;
  const orders = useSelector(state => state.orders.data);
  const {token: userToken, type: userType} = useSelector(state => state.user);

  const newOrder =
    orders.find(order => order?.order?.status?.code === 0) || null;
  const activeOrder = orders.find(
    order =>
      order?.order?.status.code === 1 &&
      order?.order?.status.code === 2 &&
      order?.order?.status.code === 3,
  );

  if (newOrder) {
    return (
      <Card className="w-full">
        <View
          className="w-full items-start justify-center border-b pb-3"
          style={{borderColor: primary}}>
          <View className="w-full">
            <Title lg bold primary left>
              Name:{' '}
              <Title lg>
                {newOrder?.user?.firstName} {newOrder?.user?.lastName}
              </Title>
            </Title>
          </View>
          <View className="w-full flex-row items-center justify-between mb-1">
            <Title base bold primary left>
              Distance: <Title>{newOrder?.order?.distance} km</Title>
            </Title>
            <Title base bold primary right>
              Price:{' '}
              <Title>
                {'\u20b9'} {newOrder?.order?.price}
              </Title>
            </Title>
          </View>
        </View>
        <View
          className="w-full py-2 mb-5 border-b"
          style={{borderColor: primary}}>
          <Title className="mb-3" bold primary left numberOfLines={2}>
            Pick Up:{' '}
            <Title light>
              {newOrder?.order?.origin?.address},{' '}
              {newOrder?.order?.origin?.pinCode}
            </Title>
          </Title>

          <Title className="mb-3" primary bold left numberOfLines={2}>
            Destination:{' '}
            <Title light>
              {' '}
              {newOrder?.order?.destination?.address},{' '}
              {newOrder?.order?.destination?.pinCode}
            </Title>
          </Title>
        </View>

        <View className="w-full flex-row items-center justify-between">
          <Button
            title="Decline"
            className="w-[48%]"
            danger
            onPress={() =>
              dispatch(
                declineOrder({
                  orderId: newOrder?._id,
                  userToken,
                }),
              )
            }
          />
          <Button
            title="Accept"
            className="w-[48%]"
            onPress={() =>
              dispatch(
                updateOrderStatus({
                  userType,
                  orderStatus: {
                    code: 1,
                    message: 'Accepted',
                  },
                  orderId: newOrder?._id,
                  userToken,
                }),
              )
            }
          />
        </View>
      </Card>
    );
  }
  if (activeOrder) {
    return (
      <Card
        className="w-full"
        onPress={() =>
          navigation.navigate('Order', {orderId: activeOrder._id})
        }>
        <View
          className="w-full items-start justify-center border-b pb-3"
          style={{borderColor: primary}}>
          <View className="w-full">
            <Title lg bold primary left>
              Name:{' '}
              <Title lg>
                {activeOrder?.user?.firstName} {activeOrder?.user?.lastName}
              </Title>
            </Title>
          </View>
          <View className="w-full flex-row items-center justify-between mb-1">
            <Title base bold primary left>
              Distance: <Title>{activeOrder?.order?.distance} km</Title>
            </Title>
            <Title base bold primary right>
              Price:{' '}
              <Title>
                {'\u20b9'} {activeOrder?.order?.price}
              </Title>
            </Title>
          </View>
        </View>
        <View
          className="w-full py-2 mb-5 border-b"
          style={{borderColor: primary}}>
          <Title className="mb-3" bold primary left numberOfLines={2}>
            Pick Up:{' '}
            <Title light>
              {activeOrder?.order?.origin?.address},{' '}
              {activeOrder?.order?.origin?.pinCode}
            </Title>
          </Title>

          <Title className="mb-3" primary bold left numberOfLines={2}>
            Destination:{' '}
            <Title light>
              {' '}
              {activeOrder?.order?.destination?.address},{' '}
              {activeOrder?.order?.destination?.pinCode}
            </Title>
          </Title>
        </View>

        <View className="w-full flex-row items-center justify-between">
          <Button
            title="Map"
            className="w-[48%]"
            card
            // onPress={() => navigation.navigate('Map')}
          />

          <Button
            title="Details"
            className="w-[48%]"
            onPress={() =>
              navigation.navigate('Order', {orderId: activeOrder?._id})
            }
          />
        </View>
      </Card>
    );
  }

  return;
};

export default React.memo(DriverCard);
