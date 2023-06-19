import React from 'react';
import {Text, StyleSheet} from 'react-native';
import Linear from '../../../components/Linear';
import Header from '../../../components/Header';

const Activity = () => {
  return (
    <Linear>
      <Header title="Activity" isBack={false} />
      <Text>Activity</Text>
    </Linear>
  );
};

const styles = StyleSheet.create({});

export default React.memo(Activity);
