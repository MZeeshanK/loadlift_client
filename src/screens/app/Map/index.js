import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

import Linear from '../../../components/Linear';
import Header from '../../../components/Header';

const Map = () => {
  return (
    <Linear>
      <Header title="Map" />
      <View className="flex-1">
        <Text>Map</Text>
      </View>
    </Linear>
  );
};

const styles = StyleSheet.create({});

export default React.memo(Map);
