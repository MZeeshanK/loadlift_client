import React, {useState} from 'react';

import {View} from 'react-native';

import Linear from '../../../components/Linear';
import Header from '../../../components/Header';
import Input from '../../../components/Input';
import Button from '../../../components/Button';

const Login = ({navigation}) => {
  const [phone, setPhone] = useState('');

  const login = async () => {
    const data = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      body: JSON.stringify(phone),
    });

    const response = await data.json();
    console.log(response);
  };

  const next = () => {
    login();
    navigation.navigate('OTP', {phone});
  };

  return (
    <Linear>
      <Header title="Login" isBack={true} />
      <View className="items-center justify-between flex-1 w-full my-10">
        <Input
          placeholder="Please enter your mobile number"
          style={{marginBottom: 60}}
          keyboard="numeric"
          value={phone}
          onChangeText={setPhone}
        />

        <Button title="Next" onPress={next} />
      </View>
    </Linear>
  );
};

export default React.memo(Login);
