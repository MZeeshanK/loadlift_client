import React from 'react';
import {Pressable, Dimensions, useColorScheme} from 'react-native';

import Title from '../../../components/Title';

import colors from '../../../constants/colors';

const {width} = Dimensions.get('window');

const DriverHomeButton = ({isActive, setIsActive, isDelivering}) => {
  const colorScheme = useColorScheme();

  const primary = colorScheme === 'dark' ? colors.primary : colors.lightPrimary;
  return (
    <>
      {isActive && (
        <Title className="my-3 tracking-wider" lg bold>
          You are now visible to customers
        </Title>
      )}
      <Pressable
        onPress={!isDelivering ? () => setIsActive(!isActive) : null}
        className={`aspect-square items-center justify-center rounded-full border-4  mb-5 `}
        style={[
          {
            width: width - 220,
            backgroundColor: isActive && primary,
            borderColor: primary,
          },
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
    </>
  );
};

export default React.memo(DriverHomeButton);
