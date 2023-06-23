import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Linear from '../../../components/Linear';
import Header from '../../../components/Header';

const AccountSwitch = () => {
  return (
    <Linear>
      <Header title="Account Switch" />
      <View>
        <Text>AccountSwitch</Text>
      </View>
    </Linear>
  );
};

const styles = StyleSheet.create({});

export default React.memo(AccountSwitch);
