import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import colors from '../../constants/colors';
import Title from '../Title';

const Button = ({title, onPress, style, ...props}) => {
  return (
    <TouchableOpacity
      className={`bg-primary rounded-full items-center justify-center px-10 py-1 ${
        props.mini && 'px-3'
      } ${props.medium && 'px-8'} ${props.max && 'px-16'} ${
        props.half && 'w-[50%] px-1'
      }  ${props.green && 'bg-green-500'}  `}
      style={[
        props.danger && {backgroundColor: colors.danger},
        props.card && {backgroundColor: colors.ongoing},
        props.success && {backgroundColor: colors.green},
        props.border && {
          borderWidth: 1,
          borderColor: colors.background,
        },
        {
          elevation: 1,
        },
        style,
      ]}
      onPress={onPress}>
      {/* <Text
        className={`text-black font-bold text-lg ${props.mini && 'text-xs'} ${
          props.medium && 'text-lg'
        } ${props.max && 'text-xl'} ${
          (props.card || props.danger) && 'text-white'
        }`}>
        {title}
      </Text> */}
      <Title
        bold={!props.mini}
        semibold={props.mini}
        black
        xsm={props.mini}
        base={props.medium}
        xl={props.max}
        className={`${
          (props.card || props.danger) && 'text-white'
        } tracking-wider pt-1`}>
        {title}
      </Title>
    </TouchableOpacity>
  );
};

export default React.memo(Button);
