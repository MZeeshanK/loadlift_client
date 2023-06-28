import React, {useState} from 'react';
import {ScrollView, View, Image, Pressable} from 'react-native';

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
  const [driver, setDriver] = useState(true);

  return (
    <Linear>
      <Header title="Account" isBack={false} />
      <ScrollView
        className="w-full flex-1"
        showsVerticalScrollIndicator={false}>
        {driver && (
          <Card>
            <View className="items-center justify-center w-full pb-5 ">
              <Image
                source={require('../../../assets/mini-truck-light.png')}
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
            onPress={() => navigation.navigate('PaymentMethod')}
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
        <Card className="py-1">
          {accountOptions.map((item, index) => (
            <Pressable
              key={index}
              onPress={
                item?.screen
                  ? () => navigation.navigate(item?.screen)
                  : () => navigation.navigate('NotFound')
              }
              className={`w-full items-start border-primary ${
                index !== accountOptions.length - 1 && 'border-b'
              } p-2 px-2 justify-center`}>
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
