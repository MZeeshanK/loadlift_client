import React from 'react';
import {TouchableOpacity, Text, View} from 'react-native';

import Linear from '../../../components/Linear';
import Header from '../../../components/Header';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import TextLabel from '../../../components/TextLabel';
import Title from '../../../components/Title';
import {useNavigation} from '@react-navigation/native';

const OTP = ({route}) => {
  const navigation = useNavigation();

  const {phone} = route?.params;

  const login = async () => {
    const data = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      body: JSON.stringify(phone),
    });
  };

  return (
    <Linear style={{justifyContent: 'flex-start'}}>
      <Header title="Login" />

      <View className="w-full items-center justify-between flex-1 my-10">
        <View className="w-full items-center justify-between ">
          <Input isDisabled placeholder={phone} />

          <TextLabel title="Please Enter the 6 digit OTP" />

          <Input placeholder="XXXXXX" keyboard="numeric" />
          <TouchableOpacity className="w-full px-2">
            <Title primary bold sm left>
              Resend OTP in 0:59
            </Title>
          </TouchableOpacity>
        </View>
        <Button
          title="Verify"
          onPress={() => {
            login();
            navigation.navigate('UserType');
          }}
        />
      </View>
    </Linear>
  );
};

export default React.memo(OTP);
