import React from 'react';
import {View, StyleSheet, ScrollView, Image, Pressable} from 'react-native';
import Linear from '../../../components/Linear';
import Header from '../../../components/Header';
import Title from '../../../components/Title';
import Card from '../../../components/Card';
import Button from '../../../components/Button';

const Payment = ({navigation}) => {
  const upi = [
    {
      title: 'gPay',
      image: require('../../../assets/gpay.png'),
    },
    {
      title: 'phonePe',
      image: require('../../../assets/phonepe.png'),
    },
    {
      title: 'paytm',
      image: require('../../../assets/paytm.png'),
    },
  ];

  return (
    <Linear>
      <Header title="Payment" />
      <ScrollView
        className="w-full flex-1"
        contentContainerStyle={{
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Card className="w-full flex-row px-6 py-2 justify-between items-center">
          <Title xl bold className="tracking-wide">
            LoadCoin
          </Title>
          <View className="flex-row items-center justify-center">
            <Image
              source={require('../../../assets/loadcoin.png')}
              className="w-6 h-6 mr-3"
            />
            <Title lg semibold>
              170
            </Title>
          </View>
        </Card>
        <Card className="px-6 py-4">
          <Title className="w-full" sm left bold>
            UPI
          </Title>
          <View className="items-center justify-start w-full flex-row p-4 pt-2">
            {upi.map(item => (
              <View
                className="p-1 mr-5 rounded-md bg-ongoing"
                style={{elevation: 1}}>
                <Image
                  key={item.title}
                  className="h-10 w-10"
                  source={item.image}
                />
              </View>
            ))}
          </View>
        </Card>

        <Card className="px-6 py-4">
          <Title className="w-full" sm left bold>
            Credit / Debit / ATM Card
          </Title>

          <Pressable className="bg-ongoing my-3 flex-row items-center justify-between w-full px-4 py-1 rounded-full">
            <Title lg bold left>
              John Doe
            </Title>
            <Title base semibold right>
              XXXX 8573
            </Title>
          </Pressable>
          <Pressable className="bg-[#272f30] my-3 flex-row items-center justify-between w-full px-4 py-1 rounded-full">
            <Title lg bold left>
              John Doe
            </Title>
            <Title base semibold right>
              XXXX 8573
            </Title>
          </Pressable>
          <View className="flex-row items-center justify-between my-3 w-full">
            <Button title="Remove Card" card mini />
            <Button title="Add Card" mini />
          </View>
        </Card>
      </ScrollView>
      <Button
        title="Get Premium"
        className="mt-10 mb-5"
        onPress={() => navigation.navigate('Premium')}
      />
    </Linear>
  );
};

const styles = StyleSheet.create({});

export default React.memo(Payment);
