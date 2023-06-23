import React from 'react';
import {Pressable} from 'react-native';
import colors from '../../constants/colors';

const CardButton = ({children, selected, style, onPress}) => {
  return (
    <Pressable
      onPress={onPress}
      className="rounded-xl my-3 items-center justify-center"
      style={[
        {backgroundColor: colors.ongoingBackground, elevation: 5},
        selected && {backgroundColor: colors.primary},
        Array.isArray(style) ? [...style] : style,
      ]}>
      {children}
    </Pressable>
  );
};

export default React.memo(CardButton);
