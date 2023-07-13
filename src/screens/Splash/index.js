import React from 'react';
import {View, Image, useColorScheme} from 'react-native';

import Button from '../../components/Button';
import Linear from '../../components/Linear';
import Title from '../../components/Title';

const Splash = ({navigation}) => {
  const colorScheme = useColorScheme();
  const next = () => navigation.navigate('Tabs');

  return (
    <Linear>
      <View className="flex-1 items-center justify-between">
        <View className="items-center justify-center pt-24">
          <Image
            source={
              colorScheme === 'dark'
                ? require('../../assets/logo.png')
                : require('../../assets/logo-light.png')
            }
            className="mb-16 opacity-50"
          />
          <Title bold xxl>
            Delivering convenience to your doorstep
          </Title>
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
