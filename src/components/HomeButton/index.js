import React from 'react';
import {
  StyleSheet,
  View,
  Pressable,
  Image,
  Text,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const HomeButton = () => {
  const navigation = useNavigation();
  return (
    <>
      <View className="" />
      <Pressable
        className="flex-row items-center mt-3 mb-1 p-5 rounded-full border-y-2 border-primary"
        style={styles.button}
        onPress={() => navigation.navigate('Booking')}>
        <Image
          source={require('../../assets/Search-white.png')}
          className="h-5 w-5 mx-4"
        />
        <Text
          className="text-primary font-bold tracking-wider"
          style={{fontSize: 21}}>
          Choose your Destination...
        </Text>
      </Pressable>
    </>
  );
};

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'rgba(18,51,69,.4)',
    shadowColor: '#000',
    elevation: 3,
    width: width - 32,
  },
});

export default React.memo(HomeButton);
