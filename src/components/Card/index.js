import React from 'react';
import {StyleSheet, Pressable} from 'react-native';

const Card = ({children, style, onPress, ...props}) => {
  return (
    <Pressable
      onPress={onPress}
      className={`rounded-xl p-4 my-3 items-center w-full justify-center bg-card ${
        props.alt && 'p-0'
      } ${props.border && 'border border-card'}`}
      style={[styles.container, Array.isArray(style) ? [...style] : style]}>
      {children}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    elevation: 2,
  },
});

export default React.memo(Card);
