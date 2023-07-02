import React, {useState, useEffect} from 'react';
import {View, Image} from 'react-native';

import Linear from '../../../components/Linear';
import Header from '../../../components/Header';
import Button from '../../../components/Button';
import Card from '../../../components/Card';
import Rating from '../../../components/Rating';

import orders from '../../../data/orders';
import categories from '../../../data/categories';
import styleConstants from '../../../constants/styles';
import Title from '../../../components/Title';
import CustomModal from '../../../components/CustomModal';

const Order = ({navigation}) => {
  const [rating, setRating] = useState(0);
  const [driver] = useState(true);
  const [picked, setPicked] = useState(false);
  const [ratingModalVisible, setRatingModalVisible] = useState(false);
  const [pickUpModalVisible, setPickUpModalVisible] = useState(false);
  const [deliveredModalVisible, setDeliveredModalVisible] = useState(false);

  const order = orders[0];

  let imageSource = categories.find(
    category => category?.title === order.typeOfVehicle,
  );
  imageSource = imageSource?.icon;

  const RatingModal = () => {
    return (
      <CustomModal
        visible={ratingModalVisible}
        setVisible={setRatingModalVisible}>
        <View className="w-full items-center justify-center mb-4">
          <Title className="mb-2" xl semibold primary>
            Leave a Rating
          </Title>
          <Rating
            className="mb-10"
            rating={rating}
            setRating={setRating}
            style={{height: 32, marginRight: 5}}
          />
          <Button
            half
            title="Done"
            onPress={() => {
              navigation.navigate('Home');
              setRatingModalVisible(false);
            }}
          />
        </View>
      </CustomModal>
    );
  };

  const PickUpModal = () => {
    const onPress = bool => {
      setPicked(bool);
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
            onPress={() => setRatingModalVisible(true)}
            title="Delivered"
          />
        </View>
      </CustomModal>
    );
  };

  return (
    <Linear>
      <Header title="Order" />
      <View className="flex-1 w-full -mt-5">
        <PickUpModal />
        <DeliveredModal />

        <View className="flex-row items-center justify-between">
          <View className="flex-1" />
          <Button title="Report" danger mini />
        </View>
        <View className="w-full items-center justify-between flex-1 mt-0 ">
          <Card>
            <View className="w-full flex-row items-center justify-between border-b border-primary pb-5 pt-2 px-1">
              {driver ? (
                <View className="items-start">
                  <Title className="pb-1" bold primary>
                    Name: <Title>John Doe</Title>
                  </Title>
                  <Rating rating={4.5} style={{width: 15, height: 15}} />
                </View>
              ) : (
                <View className="items-start justify-center">
                  <Image source={imageSource} style={styleConstants.icon} />
                  <Title xsm>{order?.typeOfVehicle}</Title>
                </View>
              )}
              <View className="items-end justify-center">
                <Title lg bold>
                  {order?.date}
                </Title>
                <Title className="pt-0 mt-0" xsm bold primary>
                  Status: <Title xsm>{order?.substatus}</Title>
                </Title>
              </View>
            </View>
            {!driver && (
              <View className="w-full items-center justify-between flex-row py-5 border-b border-primary px-1">
                <Title sm bold left primary>
                  Name: <Title sm>{order?.driverName}</Title>
                </Title>
                <Title bold right>
                  {order?.vehicleNumber}
                </Title>
              </View>
            )}
            <View className="w-full items-start justify-center py-8 border-b border-primary gap-y-6 px-1 ">
              <Title
                className="tracking-wide leading-5"
                numberOfLines={3}
                press
                left
                bold
                primary
                sm>
                Pick Up Location: <Title sm>{order?.pickUp}</Title>
              </Title>

              <Title
                className="tracking-wide leading-5"
                numberOfLines={3}
                press
                left
                bold
                primary
                sm>
                Destination Location: <Title sm>{order?.destination}</Title>
              </Title>
            </View>
            <View className="w-full pt-6 pb-3 flex-row items-center justify-between px-1">
              <Title className="tracking-widest" bold primary>
                Price:{' '}
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
            {!picked && (
              <Button
                className="my-2 w-full"
                title="Confirm PickUp"
                onPress={() => setPickUpModalVisible(true)}
              />
            )}
          </Card>

          <Card>
            {ratingModalVisible && <RatingModal />}
            <View className="items-center justify-between w-full flex-row">
              {!picked && (
                <Button
                  title="Cancel"
                  half
                  card
                  border
                  onPress={() => navigation.goBack('')}
                />
              )}
              <Button
                title="Call"
                half
                onPress={() => navigation.navigate('Call')}
              />
              {picked && driver && (
                <Button
                  title="Delivered"
                  half
                  success
                  className="flex-1 ml-2"
                  onPress={() => setDeliveredModalVisible(true)}
                />
              )}
            </View>
          </Card>
        </View>
      </View>
    </Linear>
  );
};

export default React.memo(Order);
