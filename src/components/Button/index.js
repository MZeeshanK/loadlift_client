import React from 'react';
import {TouchableOpacity} from 'react-native';
import colors from '../../constants/colors';
import Title from '../Title';

const Button = ({title, onPress, style, ...props}) => {
  return (
    <TouchableOpacity
      className={`bg-primary rounded-full items-center justify-center px-10 py-1 ${
        props.mini && 'px-3'
      } ${props.medium && 'px-8'} ${props.max && 'px-16'} ${
        props.half && 'w-[50%] px-1'
      }`}
      style={[
        props.danger && {backgroundColor: colors.danger},
        props.card && {
          backgroundColor: colors.ongoing,
          borderWidth: 1,
          borderColor: colors.primary,
        },
        props.success && {backgroundColor: colors.green},
        {
          elevation: !props.mini ? 2 : 1,
        },
        style,
      ]}
      onPress={onPress}>
      <Title
        bold={!props.mini}
        semibold={props.mini}
        black
        xsm={props.mini}
        base={props.medium}
        xl={props.max}
        className={`tracking-wider pt-1 ${props.card && 'text-primary'} ${
          props.danger && 'text-white'
        } ${props.mini && 'tracking-normal'} `}>
        {title}
      </Title>
    </TouchableOpacity>
  );
};

export default React.memo(Button);
