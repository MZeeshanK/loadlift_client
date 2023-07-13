import React from 'react';
import {Image, TouchableOpacity, useColorScheme} from 'react-native';
import colors from '../../constants/colors';
import Title from '../Title';

const Button = ({title, onPress, source, style, ...props}) => {
  const colorScheme = useColorScheme();

  const primary = colorScheme === 'dark' ? colors.primary : colors.lightPrimary;
  const danger = colorScheme === 'dark' ? colors.danger : colors.lightDanger;
  const ongoing =
    colorScheme === 'dark' ? colors.ongoing : colors.lightSecondary;

  return (
    <TouchableOpacity
      className={`flex-row rounded-full items-center justify-center px-10 py-1 ${
        source && 'gap-x-1'
      } ${props.mini && 'px-3'} ${props.medium && 'px-8'} ${
        props.max && 'px-16'
      } ${props.half && 'w-[48%]'}`}
      style={[
        {
          backgroundColor: primary,
        },
        props.danger && {
          backgroundColor: danger,
        },
        props.card && {
          backgroundColor: ongoing,
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
        className={`tracking-wider pt-1 ${props.mini && 'tracking-normal'} `}
        style={[
          {
            color: props.card
              ? primary
              : props.danger
              ? colors.white
              : colorScheme === 'dark'
              ? colors.black
              : colors.white,
          },
        ]}>
        {title}
      </Title>
    </TouchableOpacity>
  );
};

export default React.memo(Button);
