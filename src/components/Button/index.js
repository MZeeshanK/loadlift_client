import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import colors from '../../constants/colors';

const Button = ({title, onPress, style, ...props}) => {
  return (
    <TouchableOpacity
      className={`bg-primary rounded-full items-center justify-center px-20 py-1 ${
        props.mini && 'px-3'
      } ${props.medium && 'px-8'} ${props.half && 'w-[50%] px-1'}  ${
        props.green && 'bg-green-500'
      } `}
      style={[
        props.danger && {backgroundColor: colors.dangerButtonBackground},
        props.card && {backgroundColor: colors.cardBackground},
        props.success && {backgroundColor: colors.greenBackground},
        props.border && {
          borderWidth: 1,
          borderColor: colors.cardBackground,
        },

        style,
      ]}
      onPress={onPress}>
      <Text
        className={`text-black font-bold text-lg ${props.mini && 'text-xs'} ${
          props.medium && 'text-lg'
        } ${props.max && 'text-2xl'} ${
          (props.card || props.danger) && 'text-white'
        }`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default React.memo(Button);
