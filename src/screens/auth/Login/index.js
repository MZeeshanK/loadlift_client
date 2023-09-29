import React, { useEffect, useState } from 'react';

import { View } from 'react-native';

import Linear from '../../../components/Linear';
import Header from '../../../components/Header';
import Button from '../../../components/Button';

import { userLogin } from '../../../store/user';
import { useDispatch } from 'react-redux';
import MonoInput from '../../../components/MonoInput';
import { useNavigation } from '@react-navigation/native';

const Login = ({ route }) => {
  const registerPhone = route.param ? route.params.registerPhone : '9622538116';
  console.log();

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [phone, setPhone] = useState(registerPhone);
  const [mount, setMount] = useState(false);

  useEffect(() => {
    if (mount) {
      dispatch(userLogin({ phone, navigation }));
      setMount(false);
    }
  }, [mount]);

  return (
    <Linear>
      <>
        <Header title="Login" isBack={true} />
        <View className="items-center justify-between flex-1 w-full my-10">
          <MonoInput
            phone
            autoFocus
            placeholder="Please enter your mobile number"
            style={{ marginBottom: 60, zIndex: 100 }}
            keyboardType="numeric"
            value={phone}
            onChangeText={setPhone}
          />

          <Button
            isDisabled={phone.length !== 10}
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
