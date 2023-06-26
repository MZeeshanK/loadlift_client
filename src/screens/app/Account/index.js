import React from 'react';
import {Text, ScrollView, View, Image, Pressable} from 'react-native';

import Linear from '../../../components/Linear';
import Header from '../../../components/Header';
import Card from '../../../components/Card';
import Rating from '../../../components/Rating';
import Button from '../../../components/Button';
import Title from '../../../components/Title';

const accountOptions = [
  {
    title: 'Settings',
    screen: 'Settings',
  },
  {
    title: "Switch to Driver's Account",
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

const Account = ({navigation}) => {
  return (
    <Linear>
      <Header title="Account" isBack={false} />
      <ScrollView className="w-full flex-1">
        <Card onPress={() => navigation.navigate('Profile')}>
          <View className=" w-full flex-row justify-between items-center">
            <View className="flex-1 items-start justify-around">
              <Title
                numberOfLines={1}
                className="tracking-wider mb-2"
                xxl
                semibold>
                John Doe
              </Title>
              <Rating rating={4} />
            </View>
            <Image
              source={require('../../../assets/account-focused.png')}
              className="w-16 h-16"
            />
          </View>
          <View className="flex-row items-center justify-between mt-5 mb-2 w-full">
            <Title className="tracking-tighter" lg bold>
              +91 94190 12345
            </Title>
            <Button
              title="Update Profile"
              mini
              onPress={() => navigation.navigate('Profile')}
            />
          </View>
        </Card>

        <View className="w-full flex-row items-center justify-between">
          <Card
            onPress={() => navigation.navigate('Payment')}
            className="flex-1 mr-3">
            <Image
              source={require('../../../assets/wallet.png')}
              className="h-[30] w-[34]"
            />
            <Title className="pt-2 tracking-wider" semibold>
              Payment
            </Title>
          </Card>

          <Card
            onPress={() => navigation.navigate('Premium')}
            className="flex-1 ml-3">
            <Image
              source={require('../../../assets/premium.png')}
              className="h-[30] w-[34]"
            />
            <Title className="pt-2 tracking-wider" semibold>
              Premium
            </Title>
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
              } p-1 px-2 justify-center`}>
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
