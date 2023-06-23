import React from 'react';
import {
  Text,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Pressable,
} from 'react-native';

import Linear from '../../../components/Linear';
import Header from '../../../components/Header';
import Card from '../../../components/Card';
import Rating from '../../../components/Rating';
import Button from '../../../components/Button';
import {useNavigation} from '@react-navigation/native';
import colors from '../../../constants/colors';

const accountOptions = [
  {
    title: 'Settings',
    screen: 'Settings',
  },
  {
    title: 'Switch to Driver_Account',
    screen: 'AccountSwitch',
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
    screen: 'Logout',
  },
];

const Account = () => {
  const navigation = useNavigation();

  return (
    <Linear>
      <Header title="Account" isBack={false} />
      <ScrollView className="w-full flex-1">
        <Card onPress={() => navigation.navigate('Profile')}>
          <View className=" w-full flex-row justify-between items-center">
            <View className="flex-1 items-start justify-around">
              <Text
                numberOfLines={1}
                className="text-white text-2xl font-semibold tracking-wider mb-2">
                John Doe
              </Text>
              <Rating rating={4} />
            </View>
            <Image
              source={require('../../../assets/account-focused.png')}
              className="w-16 h-16"
            />
          </View>
          <View className="flex-row items-center justify-between mt-5 mb-2 w-full">
            <Text className="font-bold text-white text-lg tracking-tighter">
              +91 94190 12345
            </Text>
            <Button
              title="Update Profile"
              mini
              onPress={() => navigation.navigate('Profile')}
            />
          </View>
        </Card>

        <View className="w-full flex-row items-center justify-between">
          <Card
            onPress={() => navigation.navigate('PaymentMethod')}
            className="flex-1 mr-3">
            <Image
              source={require('../../../assets/wallet.png')}
              className="h-[35] w-[40]"
            />
            <Text className="text-white font-semibold text-base pt-2 tracking-wider">
              Payment
            </Text>
          </Card>

          <Card
            onPress={() => navigation.navigate('Premium')}
            className="flex-1 ml-3">
            <Image
              source={require('../../../assets/premium.png')}
              className="h-[35] w-[40]"
            />
            <Text className="text-white font-semibold text-base pt-2 tracking-wider">
              Premium
            </Text>
          </Card>
        </View>
        <Card>
          {accountOptions.map((item, index) => (
            <Pressable
              key={index}
              onPress={
                item?.screen
                  ? () => navigation.navigate(item?.screen)
                  : () => navigation.navigate('NotFound')
              }
              className={`w-full items-start border-primary ${
                index !== accountOptions.length - 1 && 'border-b-2'
              } p-2 justify-center`}>
              <Text className="text-lg py-1 font-black text-white tracking-wider">
                {item.title}
              </Text>
            </Pressable>
          ))}
        </Card>
      </ScrollView>
    </Linear>
  );
};

const styles = StyleSheet.create({});

export default React.memo(Account);
