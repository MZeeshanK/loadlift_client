import React from 'react';

import {View, StyleSheet} from 'react-native';

import Linear from '../../../components/Linear';
import Header from '../../../components/Header';
import Button from '../../../components/Button';
import UserDetails from '../../../components/UserDetails';

const CreateAccount = ({navigation}) => {
  return (
    <Linear>
      <Header title={'Create Account'} />

      <View className="flex-1 w-full items-center justify-between mb-10">
        <UserDetails />

        <Button
          title="Create Account"
          onPress={() => navigation.navigate('Tabs')}
        />
      </View>
    </Linear>
  );
};

export default React.memo(CreateAccount);
