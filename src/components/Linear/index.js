import React from 'react';
import {SafeAreaView, Dimensions, StyleSheet} from 'react-native';
import colors from '../../constants/colors';

const {height} = Dimensions.get('window');

const Linear = ({children, style}) => {
  return (
    <SafeAreaView
      className="flex-1 items-center p-4"
      style={[styles.container, style]}>
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: height,
    backgroundColor: colors.background,
  },
});

export default React.memo(Linear);
