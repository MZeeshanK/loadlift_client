import React, { useEffect, useState } from 'react';
import { Pressable, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Linear from '../../../components/Linear';
import Header from '../../../components/Header';
import Button from '../../../components/Button';
import TextLabel from '../../../components/TextLabel';
import Title from '../../../components/Title';

import { useDispatch } from 'react-redux';
import { otpVerify } from '../../../store/user';
import MonoInput from '../../../components/MonoInput';

const OTP = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [timer, setTimer] = useState(59);
  const [otp, setOtp] = useState('');
  const [isMount, setIsMount] = useState(false);

  const { phone } = route?.params;

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(timer => timer - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    if (isMount) {
      dispatch(otpVerify({ phone, otp }));
      setIsMount(false);
    }
  }, [isMount]);

  return (
    <Linear style={{ justifyContent: 'flex-start' }}>
      {/* <Alert visible={modal} /> */}
      <Header title="Login" />

      <View className="w-full items-center justify-between flex-1 my-10">
        <View className="w-full items-center justify-between ">
          <MonoInput
            isDisabled
            style={{ marginTop: 5 }}
            phone
            placeholder={phone}
          />

          <TextLabel title="Please Enter the 6 digit OTP" />

          <MonoInput
            value={otp}
            style={{ marginTop: 15 }}
            onChangeText={setOtp}
            placeholder="XXXXXX"
            keyboardType="numeric"
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
                  navigation.navigate('OTP', { phone });
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
            setIsMount(isMount => !isMount);
          }}
        />
      </View>
    </Linear>
  );
};

export default React.memo(OTP);
