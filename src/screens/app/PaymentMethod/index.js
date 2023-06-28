import React from 'react';
import {ScrollView} from 'react-native';

import Linear from '../../../components/Linear';
import Header from '../../../components/Header';
import Button from '../../../components/Button';
import PaymentDetails from '../../../components/PaymentDetails';

const Payment = ({navigation}) => {
  return (
    <Linear>
      <Header title="Payment" />
      <ScrollView
        className="w-full flex-1"
        contentContainerStyle={{
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <PaymentDetails />
      </ScrollView>
      <Button
        title="Get Premium"
        className="mt-10 mb-5"
        onPress={() => navigation.navigate('Premium')}
      />
    </Linear>
  );
};

export default React.memo(Payment);
