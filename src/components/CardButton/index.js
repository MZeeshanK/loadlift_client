import React from 'react';
import {Pressable} from 'react-native';
import colors from '../../constants/colors';

const CardButton = ({children, style, onPress}) => {
  return (
    <Pressable
      onPress={onPress}
      className="rounded-xl my-3 items-center justify-center"
      style={[
        {backgroundColor: colors.cardButtonBackground},
        Array.isArray(style) ? [...style] : style,
      ]}>
      {children}
    </Pressable>
  );
};

export default React.memo(CardButton);
