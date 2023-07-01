import React from 'react';
import {StyleSheet, Pressable, Image, Dimensions} from 'react-native';
import colors from '../../../constants/colors';
import Title from '../../../components/Title';
import {useNavigation} from '@react-navigation/native';

const HomeButton = () => {
  const navigation = useNavigation();

  return (
    <Pressable
      className="flex-row items-center justify-start my-5 mt-10 px-5 py-2 rounded-full"
      style={styles.button}
      onPress={() => navigation.navigate('Booking')}>
      <Image
        source={require('../../../assets/search-dark.png')}
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
    backgroundColor: colors.primary,
    elevation: 3,
    shadowColor: colors.ongoing,
    width: width - 32,
    borderWidth: 2,
    borderColor: colors.card,
  },
  search: {
    height: 20,
    width: 20,
  },
});

export default React.memo(HomeButton);
