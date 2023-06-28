import React from 'react';
import {StyleSheet, Pressable} from 'react-native';

const Card = ({children, style, onPress, ...props}) => {
  return (
    <Pressable
      onPress={onPress}
      className={`rounded-xl p-4 my-3 items-center w-full justify-center`}
      style={[
        styles.container,
        {
          backgroundColor: props.ongoing
            ? colors.ongoing
            : props.danger
            ? colors.danger
            : colors.card,
        },
        Array.isArray(style) ? [...style] : style,
      ]}>
      {children}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: colors.ongoing,
    elevation: 3,
    shadowColor: colors.ongoing,
  },
});

export default React.memo(Card);
