import React from 'react';
import {View, StyleSheet, Pressable, Text} from 'react-native';

const InputButton = ({title, onPress}) => {
  return (
    <Pressable
      onPress={onPress}
      className="bg-white w-full my-4 rounded-full px-5 py-1"
      style={{elevation: 1}}>
      <Text className="text-sm font-medium text-card tracking-wider">
        {title}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({});

export default React.memo(InputButton);