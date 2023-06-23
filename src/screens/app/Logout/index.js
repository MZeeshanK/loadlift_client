import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Linear from '../../../components/Linear';
import Header from '../../../components/Header';
import Card from '../../../components/Card';
import Button from '../../../components/Button';

const Logout = ({navigation}) => {
  return (
    <Linear>
      <Header title="Logout" isBack={false} />
      <View className="flex-1 items-center justify-center">
        <Card style={{padding: 200}}>
          <Text className="text-3xl text-white  font-semibold tracking-wider">
            Are you sure?
          </Text>
          <View className="w-full flex-row items-center justify-between gap-4 mt-10 ">
            <Button
              title="No"
              medium
              card
              success
              style={{
                flex: 1,
                elevation: 2,
              }}
              onPress={() => navigation.goBack('')}
            />
            <Button
              title="Yes"
              medium
              danger
              style={{
                flex: 1,
                elevation: 2,
              }}
              onPress={() => navigation.navigate('Login')}
            />
          </View>
        </Card>
      </View>
    </Linear>
  );
};

const styles = StyleSheet.create({});

export default React.memo(Logout);
