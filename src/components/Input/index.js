import React from 'react';
import {TextInput, TouchableOpacity} from 'react-native';

import colors from '../../constants/colors';
import fonts from '../../constants/fonts';

const Input = ({placeholder, isDisabled, style, keyboard, ...props}) => {
  return (
    <TextInput
      value={props.value}
      onChangeText={props.onChangeText}
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
