import React from 'react';
import {View, StyleSheet} from 'react-native';

const Card = ({children, style}) => {
  return (
    <View className="rounded-xl my-3" style={[styles.container, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.card,

    elevation: 1,
  },
});

export default React.memo(Card);
