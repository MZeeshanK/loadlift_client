import React, {useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  useColorScheme,
  Animated,
  Pressable,
} from 'react-native';
import Card from '../Card';
import Title from '../Title';
import {useDispatch, useSelector} from 'react-redux';
import {removePopUp, setPopUp} from '../../store/misc';
import colors from '../../constants/colors';

const {width} = Dimensions.get('window');

const PopUp = () => {
  const dispatch = useDispatch();
  const colorScheme = useColorScheme();

  const {visible, message} = useSelector(state => state.misc.popUp);

  const animation = useRef(new Animated.Value(0)).current;

  const animationDuration = 1000;

  const startAnimation = () => {
    Animated.timing(animation, {
      toValue: visible ? 1 : 0,
      duration: animationDuration,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        dispatch(removePopUp());
      }, 3000);
    }

    startAnimation();
  }, [visible]);

  const ongoing = colorScheme === 'dark' ? colors.ongoing : colors.lightOngoing;
  const primary = colorScheme === 'dark' ? colors.primary : colors.lightPrimary;

  return (
    <Animated.View
      className="absolute py-2 px-5 top-24 rounded-lg z-20 border"
      style={{
        backgroundColor: ongoing,
        aspectRatio: 1,
        alignSelf: 'center',
        borderColor: primary,
        opacity: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
        }),
        transform: [
          {
            scale: animation.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1],
            }),
          },
        ],
      }}>
      <Title xsm semibold className="tracking-widest">
        Success
      </Title>
    </Animated.View>
  );
};

export default React.memo(PopUp);
