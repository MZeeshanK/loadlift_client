import React from 'react';
import {SafeAreaView, Dimensions, StyleSheet} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

const {height} = Dimensions.get('window');

const Linear = ({children, style}) => {
  return (
    <LinearGradient
      colors={[colors.start, colors.end]}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}>
      <SafeAreaView
        style={[{height: height}, style]}
        className="items-center p-5">
        {children}
      </SafeAreaView>
    </LinearGradient>

    // <SafeAreaView
    //   style={[styles.container, style]}
    //   className="items-center justify-between p-5 bg-start">
    //   {children}
    // </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: height,
  },
});

export default React.memo(Linear);
