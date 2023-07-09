import React, {useState} from 'react';

import {View} from 'react-native';

import Linear from '../../../components/Linear';
import Header from '../../../components/Header';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import Alert from '../../../components/Alert';

const Login = ({navigation}) => {
  const [phone, setPhone] = useState('');
  const [errorModal, setErrorModal] = useState(false);

  const next = () => {
    // if (phone.length < 10) {
    //   setErrorModal(true);
    //   return;
    // }
    navigation.navigate('OTP', {phone});
  };

  return (
    <Linear>
      <Alert
        message="Please enter a valid contact number"
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

        <Button title="Next" onPress={next} />
      </View>
    </Linear>
  );
};

export default React.memo(Login);
