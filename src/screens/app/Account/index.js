import React, {useState} from 'react';
import {ScrollView, View, Image, Pressable, useColorScheme} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import Linear from '../../../components/Linear';
import Header from '../../../components/Header';
import Card from '../../../components/Card';
import Rating from '../../../components/Rating';
import Button from '../../../components/Button';
import Title from '../../../components/Title';
import CustomModal from '../../../components/CustomModal';

import colors from '../../../constants/colors';
import categories from '../../../data/categories';

import {useSelector, useDispatch} from 'react-redux';
import {userLogout} from '../../../store/user';

const Account = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const colorScheme = useColorScheme();

  const primary = colorScheme === 'dark' ? colors.primary : colors.lightPrimary;

  const [modalVisible, setModalVisible] = useState(false);

  const {type: userType, data: user} = useSelector(state => state.user);

  // Selecting vehicle details from categories
  let vehicleImage, vehicleTitle;
  if (userType === 'driver') {
    const vehicle = categories.find(
      category => category.value === user?.typeOfVehicle,
    );

    vehicleTitle = vehicle.title;
    vehicleImage = colorScheme === 'dark' ? vehicle?.icon : vehicle?.darkIcon;
  }

  const Modal = () => {
    return (
      <CustomModal visible={modalVisible} setVisible={setModalVisible}>
        <Title xxl bold className="mt-2 leading-8">
          Are You Sure you want to logout?
        </Title>
        <View
          className="w-full h-[1] my-5 "
          style={{backgroundColor: primary}}
        />
        <View className="w-full px-2 mt-2 mb-5 flex-row items-center justify-center">
          <Button
            title="No"
            className="mr-2"
            half
            onPress={() => setModalVisible(false)}
          />
          <Button
            title="Yes"
            className="ml-2"
            danger
            half
            onPress={() => {
              dispatch(userLogout());
              setModalVisible(false);
            }}
          />
        </View>
      </CustomModal>
    );
  };

  return (
    <Linear>
      <Header title="Account" isBack={false} />

      <Modal />
      <ScrollView
        className="w-full flex-1"
        showsVerticalScrollIndicator={false}>
        {/* Vehicle info */}
        {userType === 'driver' && (
          <Card>
            <View className="items-center justify-center w-full pb-5 ">
              <Image
                source={vehicleImage}
                style={{
                  width: 100,
                  height: 37,
                }}
              />
            </View>
            <View className="w-full flex-row items-center justify-between">
              <Title semibold lg>
                {vehicleTitle}
              </Title>
              <Title semibold lg>
                {user?.vehicleNumber}
              </Title>
            </View>
          </Card>
        )}

        {/* User Profile info */}
        <Card onPress={() => navigation.navigate('Profile')}>
          <View className=" w-full flex-row justify-between items-center">
            <View className="flex-1 items-start justify-around">
              <Title
                numberOfLines={1}
                className="tracking-wider mb-2"
                xxl
                semibold>
                {user?.firstName} {user?.lastName}
              </Title>
              {userType === 'driver' && (
                <View className="flex-row items-center justify-center">
                  <Title lg bold className="mr-2 mt-1">
                    {user?.numReviews}
                  </Title>
                  <Rating rating={user?.ratings} />
                </View>
              )}
            </View>
            <Image
              source={
                colorScheme === 'dark'
                  ? require('../../../assets/account-focused.png')
                  : require('../../../assets/account-light.png')
              }
              className="w-16 h-16"
            />
          </View>
          <View className="flex-row items-center justify-between mt-5 mb-2 w-full">
            <Title lg bold>
              +91 {user?.phone}
            </Title>
            <Button
              title="Update Profile"
              mini
              onPress={() => navigation.navigate('Profile')}
            />
          </View>
        </Card>

        {/* Payment Settings button */}
        <Card
          onPress={() => navigation.navigate('PaymentMethod')}
          className="flex-1">
          <Image
            source={
              colorScheme === 'dark'
                ? require('../../../assets/wallet.png')
                : require('../../../assets/wallet-light.png')
            }
            className="h-[36] w-[39]"
          />
          <Title className="pt-2 tracking-wider" semibold>
            Payment
          </Title>
        </Card>

        {/* Other Settings Card */}
        <Card className="py-1 px-0">
          {userType === 'user' && (
            <Pressable
              onPress={() => navigation.navigate('NotFound')}
              className="w-full items-start border-b p-2 px-5 justify-center"
              style={{borderColor: primary}}>
              <Title className="py-1 tracking-wider" lg bold>
                Switch to Driver's Account
              </Title>
            </Pressable>
          )}

          <Pressable
            onPress={() => navigation.navigate('NotFound')}
            className="w-full items-start border-b p-2 px-5 justify-center"
            style={{borderColor: primary}}>
            <Title className="py-1 tracking-wider" lg bold>
              FAQ's
            </Title>
          </Pressable>

          <Pressable
            onPress={() => navigation.navigate('NotFound')}
            className="w-full items-start border-b p-2 px-5 justify-center"
            style={{borderColor: primary}}>
            <Title className="py-1 tracking-wider" lg bold>
              Rate Us
            </Title>
          </Pressable>

          <Pressable
            onPress={() => navigation.navigate('NotFound')}
            className="w-full items-start border-b p-2 px-5 justify-center"
            style={{borderColor: primary}}>
            <Title className="py-1 tracking-wider" lg bold>
              Contact Us
            </Title>
          </Pressable>

          <Pressable
            onPress={() => setModalVisible(true)}
            className="w-full items-start p-2 px-5 justify-center"
            style={{borderColor: primary}}>
            <Title className="py-1 tracking-wider" lg bold>
              Logout
            </Title>
          </Pressable>
        </Card>
      </ScrollView>
    </Linear>
  );
};

export default React.memo(Account);
