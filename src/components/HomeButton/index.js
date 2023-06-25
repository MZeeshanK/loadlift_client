import React from 'react';
import {StyleSheet, Pressable, Image, Text, Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import colors from '../../constants/colors';
import Title from '../Title';

const HomeButton = () => {
  const navigation = useNavigation();
  return (
    <Pressable
      className="flex-row items-center justify-start my-5 mt-10 px-5 py-2 rounded-full"
      style={styles.button}
      onPress={() => navigation.navigate('Booking')}>
      <Image
        source={require('../../assets/search-dark.png')}
        className="mr-3"
        style={styles.search}
      />
      <Title xl semibold black>
        Choose your Destination...
      </Title>
    </Pressable>
  );
};

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.white,
    elevation: 3,
    width: width - 32,
    borderWidth: 3,
    borderColor: colors.ongoing,
  },
  search: {
    height: 20,
    width: 20,
  },
});

export default React.memo(HomeButton);
