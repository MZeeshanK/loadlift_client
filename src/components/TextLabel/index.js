import React from 'react';
import {Text} from 'react-native';

const TextLabel = ({title, style}) => {
  return (
    <Text
      className="text-white w-full  text-left px-2 font-semibold mb-1"
      style={style}>
      {title}
    </Text>
  );
};

export default React.memo(TextLabel);
