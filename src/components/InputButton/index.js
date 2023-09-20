import React from 'react';
import { Pressable } from 'react-native';
import Title from '../Title';

const InputButton = ({ title, onPress, ...props }) => {
  return (
    <Pressable
      onPress={onPress}
      className="bg-white w-full my-4 rounded-full px-4 py-1"
      style={[{ elevation: 1 }, props.style]}>
      <Title
        onPress={onPress}
        // className="bg-black"
        left
        semibold
        darkGrey
        center={props.center}>
        {title}
      </Title>
    </Pressable>
  );
};

export default React.memo(InputButton);
