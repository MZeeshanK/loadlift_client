import React, {useEffect, useState} from 'react';
import {Pressable, TouchableOpacity, View} from 'react-native';

import Linear from '../../../components/Linear';
import Header from '../../../components/Header';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import TextLabel from '../../../components/TextLabel';
import Title from '../../../components/Title';
import {useNavigation} from '@react-navigation/native';

const OTP = ({route}) => {
  const navigation = useNavigation();

  const [timer, setTimer] = useState(3);
  const [otp, setOtp] = useState('');

  const {phone} = route?.params;

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(timer => timer - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  return (
    <Linear style={{justifyContent: 'flex-start'}}>
      <Header title="Login" />

      <View className="w-full items-center justify-between flex-1 my-10">
        <View className="w-full items-center justify-between ">
          <Input isDisabled phone placeholder={phone} />

          <TextLabel title="Please Enter the 6 digit OTP" />

          <Input
            value={otp}
            onChangeText={setOtp}
            placeholder="XXXXXX"
            keyboard="numeric"
          />
          <TouchableOpacity className="w-full px-2">
            {timer > 0 ? (
              <Title primary bold sm left>
                Resend OTP in 0:{timer}
              </Title>
            ) : (
              <Pressable
                onPress={() => {
                  setTimer(3);
                  navigation.navigate('OTP', {phone});
                }}>
                <Title bold primary sm left>
                  Resend OTP
                </Title>
              </Pressable>
            )}
          </TouchableOpacity>
        </View>
        <Button
          title="Verify"
          onPress={() => {
            navigation.navigate('UserType');
          }}
        />
      </View>
    </Linear>
  );
};

export default React.memo(OTP);
