import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import Linear from '../../../components/Linear';
import Header from '../../../components/Header';

const Home = () => {
  return (
    <Linear>
      <Header title="Home" isBack={false} />
      <View className="flex-1 ">
        <Text>Home</Text>

        <View style={styles.container}>
          <Text>Hello</Text>
        </View>
      </View>
    </Linear>
  );
};

const styles = StyleSheet.create({
  container: {
    elevation: 100,
    padding: 100,
    backgroundColor: 'red',
    shadowColor: '#fff',
  },
});

export default Home;
