import React from 'react';
import {TextInput} from 'react-native';

import colors from '../../constants/colors';

const Input = ({placeholder, isDisabled, style, keyboard, ...props}) => {
  return (
    <TextInput
      className={`w-full mx-5 px-8 py-1 text-black mb-8 text-sm font-medium tracking-wider rounded-full ${
        isDisabled ? 'bg-lightGrey' : 'bg-white'
      }`}
      placeholderTextColor={colors.card}
      placeholder={placeholder}
      style={[{elevation: 3}, style]}
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
