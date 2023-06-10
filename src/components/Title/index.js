import React from 'react';
import {Text} from 'react-native';

const Title = ({children}) => {
  return (
    <Text className="text-white text-xl text-center leading-7">{children}</Text>
  );
};

export default React.memo(Title);
