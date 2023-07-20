import React, {useEffect, useRef} from 'react';
import {Dimensions, Animated, View, useColorScheme} from 'react-native';

const {width} = Dimensions.get('window');

const Loader = ({style, ...props}) => {
  const colorScheme = useColorScheme();

  const animation = useRef(new Animated.Value(0)).current;

  const startAnimation = () => {
    Animated.loop(
      Animated.timing(animation, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ).start();
  };

  useEffect(() => {
    startAnimation();
  }, []);

  return (
    <View className="w-full flex-1 items-center justify-center">
      <Animated.Image
        style={{
          transform: [
            {
              rotate: animation.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '360deg'],
              }),
            },
          ],
          width: width / 3,
          height: width / 3,
        }}
        source={
          colorScheme === 'dark'
            ? require('../../assets/loader.png')
            : require('../../assets/loader-light.png')
        }
      />
    </View>
  );
};

export default React.memo(Loader);
