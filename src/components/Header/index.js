import React from 'react';
import {View, Image, Pressable} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import Title from '../Title';

const Header = ({isBack, title, style}) => {
  const navigation = useNavigation();
  return (
    <View
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
    </View>
  );
};

Header.defaultProps = {
  isBack: true,
};

export default React.memo(Header);
