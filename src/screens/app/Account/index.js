import React from 'react';
import {Text, StyleSheet} from 'react-native';
import Linear from '../../../components/Linear';
import Header from '../../../components/Header';

const Account = () => {
  return (
    <Linear>
      <Header title="Account" isBack={false} />
      <Text>Account</Text>
    </Linear>
  );
};

const styles = StyleSheet.create({});

export default React.memo(Account);
