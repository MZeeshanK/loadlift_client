import React from 'react';
import {Pressable, Dimensions} from 'react-native';

import Title from '../../../components/Title';

import colors from '../../../constants/colors';

const {width} = Dimensions.get('window');

const DriverHomeButton = ({isActive, setIsActive, isDelivering}) => {
  return (
    <Pressable
      onPress={!isDelivering ? () => setIsActive(!isActive) : null}
      className={`aspect-square items-center justify-center rounded-full border-4 border-primary mb-5 ${
        isActive && 'bg-primary'
      }`}
      style={[
        {width: width - 220},
        isActive &&
          isDelivering && {
            elevation: 10,
            shadowColor: colors.ongoing,
          },
      ]}>
      <Title xxl bold primary={!isActive} black={isActive}>
        {isActive ? 'Active' : isDelivering ? 'Delivering' : 'InActive'}
      </Title>
    </Pressable>
  );
};

export default React.memo(DriverHomeButton);
