import React from 'react';
import { Animated, useColorScheme } from 'react-native';

import Title from '../Title';
import { useSelector } from 'react-redux';
import colors from '../../constants/colors';

const PopUp = () => {
  const colorScheme = useColorScheme();
  const { message } = useSelector(state => state.misc.popUp);
  // const message = 'Hello World Today!';

  const ongoing = colorScheme === 'dark' ? colors.ongoing : colors.lightOngoing;
  const primary = colorScheme === 'dark' ? colors.primary : colors.lightPrimary;

  const animation = new Animated.Value(0);

  Animated.timing(animation, {
    toValue: 1,
    duration: 1000,
    useNativeDriver: true,
  }).start();

  return (
    <Animated.View
      className="absolute z-10 top-16 py-2 px-5 rounded-lg"
      style={[
        { opacity: animation },
        {
          backgroundColor: ongoing,
          alignSelf: 'center',
          elevation: 2,
          borderWidth: 0.5,
          borderColor: primary,
        },
      ]}>
      <Title primary bold>
        {message}
      </Title>
    </Animated.View>
  );
};

export default PopUp;
