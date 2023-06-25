import React from 'react';
import {StyleSheet, Pressable} from 'react-native';
import Title from '../Title';

const InputButton = ({title, onPress}) => {
  return (
    <Pressable
      onPress={onPress}
      className="bg-white w-full my-4 rounded-full px-4 py-1"
      style={{elevation: 1}}>
      <Title left semibold darkGrey>
        {title}
      </Title>
    </Pressable>
  );
};

const styles = StyleSheet.create({});

export default React.memo(InputButton);
