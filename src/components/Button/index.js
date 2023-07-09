import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import colors from '../../constants/colors';
import Title from '../Title';

const Button = ({title, onPress, source, style, ...props}) => {
  return (
    <TouchableOpacity
      className={`bg-primary flex-row rounded-full items-center justify-center px-10 py-1 ${
        source && 'gap-x-1'
      } ${props.mini && 'px-3'} ${props.medium && 'px-8'} ${
        props.max && 'px-16'
      } ${props.half && 'w-[48%]'}`}
      style={[
        props.danger && {backgroundColor: colors.danger},
        props.card && {
          backgroundColor: colors.ongoing,
          elevation: 7,
        },
        props.success && {backgroundColor: colors.green},
        {
          elevation: !props.mini && !props.half ? 2 : 1,
        },
        props.isDisabled && {
          backgroundColor: '#3d3d3d',
        },
        style,
      ]}
      onPress={onPress}>
      {source && <Image className="w-[16] h-[16]" source={source} />}
      <Title
        bold={!props.mini}
        semibold={props.mini}
        black
        xsm={props.mini}
        base={props.medium}
        xl={props.max}
        className={`tracking-wider pt-1 ${props.card && 'text-primary'} ${
          (props.danger || props.isDisabled) && 'text-white'
        }  ${props.mini && 'tracking-normal'} `}>
        {title}
      </Title>
    </TouchableOpacity>
  );
};

export default React.memo(Button);
