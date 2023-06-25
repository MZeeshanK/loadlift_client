import React from 'react';
import {TouchableOpacity, Text, View} from 'react-native';

import Linear from '../../../components/Linear';
import Header from '../../../components/Header';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import TextLabel from '../../../components/TextLabel';
import Title from '../../../components/Title';

const OTP = ({navigation}) => {
  return (
    <Linear style={{justifyContent: 'flex-start'}}>
      <Header title="Login" />

      <View className="w-full items-center justify-between flex-1 my-10">
        <View className="w-full items-center justify-between ">
          <Input isDisabled placeholder="+91 94190 12345" />

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
          onPress={() => navigation.navigate('UserType')}
        />
      </View>
    </Linear>
  );
};

export default React.memo(OTP);
