import React, {useState} from 'react';
import {View, Image} from 'react-native';

import Linear from '../../../components/Linear';
import Title from '../../../components/Title';
import Button from '../../../components/Button';
import Header from '../../../components/Header';

const PaymentDone = ({navigation}) => {
  const [success, setSuccess] = useState(false);

  if (success) {
    setTimeout(() => {
      navigation.navigate('Home');
    }, 3000);
  }

  return (
    <Linear>
      <View className="h-full w-full items-center justify-between">
        <Header />
        <View className="w-full items-center justify-center mb-20">
          <Image
            className="w-32 h-32 mb-5"
            source={
              success
                ? require('../../../assets/success.png')
                : require('../../../assets/fail.png')
            }
          />
          <Title xxl semibold primary={success} danger={!success}>
            {success ? 'Payment Successful' : 'Payment Failed'}
          </Title>
        </View>

        {!success ? (
          <Button
            title="Retry"
            onPress={() => navigation.navigate('Payment')}
            className="mb-10"
          />
        ) : (
          <View />
        )}
      </View>
    </Linear>
  );
};

export default React.memo(PaymentDone);
