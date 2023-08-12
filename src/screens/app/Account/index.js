import React, {useEffect, useState} from 'react';
import {ScrollView, View, Image, Pressable, useColorScheme} from 'react-native';

import Linear from '../../../components/Linear';
import Header from '../../../components/Header';
import Card from '../../../components/Card';
import Rating from '../../../components/Rating';
import Button from '../../../components/Button';
import Title from '../../../components/Title';
import CustomModal from '../../../components/UserDetails/CustomModal';

import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {userLogout} from '../../../store/user';
import colors from '../../../constants/colors';
import DriverRate from './DriverRate';

const accountOptions = [
  {
    title: 'Settings',
    screen: 'Settings',
  },
  {
    title: "Switch to Driver's Account",
    screen: 'AccountSwitch',
    userOnly: true,
  },
  {
    title: "Switch to User's Account",
    screen: 'AccountSwitch',
    driverOnly: true,
  },
  {
    title: 'Rate Us',
    //  Todo
  },
  {
    title: 'Contact Us',
    //  TODO
  },
  {
    title: 'Logout',
  },
];

const userAccountOptions = accountOptions.filter(option => !option.driverOnly);
const driverAccountOptions = accountOptions.filter(option => !option.userOnly);

const Account = ({}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const colorScheme = useColorScheme();

  const primary = colorScheme === 'dark' ? colors.primary : colors.lightPrimary;

  const [modalVisible, setModalVisible] = useState(false);

  const {
    type: userType,
    data: user,
    token: userToken,
  } = useSelector(state => state.user);

  useEffect(() => {
    if (!userToken) {
      navigation.reset();
    }
  }, [userToken]);

  const selectedOptions =
    userType === 'driver' ? driverAccountOptions : userAccountOptions;

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
        {userType === 'driver' && (
          <Card>
            <View className="items-center justify-center w-full pb-5 ">
              <Image
                source={
                  colorScheme === 'dark'
                    ? require('../../../assets/mini-truck-light.png')
                    : require('../../../assets/mini-truck-dark.png')
                }
                style={{
                  width: 100,
                  height: 37,
                }}
              />
            </View>
            <View className="w-full flex-row items-center justify-between">
              <Title semibold lg>
                Mini Truck
              </Title>
              <Title semibold lg>
                JK01AA 1234
              </Title>
            </View>
          </Card>
        )}

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
              <Rating rating={4} />
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

        <View className="w-full flex-row items-center justify-center space-x-4">
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
        </View>

        {userType === 'driver' && <DriverRate />}
        {/* <DriverRate /> */}

        <Card className="py-1 px-0">
          {selectedOptions.map((item, index) => (
            <Pressable
              key={index}
              onPress={
                item?.screen
                  ? () => navigation.navigate(item?.screen)
                  : item?.title === 'Logout'
                  ? () => setModalVisible(true)
                  : () => navigation.navigate('NotFound')
              }
              className={`w-full items-start ${
                index !== selectedOptions.length - 1 && 'border-b'
              } p-2 px-5 justify-center`}
              style={{borderColor: primary}}>
              <Title className="py-1 tracking-wider" lg bold>
                {item.title}
              </Title>
            </Pressable>
          ))}
        </Card>
      </ScrollView>
    </Linear>
  );
};

export default React.memo(Account);
