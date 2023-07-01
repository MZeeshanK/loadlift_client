import React from 'react';
import {TextInput} from 'react-native';

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
  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      returnKeyType={props.returnKeyType}
      className="w-full mx-5 text-black mb-4 px-4 py-1 pt-2 rounded-full"
      placeholderTextColor={isDisabled ? colors.white : colors.darkGrey}
      placeholder={placeholder}
      style={[
        {
          elevation: 3,
          fontFamily: fonts.semibold,
          fontSize: 12,
          backgroundColor: isDisabled ? colors.grey : colors.white,
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
