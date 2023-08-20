import React from 'react';
import {View, StyleSheet} from 'react-native';
import Linear from '../../../components/Linear';
import Header from '../../../components/Header';
import UserDetails from '../../../components/UserDetails';
import {useSelector} from 'react-redux';

const SwitchDetails = () => {
  const {phone} = useSelector(state => state.user.data);

  return (
    <Linear>
      <Header title={'Switch Account'} />

      <View className="flex-1 w-full items-center justify-between mb-5">
        <UserDetails phoneNumber={phone} info="switch" />
      </View>
    </Linear>
  );
};

export default React.memo(SwitchDetails);
