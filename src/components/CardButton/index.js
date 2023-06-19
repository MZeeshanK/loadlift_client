import React from 'react';
import {Pressable} from 'react-native';

const CardButton = ({children, style, onPress}) => {
  return (
    <Pressable
      onPress={onPress}
      className="rounded-xl my-3 bg-card items-center justify-center"
      style={Array.isArray(style) ? [...style] : style}>
      {children}
    </Pressable>
  );
};

export default React.memo(CardButton);
