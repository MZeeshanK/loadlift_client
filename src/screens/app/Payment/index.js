import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Linear from '../../../components/Linear';
import Header from '../../../components/Header';

const Payment = () => {
  return (
    <Linear>
      <Header title="Payment" />
      <View>
        <Text>Payment</Text>
      </View>
    </Linear>
  );
};

const styles = StyleSheet.create({});

export default React.memo(Payment);
