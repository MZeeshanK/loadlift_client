import React from 'react';
import { StyleSheet, Pressable, useColorScheme } from 'react-native';

const Card = ({ children, style, ...props }) => {
  const colorScheme = useColorScheme();

  const card = colorScheme === 'dark' ? colors.card : colors.lightCard;
  const ongoing = colorScheme === 'dark' ? colors.ongoing : colors.lightOngoing;
  const danger = colorScheme === 'dark' ? colors.danger : colors.lightDanger;

  return (
    <Pressable
      onPress={props.onPress && props.onPress}
      className={`rounded-xl p-4 my-3 items-center w-full justify-center`}
      style={[
        styles.container,
        {
          backgroundColor: props.ongoing
            ? ongoing
            : props.danger
            ? danger
            : card,
        },
        Array.isArray(style) ? [...style] : style,
      ]}>
      {children}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    elevation: 1.8,
  },
});

export default React.memo(Card);
