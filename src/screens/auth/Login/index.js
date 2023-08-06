import React, {useEffect, useState} from 'react';

import {View} from 'react-native';

import Linear from '../../../components/Linear';
import Header from '../../../components/Header';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import Alert from '../../../components/Alert';

import {changeUserType} from '../../../store/user';
import {setLoading} from '../../../store/misc';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';

const Login = ({navigation}) => {
  const dispatch = useDispatch();

  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  const [phone, setPhone] = useState('9622510439');
  const [errorModal, setErrorModal] = useState(false);
  const [error, setError] = useState(null);
  const [mount, setMount] = useState(false);

  const url = `${BACKEND_URL}/api/verify/login`;

  useEffect(() => {
    const login = async () => {
      dispatch(setLoading(true));

      try {
        const {data, status} = await axios.post(
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
          dispatch(changeUserType(data.type));
          navigation.navigate('OTP', {phone});
        }
      } catch (err) {
        console.log(err);
        if (err.response.status === 404) {
          navigation.navigate('UserType', {phone});
        } else {
          setError(err.response.data.message || err.response.data.error);
          setErrorModal(true);
        }
      }

      dispatch(setLoading(false));
    };

    if (mount) {
      login();
      setMount(false);
    }
  }, [mount]);

  return (
    <Linear>
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
            autoFocus
            maxLength={10}
            placeholder="Please enter your mobile number"
            style={{marginBottom: 60}}
            keyboardType="numeric"
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
    </Linear>
  );
};

export default React.memo(Login);
