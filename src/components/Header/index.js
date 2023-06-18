import React from 'react';
import {View, Text, Image, Pressable} from 'react-native';

import {useNavigation} from '@react-navigation/native';

const Header = ({isBack, title}) => {
  const navigation = useNavigation();
  return (
    <View className="flex-row w-full items-center justify-center bg-transparent fixed top-0 left-0 right-0 -my-2 mb-10">
      {isBack ? (
        <Pressable
          className="absolute left-0 h-full justify-center"
          onPress={() => navigation.goBack()}>
          <Image
            className="w-5 h-5"
            source={require('../../assets/back.png')}
          />
        </Pressable>
      ) : (
        <></>
      )}
      <Text className={`text-base font-bold text-primary`}>{title}</Text>
    </View>
  );
};

Header.defaultProps = {
  isBack: true,
};

export default React.memo(Header);
