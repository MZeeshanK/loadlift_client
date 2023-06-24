import React from 'react';
import {View, Image, Text} from 'react-native';

import Button from '../../components/Button';
import Linear from '../../components/Linear';

const Splash = ({navigation}) => {
  const next = () => navigation.navigate('Tabs');

  return (
    <Linear>
      <View className="flex-1 items-center justify-between">
        <View className="items-center justify-center pt-24">
          <Image
            source={require('../../assets/logo.png')}
            className="mb-16 opacity-50"
          />
          <Text className="text-white text-2xl font-bold text-center leading-8 tracking-wider">
            Delivering convenience to your doorstep
          </Text>
        </View>
        <Button
          title="Get Started"
          max
          onPress={next}
          style={{marginBottom: 100}}
        />
      </View>
    </Linear>
  );
};

export default React.memo(Splash);
