import React from 'react';
import {StyleSheet, Pressable} from 'react-native';

import colors from '../../constants/colors';

const Card = ({children, style, onPress}) => {
  return (
    <Pressable
      onPress={onPress}
      className="rounded-xl my-3 border-primary items-center justify-center"
      style={[styles.container, style]}>
      {children}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    // borderWidth: 4,
    backgroundColor: 'rgba(106,129,120,.2)',
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 0,
    },
    elevation: 4,
  },
});

export default React.memo(Card);
