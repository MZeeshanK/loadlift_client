import React from 'react';
import {Pressable, Text, View} from 'react-native';

import Linear from '../../../components/Linear';
import Header from '../../../components/Header';
import Input from '../../../components/Input';
import Button from '../../../components/Button';

const OTP = ({navigation}) => {
  return (
    <Linear style={{justifyContent: 'flex-start'}}>
      <Header title="Login" />

      <View className="w-full items-center justify-start flex-1">
        <Input isDisabled={true} placeholder="123" style={{marginTop: 32}} />

        <Text className="text-white w-full  text-left px-2 font-semibold mb-1">
          Enter the 6 digit otp sent to your mobile number
        </Text>
        <Input placeholder="XXXXXX" />
        <Pressable className="w-full px-2 -mt-3">
          <Text className="text-primary font-bold text-left">
            Resend OTP in 0:59
          </Text>
        </Pressable>
      </View>

      <Button
        title="Verify"
        style={{marginBottom: 50}}
        onPress={() => navigation.navigate('UserType')}
      />
    </Linear>
  );
};

export default React.memo(OTP);
