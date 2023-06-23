import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Linear from '../../../components/Linear';
import Header from '../../../components/Header';

const Order = () => {
  return (
    <Linear>
      <Header title="Order" />
      <View>
        <Text>Order</Text>
      </View>
    </Linear>
  );
};

const styles = StyleSheet.create({});

export default React.memo(Order);
