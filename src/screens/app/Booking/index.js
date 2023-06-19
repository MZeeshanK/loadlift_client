import React from 'react';
import {Text, StyleSheet} from 'react-native';
import Linear from '../../../components/Linear';
import Header from '../../../components/Header';

const Booking = () => {
  return (
    <Linear>
      <Header title="Booking" />
      <Text>Booking</Text>
    </Linear>
  );
};

const styles = StyleSheet.create({});

export default React.memo(Booking);
