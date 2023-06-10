import React from 'react';

import {View} from 'react-native';

import Linear from '../../../components/Linear';
import Header from '../../../components/Header';
import Input from '../../../components/Input';
import Button from '../../../components/Button';

const Login = ({navigation}) => {
  const next = () => navigation.navigate('OTP');

  return (
    <Linear style={{justifyContent: 'flex-start'}}>
      <Header title="Login" isBack={true} />
      <View className="justify-between flex-1 w-full items-center mb-16">
        <Input
          placeholder="Please enter your mobile number"
          style={{marginVertical: 60}}
          keyboard="phone-pad"
        />

        <Button title="Next" onPress={next} />
      </View>
    </Linear>
  );
};

export default Login;
