import React from 'react';
import {Text, StyleSheet, ScrollView, View, Image} from 'react-native';

import Linear from '../../../components/Linear';
import Header from '../../../components/Header';
import Card from '../../../components/Card';
import Rating from '../../../components/Rating';
import Button from '../../../components/Button';

const Account = () => {
  return (
    <Linear>
      <Header title="Account" isBack={false} />
      <ScrollView className="flex-1 w-full">
        <Card className="w-100 p-2 py-4" style={{elevation: 0}}>
          <View className="w-full px-4 py-2 flex-row items-center justify-between mb-4">
            <View className="items-start justify-center">
              <Text className="text-2xl mb-2 font-bold tracking-wider text-white">
                John Doe
              </Text>
              <Rating rating={4.5} />
            </View>
            <Image
              source={require('../../../assets/account-focused.png')}
              style={styles.avatar}
            />
          </View>

          <View className="flex-row items-center w-full justify-between px-4 py-2">
            <Text className="text-lg text-white font-bold">+91 9419018807</Text>

            <Button
              title="Update Profile"
              mini
              danger
              style={{
                transform: [{scaleX: 0.55}, {scaleY: 0.65}],
                marginHorizontal: 0,
              }}
            />
          </View>
        </Card>
      </ScrollView>
    </Linear>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: 60,
    height: 60,
  },
});

export default React.memo(Account);
