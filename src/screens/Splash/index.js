import React from 'react';
import {View, Image, Text} from 'react-native';

import Button from '../../components/Button';
import Linear from '../../components/Linear';

const Splash = ({navigation}) => {
  const next = () => navigation.navigate('Login');

  return (
    <Linear>
      <View className="items-center justify-between pt-24">
        <Text className="text-white text-2xl font-semibold text-center leading-8 tracking-wider">
          Delivering convenience to your doorstep
        </Text>
        <Image
          source={require('../../assets/logo.png')}
          className="mt-16 opacity-50"
        />
      </View>
      <Button
        title="Get Started"
        onPress={next}
        style={{marginBottom: 100, width: '75%'}}
      />
    </Linear>
  );
};

export default React.memo(Splash);
