import React from 'react';

import Linear from '../../../components/Linear';
import Header from '../../../components/Header';
import Card from '../../../components/Card';
import Title from '../../../components/Title';
import {TouchableOpacity, useColorScheme} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const Settings = () => {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();

  const primary = colorScheme === 'dark' ? colors.primary : colors.lightPrimary;
  return (
    <Linear>
      <Header title="Settings" />

      <Card className="p-0">
        <TouchableOpacity
          onPress={() => navigation.navigate('LocationSettings')}
          className="w-full border-b py-2 px-4"
          style={{borderColor: primary}}>
          <Title left base semibold className="w-full">
            Location Settings
          </Title>
        </TouchableOpacity>

        <TouchableOpacity
          className="w-full border-b py-2 px-4"
          style={{borderColor: primary}}>
          <Title left base semibold className="w-full">
            Theme
          </Title>
        </TouchableOpacity>

        <TouchableOpacity
          className="w-full border-b py-2 px-4"
          style={{borderColor: primary}}>
          <Title left base semibold className="w-full">
            Call Settings
          </Title>
        </TouchableOpacity>

        <TouchableOpacity className="w-full py-2 px-4">
          <Title left base semibold className="w-full">
            Payment Settings
          </Title>
        </TouchableOpacity>
      </Card>
    </Linear>
  );
};

export default React.memo(Settings);
