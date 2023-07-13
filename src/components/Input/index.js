import React from 'react';
import {TextInput, useColorScheme} from 'react-native';

import colors from '../../constants/colors';
import fonts from '../../constants/fonts';

const Input = ({
  value,
  onChangeText,
  keyboard,
  style,
  isDisabled,
  placeholder,
  ...props
}) => {
  const colorScheme = useColorScheme();

  const grey = colorScheme === 'dark' ? colors.darkGrey : colors.lightGrey;
  const textDisabled = colorScheme === 'dark' ? colors.white : colors.black;

  return (
    <TextInput
      maxLength={props.maxLength}
      value={value}
      onChangeText={onChangeText}
      returnKeyType={props.returnKeyType}
      className="w-full mx-5 text-black px-5 mb-4 py-1 rounded-full"
      placeholderTextColor={isDisabled ? textDisabled : colors.darkGrey}
      placeholder={placeholder}
      style={[
        {
          elevation: 3,
          fontFamily: fonts.semibold,
          fontSize: 12,
          backgroundColor: isDisabled ? grey : colors.white,
        },
        style,
      ]}
      keyboardType={keyboard}
      editable={!isDisabled}
    />
  );
};

Input.defaultProps = {
  isDisabled: false,
  keyboard: 'default',
};

export default React.memo(Input);
