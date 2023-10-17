import React, { useEffect, useState } from 'react';
import { View, Image, useColorScheme } from 'react-native';

import Linear from '../../../components/Linear';
import Header from '../../../components/Header';
import Button from '../../../components/Button';
import Card from '../../../components/Card';
import Rating from '../../../components/Rating';
import Title from '../../../components/Title';
import CustomModal from '../../../components/CustomModal';

import categories from '../../../data/categories';
import styleConstants from '../../../constants/styles';
import {
  formattedDate,
  openGoogleMapsDirections,
} from '../../../data/functions';

import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import {
  codOpt,
  getSingleOrder,
  updateOrderStatus,
  useLoadCoin,
} from '../../../store/orders';

import RazorpayCheckout from 'react-native-razorpay';

const KEY_ID = process.env.REACT_APP_RAZORPAY_KEY_ID;

const Order = ({ route }) => {
  const { orderId } = route.params;
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const colorScheme = useColorScheme();

  const primary = colorScheme === 'dark' ? colors.primary : colors.lightPrimary;

  // Local States
  const [pickUpModalVisible, setPickUpModalVisible] = useState(false);
  const [deliveredModalVisible, setDeliveredModalVisible] = useState(false);
  const [paymentModal, setPaymentModal] = useState(false);
  const [codModal, setCodModal] = useState(false);

  // redux states
  const myOrder = useSelector(state => getSingleOrder(state, orderId));
  const { order, user, driver, createdAt: date } = myOrder;
  const {
    type: userType,
    token: userToken,
    data: userData,
  } = useSelector(state => state.user);

  const [rating, setRating] = useState(order?.rating || 0);

  // driver vehicle info
  const category = categories.find(
    category => category?.value === driver.typeOfVehicle,
  );
  const categoryTitle = category?.title;
  const imageSource =
    colorScheme === 'dark' ? category?.icon : category?.darkIcon;

  const newDate = formattedDate(date);

  const handlePayment = () => {
    var options = {
      description: 'Loadlift Payment',
      image: '',
      currency: 'INR',
      key: KEY_ID,
      amount: (order?.price * 100).toFixed(0),
      name: 'Loadlift Payment',
      order_id: '', //Replace this with an order_id created using Orders API. Learn more at https://razorpay.com/docs/api/orders.
      prefill: {
        email: 'what@example.com',
        contact: '9419191919',
        name: 'User 1',
      },
      theme: { color: '#F37254' },
    };

    RazorpayCheckout.open(options)
      .then(data => {
        // handle success

        dispatch(
          updateOrderStatus({
            userType,
            userId: user?._id,
            driverId: driver?._id,
            orderStatus: {
              code: 4,
              message: 'Completed',
            },
            orderId,
            userToken,
          }),
        );
      })
      .catch(error => {
        // handle failure
      });
  };
  const PickUpModal = () => {
    const onPress = bool => {
      if (bool) {
        dispatch(
          updateOrderStatus({
            userType,
            orderStatus: {
              code: 2,
              message: 'In Transit',
            },
            userId: user?._id,
            driverId: driver?._id,
            orderId,
            userToken,
          }),
        );
      }
      setPickUpModalVisible(false);
    };

    return (
      <CustomModal
        visible={pickUpModalVisible}
        setVisible={setPickUpModalVisible}>
        <Title bold xxl className="tracking-tighter mb-4">
          Are you Sure?
        </Title>
        <View className="w-full flex-row items-center justify-between">
          <Button onPress={() => onPress(false)} title="No" danger half />
          <Button onPress={() => onPress(true)} title="Yes" half />
        </View>
      </CustomModal>
    );
  };

  const PaymentModal = () => {
    return (
      <CustomModal visible={paymentModal} setVisible={setPaymentModal}>
        <Title bold xxl className="tracking-tighter mb-4">
          Choose an Options from below
        </Title>
        <View className="w-full flex-row items-center justify-between">
          <Button
            onPress={() =>
              dispatch(
                codOpt({ orderId, userId: driver._id, cod: true, userToken }),
              )
            }
            title="Cash On Delivery"
            card
            half
          />
          <Button onPress={() => handlePayment()} title="Pay Online" half />
        </View>
      </CustomModal>
    );
  };

  const CashOnDeliveryModal = () => {
    return (
      <CustomModal visible={codModal} setVisible={setCodModal}>
        <Title bold xxl className="tracking-tighter mb-4">
          Are You sure?
        </Title>
        <View className="w-full flex-row items-center justify-between">
          <Button onPress={() => setCodModal(false)} title="No" danger half />
          <Button
            onPress={() => {
              dispatch(
                updateOrderStatus({
                  userType,
                  userId: user?._id,
                  driverId: driver?._id,
                  orderStatus: {
                    code: 4,
                    message: 'Completed',
                  },
                  orderId,
                  userToken,
                }),
              );
              setCodModal(false);
            }}
            title="Yes"
            half
          />
        </View>
      </CustomModal>
    );
  };

  const DeliveredModal = () => {
    return (
      <CustomModal
        visible={deliveredModalVisible}
        setVisible={setDeliveredModalVisible}>
        <Title className="my-10 text-justify">
          Make sure you have successfully delivered the package to the
          destination, if so the user will be notified with the success of the
          delivery and request will be sent to him/her for payment
        </Title>
        <View className="w-full flex-row items-center justify-between">
          <Button
            half
            danger
            onPress={() => setDeliveredModalVisible(false)}
            title="Go Back"
          />
          <Button
            half
            className="flex-1 ml-2"
            onPress={() => {
              dispatch(
                updateOrderStatus({
                  userType,
                  userId: user?._id,
                  driverId: driver?._id,
                  orderStatus: {
                    code: 3,
                    message: 'Requested Payment',
                  },
                  orderId,
                  userToken,
                }),
              );
              setDeliveredModalVisible(false);
            }}
            title="Delivered"
          />
        </View>
      </CustomModal>
    );
  };

  return (
    <Linear>
      <Header title="Order" className="mb-10" />
      <View className="flex-1 w-full -mt-5">
        <PickUpModal />
        <DeliveredModal />
        <PaymentModal />
        <CashOnDeliveryModal />

        <View className="flex-row items-center justify-between">
          {userType === 'driver' ? (
            <Button
              title="Map"
              className="flex-1 mx-2"
              onPress={() =>
                openGoogleMapsDirections({
                  origin: order.origin,
                  destination: order.destination,
                })
              }
            />
          ) : (
            <>
              <View className="flex-row items-center justify-center pl-3 gap-x-3 ">
                <Image
                  source={require('../../../assets/loadcoin.png')}
                  className="w-5 h-5"
                />
                <Title base bold>
                  {userData.loadCoin}
                </Title>
              </View>
              <View className="flex-1" />
            </>
          )}
          <Button title="Report" danger mini />
        </View>
        <View className="w-full items-center justify-between flex-1">
          <View className="w-full items-center justify-start flex-1">
            <Card className="mt-6">
              <View
                className="w-full flex-row items-center justify-between border-b pb-5 pt-2 px-1"
                style={{ borderColor: primary }}>
                {userType === 'driver' ? (
                  <View className="items-start">
                    <Title className="pb-1" base bold primary>
                      Name:{' '}
                      <Title base black={colorScheme !== 'dark'}>
                        {user?.firstName} {user?.lastName}
                      </Title>
                    </Title>
                  </View>
                ) : (
                  <View className="items-start justify-center">
                    <Image source={imageSource} style={styleConstants.icon} />
                    <Title xsm>{categoryTitle}</Title>
                    <Rating rating={4.5} style={{ width: 15, height: 15 }} />
                  </View>
                )}
                <View className="items-end justify-center">
                  <Title base bold>
                    {newDate}
                  </Title>
                  <Title base className="pt-0" xsm bold primary>
                    Status: <Title xsm>{order?.status?.message}</Title>
                  </Title>
                </View>
              </View>
              {userType === 'user' && (
                <View
                  className="w-full items-center justify-between flex-row py-5 border-b px-1"
                  style={{ borderColor: primary }}>
                  <Title sm bold left primary>
                    Name:{' '}
                    <Title sm>
                      {driver?.firstName} {driver?.lastName}
                    </Title>
                  </Title>
                  <Title bold right>
                    {driver?.vehicleNumber}
                  </Title>
                </View>
              )}
              <View
                className="w-full items-start justify-center py-8 border-b gap-y-6 px-1"
                style={{ borderColor: primary }}>
                <Title
                  className="tracking-wide leading-5"
                  numberOfLines={3}
                  press
                  left
                  bold
                  primary
                  sm>
                  Pick Up Location:{' '}
                  <Title sm>
                    {order?.origin?.address}, {order?.origin?.pinCode}
                  </Title>
                </Title>

                <Title
                  className="tracking-wide leading-5"
                  numberOfLines={3}
                  press
                  left
                  bold
                  primary
                  sm>
                  Destination Location:{' '}
                  <Title sm>
                    {' '}
                    {order?.origin?.address}, {order?.origin?.pinCode}
                  </Title>
                </Title>
              </View>
              <View className="w-full pt-6 pb-3 flex-row items-center justify-between px-1">
                <Title className="tracking-widest" bold primary>
                  Charges:{' '}
                  <Title>
                    {' '}
                    {'\u20b9'}
                    {order?.price}
                  </Title>
                </Title>

                <Title className="tracking-widest" bold primary>
                  Distance: <Title>{order?.distance} km</Title>
                </Title>
              </View>
              {order?.status?.code < 2 && userType === 'driver' && (
                <Button
                  className="my-2 w-full"
                  title="Confirm PickUp"
                  onPress={() => setPickUpModalVisible(true)}
                />
              )}
            </Card>
          </View>

          {userType === 'user' &&
            userData.loadCoin > 999 &&
            order.status.code < 4 &&
            order.status.code >= 1 && (
              <Card className="mt-0">
                <Button
                  className="w-full"
                  title="Use Loadcoin"
                  onPress={() =>
                    dispatch(
                      useLoadCoin({
                        orderId,
                        userToken,
                        userId: driver._id,
                      }),
                    )
                  }
                />
              </Card>
            )}

          {userType === 'driver' && order.cod && order?.status.code === 3 && (
            <Card className="mt-0">
              <Button
                className="w-full"
                title="Confirm Cash On Delivery Payment"
                onPress={() => setCodModal(true)}
              />
            </Card>
          )}

          {order?.status?.code !== 4 &&
          order?.status?.code !== 8 &&
          order?.status?.code !== 9 ? (
            <Card>
              <View className="items-center justify-between w-full flex-row gap-x-2">
                {order?.status?.code < 2 && (
                  <Button
                    title="Cancel"
                    half
                    card
                    border
                    onPress={() =>
                      dispatch(
                        updateOrderStatus({
                          userType,
                          userId: user?._id,
                          driverId: driver?._id,
                          orderStatus: {
                            code: userType === 'driver' ? 8 : 9,
                            message:
                              userType === 'driver'
                                ? 'Cancelled By Driver'
                                : 'Cancelled by user',
                          },
                          orderId,
                          userToken,
                        }),
                      )
                    }
                  />
                )}
                <Button
                  title="Call"
                  half
                  card={order?.status?.code >= 2}
                  className="flex-1"
                  onPress={() => navigation.navigate('Call')}
                />
                {order?.status?.code === 2 && userType === 'driver' && (
                  <Button
                    title="Delivered"
                    half
                    onPress={() => setDeliveredModalVisible(true)}
                  />
                )}
                {order?.status?.code === 3 && userType === 'user' && (
                  <Button
                    title="Pay" // console.log(driver);
                    half
                    onPress={() => setPaymentModal(true)}
                  />
                )}
              </View>
            </Card>
          ) : userType === 'user' ? (
            <Card className="w-full items-center justify-center mb-4">
              <Title className="mb-5" lg bold primary>
                {order.rating ? 'You have Rated' : 'Leave a Rating'}
              </Title>
              <Rating
                className="mb-10"
                rating={rating}
                setRating={setRating}
                orderId={orderId}
                driverId={driver?._id.toString()}
                style={{ height: 32, marginRight: 5 }}
              />
            </Card>
          ) : (
            order.rating && (
              <Card className="w-full items-center justify-center mb-4">
                <Title lg bold primary className="mb-5">
                  You have recieved the rating
                </Title>
                <Rating
                  className="mb-10"
                  rating={order?.rating}
                  style={{ height: 32, marginRight: 5 }}
                />
              </Card>
            )
          )}
        </View>
      </View>
    </Linear>
  );
};

export default React.memo(Order);
