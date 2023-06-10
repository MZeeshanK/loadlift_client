import React from 'react';
import {TouchableOpacity, Text} from 'react-native';

const Button = ({title, onPress, style}) => {
  return (
    <TouchableOpacity
      className="bg-primary rounded-full items-center justify-center px-10 py-1"
      style={style}
      onPress={onPress}>
      <Text className="text-black text-lg font-bold">{title}</Text>
    </TouchableOpacity>
  );
};

export default React.memo(Button);
