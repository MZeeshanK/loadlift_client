import React from 'react';
import {StyleSheet, Pressable, View} from 'react-native';

import colors from '../../constants/colors';

const Card = ({children, style, onPress}) => {
  return (
    <Pressable
      onPress={onPress}
      className="rounded-xl p-4 my-3 items-center justify-center"
      style={[styles.container, style]}>
      {children}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.cardBackground,
    elevation: 5,
  },
});

export default React.memo(Card);
