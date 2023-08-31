import React, {useEffect, useRef} from 'react';
import {Dimensions, Animated, View, useColorScheme} from 'react-native';
import Card from '../Card';

const {width, height} = Dimensions.get('window');

const Loader = ({...props}) => {
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

  const cardWidth = width / 5 + 40;

  return (
    <View
      className="absolute top-0 z-10 right-0 left-0 bottom-0 flex-1 items-center justify-center"
      style={{height: height, backgroundColor: 'rgba(0,0,0,.2)'}}>
      <Card
        className="absolute z-20"
        style={{
          width: cardWidth,
          height: cardWidth,
        }}>
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
            width: width / 5,
            height: width / 5,
          }}
          source={
            colorScheme === 'dark'
              ? require('../../assets/loader.png')
              : require('../../assets/loader-light.png')
          }
        />
      </Card>
    </View>
  );
};

export default React.memo(Loader);
