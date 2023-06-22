import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  Pressable,
  Dimensions,
  FlatList,
} from 'react-native';

import Linear from '../../../components/Linear';
import Header from '../../../components/Header';
import Card from '../../../components/Card';
import orders from '../../../data/orders.js';
import HomeButton from '../../../components/HomeButton';
import HomeList from '../../../components/HomeList';

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
        <FlatList
          className="rounded-xl absolute bottom-10 left-0 right-0 mt-16 mb-24"
          style={{minHeight: height / 4, maxHeight: height / 1.7}}
          data={orders}
          inverted={true}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => String(item.id)}
          renderItem={({item, index}) => <HomeList item={item} index={index} />}
        />

        <HomeButton />
      </View>
    </Linear>
  );
};

const styles = StyleSheet.create({
  logo: {opacity: 0.08, position: 'absolute', top: -20, zIndex: -1},
});

export default React.memo(Home);
