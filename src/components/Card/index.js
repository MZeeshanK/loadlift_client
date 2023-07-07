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
          borderWidth: 1,
          borderColor: props.ongoing ? colors.card : colors.ongoing,
        },
        Array.isArray(style) ? [...style] : style,
      ]}>
      {children}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    elevation: 3,
    // shadowColor: colors.black,
  },
});

export default React.memo(Card);
