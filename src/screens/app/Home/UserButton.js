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

  const card = colorScheme === 'dark' ? colors.card : colors.lightCard;

  return (
    <Pressable
      className="flex-row items-center justify-start my-5 mt-10 px-5 py-3 rounded-full"
      style={[
        styles.button,
        {
          backgroundColor: card,
        },
      ]}
      onPress={() => navigation.navigate('Booking')}>
      <Image
        source={
          colorScheme === 'dark'
            ? require('../../../assets/search-light.png')
            : require('../../../assets/search-dark.png')
        }
        className="mr-3"
        style={styles.search}
      />
      <Title xl semibold>
        Choose your Destination...
      </Title>
    </Pressable>
  );
};

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  button: {
    elevation: 3,
    width: width - 32,
  },
  search: {
    height: 20,
    width: 20,
  },
});

export default React.memo(HomeButton);
