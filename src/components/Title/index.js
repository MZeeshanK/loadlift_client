import React, { useState } from 'react';
import { Text, useColorScheme } from 'react-native';
import colors from '../../constants/colors';

const Title = ({ children, style, ...props }) => {
  const colorScheme = useColorScheme();

  const [lines, setLines] = useState(props.numberOfLines || 10);

  const normal = colorScheme === 'dark' ? colors.white : colors.black;
  const black = colorScheme === 'dark' ? colors.black : colors.white;
  const primary = colorScheme === 'dark' ? colors.primary : colors.lightPrimary;

  const danger = colors.danger;

  return (
    <Text
      // onPress={props.press && (() => setLines(10))}
      onPress={props.onPress}
      numberOfLines={lines}
      className={`pt-1 text-center ${props.left && 'text-left'} ${
        props.right && 'text-right'
      } ${props.center && 'text-center'}`}
      style={[
        {
          fontFamily: props.bold
            ? 'Poppins-Bold'
            : props.light
            ? 'Poppins-Light'
            : props.medium
            ? 'Poppins-Medium'
            : props.semibold
            ? 'Poppins-SemiBold'
            : 'Poppins-Regular',
          color: props.black
            ? black
            : props.primary
            ? primary
            : props.darkGrey
            ? colors.darkGrey
            : props.danger
            ? danger
            : props.white
            ? colors.white
            : normal,
          fontSize: props.xxs
            ? 8
            : props.xxsm
            ? 10
            : props.xsm
            ? 12
            : props.sm
            ? 14
            : props.base
            ? 16
            : props.lg
            ? 18
            : props.xl
            ? 20
            : props.xxl
            ? 24
            : 14,
        },

        style,
      ]}>
      {children}
    </Text>
  );
};

export default React.memo(Title);
