import React from 'react';
import {View, StyleSheet} from 'react-native';
import Linear from '../../components/Linear';

const ComingSoon = () => {
  return (
    <Linear>
      <View className="flex-1 w-full items-center justify-center">
        <Text className="text-xl text-white font-bold">Coming Soon</Text>
      </View>
    </Linear>
  );
};

const styles = StyleSheet.create({});

export default React.memo(ComingSoon);
