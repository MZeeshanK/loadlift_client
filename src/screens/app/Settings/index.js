import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Linear from '../../../components/Linear';
import Header from '../../../components/Header';

const Settings = () => {
  return (
    <Linear>
      <Header title="Settings" />
      <View>
        <Text>Settings</Text>
      </View>
    </Linear>
  );
};

const styles = StyleSheet.create({});

export default React.memo(Settings);
