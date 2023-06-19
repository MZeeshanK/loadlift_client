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
    backgroundColor: 'rgba(39,47,48,.2)',
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 0,
    },
    // elevation: 1,
  },
});

export default React.memo(Card);
