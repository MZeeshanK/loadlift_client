import React from 'react';
import { View } from 'react-native';

import Linear from '../../components/Linear';
import Header from '../../components/Header';
import Button from '../../components/Button';
import Title from '../../components/Title';

const NotFound = ({ navigation }) => {
  return (
    <Linear>
      <Header title="Not Found" isBack />
      <View className="flex-1 items-center justify-around">
        <Title style={{ fontSize: 44 }} bold className="tracking-wider">
          Not Found
        </Title>
        <Button onPress={() => navigation.goBack()} title="Go Back" />
      </View>
    </Linear>
  );
};

export default React.memo(NotFound);
