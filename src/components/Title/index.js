import React, {useState} from 'react';
import {Text} from 'react-native';
import colors from '../../constants/colors';

const Title = ({children, style, ...props}) => {
  const [lines, setLines] = useState(props.numberOfLines || 10);

  return (
    <Text
      onPress={props.press && (() => setLines(10))}
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
            ? colors.black
            : props.primary
            ? colors.primary
            : props.darkGrey
            ? colors.darkGrey
            : props.danger
            ? colors.danger
            : colors.white,
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
