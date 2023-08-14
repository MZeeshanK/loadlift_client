import React, {useEffect, useRef} from 'react';
import {Animated, useColorScheme} from 'react-native';

import Title from '../Title';

import {useDispatch, useSelector} from 'react-redux';
import colors from '../../constants/colors';
import {removeError, removeModal, removeModalError} from '../../store/misc';

const Alert = () => {
  const colorScheme = useColorScheme();
  const dispatch = useDispatch();

  const danger = colorScheme === 'dark' ? colors.danger : colors.dangerLight;
  const ongoing = colorScheme === 'dark' ? colors.ongoing : colors.ongoingLight;

  const {message, visible} = useSelector(state => state.misc.error);

  const animation = useRef(new Animated.Value(0)).current;

  const animationDuration = 200;

  const startAnimation = () => {
    Animated.timing(animation, {
      toValue: visible ? 1 : 0,
      duration: animationDuration,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    setTimeout(() => {
      if (visible) {
        if (modal) {
          dispatch(removeModalError());
          setTimeout(() => {
            dispatch(removeModal());
          }, animationDuration * 2);
        } else {
          dispatch(removeError());
        }
      }
    }, 2000);

    startAnimation();
  }, [visible]);

  return (
    <>
      <Animated.View
        className={`z-10 absolute top-24 left-[10] right-[10] py-2 rounded-full items-center justify-center border-2`}
        style={{
          transform: [
            {
              translateY: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [-100, 0],
              }),
            },
            {
              scaleY: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
              }),
            },
            {
              scale: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
              }),
            },
          ],
          backgroundColor: danger,
          borderColor: ongoing,
        }}>
        <Title
          base
          bold
          xsm={modal}
          semibold={modal}
          className="tracking-wider">
          {message}
        </Title>
      </Animated.View>
    </>
  );
};

export default React.memo(Alert);
