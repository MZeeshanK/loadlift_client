import React from 'react';
import {
  StyleSheet,
  Pressable,
  Image,
  Dimensions,
  useColorScheme,
} from 'react-native';
import colors from '../../../constants/colors';
import Title from '../../../components/Title';
import {useNavigation} from '@react-navigation/native';

const HomeButton = () => {
  const navigation = useNavigation();

  const colorScheme = useColorScheme();

  const primary = colorScheme === 'dark' ? colors.primary : colors.lightPrimary;

  return (
    <Pressable
      className="flex-row items-center justify-start my-5 mt-10 px-5 py-2 rounded-full"
      style={[
        styles.button,
        {
          backgroundColor: primary,
          shadowColor: colorScheme === 'dark' ? colors.ongoing : colors.black,
        },
      ]}
      onPress={() => navigation.navigate('Booking')}>
      <Image
        source={
          colorScheme === 'dark'
            ? require('../../../assets/search-dark.png')
            : require('../../../assets/search-light.png')
        }
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
    elevation: 6,
    width: width - 32,
  },
  search: {
    height: 20,
    width: 20,
  },
});

export default React.memo(HomeButton);
