import React from 'react';
import {
  SafeAreaView,
  ImageBackground,
  Dimensions,
  StyleSheet,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

const {height} = Dimensions.get('window');

const Linear = ({children, style}) => {
  return (
    // Linear gradient
    // <LinearGradient
    //   className="flex-1"
    //   colors={[colors.start, colors.end]}
    //   start={{x: 0, y: 0}}
    //   end={{x: 1, y: 1}}>
    //   <SafeAreaView
    //     style={[styles.container, style]}
    //     className="items-center p-5">
    //     {children}
    //   </SafeAreaView>
    // </LinearGradient>

    // image gradient
    <ImageBackground
      className="flex-1"
      style={{backgroundPosition: 'center', backgroundSize: 'cover'}}
      source={require('../../assets/mesh-gradient.png')}>
      <SafeAreaView
        style={[styles.container, style]}
        className="items-center p-5">
        {children}
      </SafeAreaView>
    </ImageBackground>

    // solid background
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
    // backgroundColor: '#fff',
  },
});

export default React.memo(Linear);
