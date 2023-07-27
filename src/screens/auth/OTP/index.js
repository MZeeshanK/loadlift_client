import React, {useEffect, useState} from 'react';
import {Pressable, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import Linear from '../../../components/Linear';
import Header from '../../../components/Header';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import TextLabel from '../../../components/TextLabel';
import Title from '../../../components/Title';
import Loader from '../../../components/Loader';
import Alert from '../../../components/Alert';

import {useDispatch, useSelector} from 'react-redux';
import {userLogin} from '../../../store/user';
import axios from 'axios';

const OTP = ({route}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  const [timer, setTimer] = useState(59);
  const [otp, setOtp] = useState('');
  const [isMount, setIsMount] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorModal, setErrorModal] = useState(null);

  const {phone} = route?.params;

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(timer => timer - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const url = `${BACKEND_URL}/api/verify`;

  const otpVerify = async () => {
    setLoading(true);
    try {
      const {data, status} = await axios.post(
        url,
        {
          phone,
          verificationCode: otp,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (status === 200) {
        dispatch(userLogin({token: data.token}));
        navigation.navigate('Tabs');
      }
    } catch (err) {
      setError(err.response.data.error || err.response.data.message);
      setErrorModal(true);
    }
    setIsMount(false);

    setLoading(false);
  };

  useEffect(() => {
    if (isMount) {
      otpVerify();
    }
  }, [isMount]);

  return (
    <Linear style={{justifyContent: 'flex-start'}}>
      <Alert message={error} visible={errorModal} setVisible={setErrorModal} />
      {loading ? (
        <Loader />
      ) : (
        <>
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
                setIsMount(isMount => !isMount);
              }}
            />
          </View>
        </>
      )}
    </Linear>
  );
};

export default React.memo(OTP);
