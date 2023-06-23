import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Linear from '../../../components/Linear';
import Header from '../../../components/Header';

const Premium = () => {
  return (
    <Linear>
      <Header title="Premium" />
      <View>
        <Text>Premium</Text>
      </View>
    </Linear>
  );
};

const styles = StyleSheet.create({});

export default React.memo(Premium);
