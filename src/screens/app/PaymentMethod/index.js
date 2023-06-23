import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Linear from '../../../components/Linear';
import Header from '../../../components/Header';

const PaymentMethod = () => {
  return (
    <Linear>
      <Header title="Payment Method" />
      <View>
        <Text>PaymentMethod</Text>
      </View>
    </Linear>
  );
};

const styles = StyleSheet.create({});

export default React.memo(PaymentMethod);
