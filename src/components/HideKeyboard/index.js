import React from 'react';
import {Keyboard, TouchableWithoutFeedback} from 'react-native';

const HideKeyboard = ({children}) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      {children}
    </TouchableWithoutFeedback>
  );
};

export default React.memo(HideKeyboard);
