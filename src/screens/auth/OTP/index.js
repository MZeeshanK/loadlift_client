import React from 'react';
import {TouchableOpacity, Text, View} from 'react-native';

import Linear from '../../../components/Linear';
import Header from '../../../components/Header';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import TextLabel from '../../../components/TextLabel';

const OTP = ({navigation}) => {
  return (
    <Linear style={{justifyContent: 'flex-start'}}>
      <Header title="Login" />

      <View className="w-full items-center justify-between flex-1 my-10">
        <View className="w-full items-center justify-between -mt-10">
          <Input isDisabled={true} placeholder="123" style={{marginTop: 32}} />

          <TextLabel title="Enter the 6 digit otp sent to your mobile number" />

          <Input placeholder="XXXXXX" keyboard="numeric" />
          <TouchableOpacity className="w-full px-2 -mt-3">
            <Text className="text-primary font-bold text-left">
              Resend OTP in 0:59
            </Text>
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
