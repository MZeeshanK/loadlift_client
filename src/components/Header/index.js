import React from 'react';
import {Image, Pressable} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import Title from '../Title';

const Header = ({isBack, expand, isInverted, title, style, onPress}) => {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={expand && onPress}
      className="flex-row w-full items-center justify-center bg-transparent fixed top-0 left-0 right-0 -my-2 mb-10"
      style={style}>
      {isBack && (
        <Pressable
          className="absolute left-0 h-full justify-center"
          onPress={() => navigation.goBack()}>
          <Image
            className="w-5 h-5"
            source={require('../../assets/back.png')}
          />
        </Pressable>
      )}
      <Title lg bold primary>
        {title}
      </Title>

      {expand && (
        <Pressable
          className="absolute right-0 h-full justify-center"
          onPress={onPress}>
          <Image
            className={`w-5 h-3 ${isInverted && 'rotate-180'}`}
            source={require('../../assets/chevron.png')}
          />
        </Pressable>
      )}
    </Pressable>
  );
};

Header.defaultProps = {
  isBack: true,
};

export default React.memo(Header);
