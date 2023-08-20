import React, {forwardRef} from 'react';
import {TextInput, useColorScheme} from 'react-native';

import colors from '../../constants/colors';
import fonts from '../../constants/fonts';

const Input = forwardRef(function MyInput({...props}, ref) {
  const colorScheme = useColorScheme();

  const grey = colorScheme === 'dark' ? colors.darkGrey : colors.lightGrey;
  const textDisabled = colorScheme === 'dark' ? colors.white : colors.black;

  return (
    <TextInput
      {...props}
      ref={ref}
      className="w-full mx-5 text-black px-5 mb-4 py-1 rounded-full"
      placeholderTextColor={props.isDisabled ? textDisabled : colors.darkGrey}
      style={[
        {
          elevation: 3,
          textAlign: 'left',
          fontFamily: fonts.semibold,
          fontSize: 12,
          backgroundColor: props.isDisabled ? grey : colors.white,
        },
        props.style,
      ]}
      editable={!props.isDisabled}
    />
  );
});

Input.defaultProps = {
  isDisabled: false,
  keyboard: 'default',
};

export default React.memo(Input);
