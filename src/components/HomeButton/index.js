import React from 'react';
import {StyleSheet, Pressable, Image, Text, Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import colors from '../../constants/colors';

const HomeButton = () => {
  const navigation = useNavigation();
  return (
    <Pressable
      className="flex-row items-center my-5 mt-10 p-5 rounded-full border-2 border-primary"
      style={styles.button}
      onPress={() => navigation.navigate('Booking')}>
      <Image
        source={require('../../assets/Search-white.png')}
        className="h-5 w-5 mx-4"
      />
      <Text
        className="text-white font-bold tracking-wider"
        style={{fontSize: 21}}>
        Choose your Destination...
      </Text>
    </Pressable>
  );
};

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.cardBackground,
    elevation: 5,
    width: width - 32,
  },
});

export default React.memo(HomeButton);
