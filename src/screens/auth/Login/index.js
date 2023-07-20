import React, {useEffect, useState} from 'react';

import {View} from 'react-native';

import Linear from '../../../components/Linear';
import Header from '../../../components/Header';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import Alert from '../../../components/Alert';
import Loader from '../../../components/Loader';

import axios from 'axios';
import {BACKEND_URL} from '@env';

const Login = ({navigation}) => {
  const [phone, setPhone] = useState('');
  const [errorModal, setErrorModal] = useState(false);
  const [error, setError] = useState(null);
  const [mount, setMount] = useState(false);
  const [loading, setLoading] = useState(false);

  const next = () => {
    navigation.navigate('OTP', {phone});
  };

  const url = `${BACKEND_URL}/api/users/login`;

  const login = async () => {
    setLoading(true);

    try {
      const {status} = await axios.post(
        url,
        {
          phone,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (status === 200) {
        next();
      }
    } catch (err) {
      console.log(err);
      setError(err.response.data.message || err.response.data.error);
      setErrorModal(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (mount) {
      login();
    }
  }, [mount]);

  return (
    <Linear>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Alert
            message={error}
            visible={errorModal}
            setVisible={setErrorModal}
          />

          <Header title="Login" isBack={true} />
          <View className="items-center justify-between flex-1 w-full my-10">
            <Input
              phone
              maxLength={10}
              placeholder="Please enter your mobile number"
              style={{marginBottom: 60}}
              keyboard="numeric"
              value={phone}
              onChangeText={setPhone}
            />

            <Button
              // isDisabled={phone.length !== 10}
              title="Next"
              onPress={() => {
                setMount(mount => !mount);
              }}
            />
          </View>
        </>
      )}
    </Linear>
  );
};

export default React.memo(Login);
