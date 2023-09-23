import React from 'react';
import { View, StyleSheet, TextInput, useColorScheme } from 'react-native';
import fonts from '../../constants/fonts';
import colors from '../../constants/colors';

const MonoInput = ({ ...props }) => {
  const colorScheme = useColorScheme();

  const grey = colorScheme === 'dark' ? colors.darkGrey : colors.lightGrey;
  const textDisabled = colorScheme === 'dark' ? colors.white : colors.black;

  return (
    <TextInput
      {...props}
      className="w-full mx-5 mt-24 text-black py-4 rounded-full"
      placeholderTextColor={props.isDisabled ? textDisabled : colors.darkGrey}
      style={[
        styles.main,
        {
          backgroundColor: props.isDisabled ? grey : colors.white,
        },
        props.style,
      ]}
      editable={!props.isDisabled}
    />
  );
};

const styles = StyleSheet.create({
  main: {
    elevation: 20,
    textAlign: 'center',
    shadowColor: '#333',
    fontFamily: fonts.bold,
    fontSize: 18,
  },
});

export default MonoInput;
