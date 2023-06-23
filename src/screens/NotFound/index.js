import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Linear from '../../components/Linear';
import Header from '../../components/Header';
import Button from '../../components/Button';

const NotFound = ({navigation}) => {
  return (
    <Linear>
      <Header title="Not Found" isBack />
      <View className="flex-1 items-center justify-around">
        <Text className="text-white text-5xl font-bold tracking-wider">
          Not Found
        </Text>
        <Button onPress={() => navigation.goBack()} title="Go Back" />
      </View>
    </Linear>
  );
};

const styles = StyleSheet.create({});

export default React.memo(NotFound);
