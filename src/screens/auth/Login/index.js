import React from 'react';

import {View} from 'react-native';

import Linear from '../../../components/Linear';
import Header from '../../../components/Header';
import Input from '../../../components/Input';
import Button from '../../../components/Button';

const Login = ({navigation}) => {
  const next = () => navigation.navigate('OTP');

  return (
    <Linear>
      <Header title="Login" isBack={true} />
      <View className="items-center justify-between flex-1 w-full my-10">
        <Input
          placeholder="Please enter your mobile number"
          style={{marginBottom: 60}}
          keyboard="numeric"
        />

        <Button title="Next" onPress={next} />
      </View>
    </Linear>
  );
};

export default React.memo(Login);
