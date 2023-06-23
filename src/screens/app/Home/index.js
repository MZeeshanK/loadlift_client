import React from 'react';
import {View, Image, StyleSheet, Dimensions} from 'react-native';

import Linear from '../../../components/Linear';
import Header from '../../../components/Header';
import orders from '../../../data/orders.js';
import HomeButton from '../../../components/HomeButton';
import HomeList from '../../../components/OrderItem';
import GFlatList from '../../../components/global/GFlatList';

const {height} = Dimensions.get('window');

const Home = () => {
  return (
    <Linear style={{paddingVertical: 0, paddngHorizontal: 0}}>
      <Header title="Home" isBack={false} />
      <View className="flex-1 w-full items-center">
        <Image
          style={styles.logo}
          source={require('../../../assets/logo.png')}
        />
        {/* 3 last orders list */}
        <GFlatList inverted home />

        <HomeButton />
      </View>
    </Linear>
  );
};

const styles = StyleSheet.create({
  logo: {opacity: 0.08, position: 'absolute', top: -20, zIndex: -1},
});

export default React.memo(Home);
