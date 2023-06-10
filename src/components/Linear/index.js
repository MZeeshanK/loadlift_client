import React from 'react';
import {SafeAreaView, Dimensions} from 'react-native';

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
  );
};

export default React.memo(Linear);
