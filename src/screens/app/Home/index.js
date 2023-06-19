import React from 'react';
import {View, Image, StyleSheet, Text, Pressable} from 'react-native';

import Linear from '../../../components/Linear';
import Header from '../../../components/Header';

const Home = ({navigation}) => {
  return (
    <Linear>
      <Header title="Home" isBack={false} />
      <Image style={styles.logo} source={require('../../../assets/logo.png')} />
      <View className="flex-1 items-center justify-start">
        {/* TODO STATUS CARD */}
      </View>

      <Pressable
        className="flex-row items-center w-full mb-10 border-4 border-black py-3 px-4 rounded-full bg-white"
        onPress={() => navigation.navigate('Booking')}>
        <Image
          source={require('../../../assets/search.png')}
          className="h-8 w-8 mr-4"
        />
        <Text className="text-black font-bold text-xl">
          Choose Your Destination...
        </Text>
      </Pressable>
    </Linear>
  );
};

const styles = StyleSheet.create({
  logo: {opacity: 0.08, position: 'absolute', top: 100, zIndex: -1},
});

export default React.memo(Home);
