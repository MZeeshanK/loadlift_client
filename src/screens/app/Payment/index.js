import React from 'react';
import {View, ScrollView} from 'react-native';
import Linear from '../../../components/Linear';
import Header from '../../../components/Header';
import Title from '../../../components/Title';
import Card from '../../../components/Card';
import Button from '../../../components/Button';
import PaymentDetails from '../../../components/PaymentDetails';

const Payment = ({navigation}) => {
  return (
    <Linear>
      <Header title="Payment" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="w-full flex-1"
        contentContainerStyle={{
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Card className="flex-row justify-between px-6 py-2">
          <Title xl bold>
            Amount Payable:{' '}
          </Title>
          <Title lg semibold>
            {'\u20b9'} 1100
          </Title>
        </Card>

        <PaymentDetails />
      </ScrollView>
      <View className="w-full flex-row items-center justify-around my-5 ">
        <Button title="Use Coin" />
        <Button
          title="Pay Now"
          onPress={() => navigation.navigate('PaymentDone')}
        />
      </View>
    </Linear>
  );
};

export default React.memo(Payment);
