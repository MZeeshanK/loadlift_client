import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Linear from '../../../components/Linear';

const Call = () => {
  return (
    <Linear>
      <View className="flex-1">
        <Text>Call</Text>
      </View>
    </Linear>
  );
};

const styles = StyleSheet.create({});

export default React.memo(Call);
