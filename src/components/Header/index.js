import React, {useRef, useEffect} from 'react';
import {Image, Pressable, useColorScheme, Animated} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import Title from '../Title';
import {useDispatch} from 'react-redux';
import {setLoading} from '../../store/misc';

const Header = ({isBack, expand, isInverted, title, style, onPress}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const colorScheme = useColorScheme();

  const animation = useRef(new Animated.Value(0)).current;

  const startAnimation = () => {
    Animated.timing(animation, {
      toValue: isInverted ? 1 : 0,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const goBack = () => {
    dispatch(setLoading(false));
    navigation.goBack();
  };

  useEffect(() => {
    if (onPress) {
      startAnimation();
    }
  }, [isInverted]);

  return (
    <Pressable
      onPress={expand && onPress}
      className="flex-row w-full items-center justify-center bg-transparent fixed top-0 left-0 right-0 -my-2 mb-2"
      style={style}>
      {isBack && (
        <Pressable
          className="absolute left-0 h-full justify-center"
          onPress={goBack}>
          <Image
            className="w-5 h-5"
            source={
              colorScheme === 'dark'
                ? require('../../assets/back.png')
                : require('../../assets/back-light.png')
            }
          />
        </Pressable>
      )}
      <Title lg bold primary className="tracking-widest">
        {title}
      </Title>

      {expand && (
        <Pressable
          className="absolute right-0 h-full justify-center"
          onPress={onPress}>
          <Animated.Image
            className="w-5 h-3"
            style={{
              transform: [
                {
                  rotate: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '180deg'],
                  }),
                },
              ],
            }}
            source={
              colorScheme === 'dark'
                ? require('../../assets/chevron.png')
                : require('../../assets/chevron-light.png')
            }
          />
        </Pressable>
      )}
    </Pressable>
  );
};

Header.defaultProps = {
  isBack: true,
};

export default React.memo(Header);
