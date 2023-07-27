import React from 'react';

import {View} from 'react-native';

import Linear from '../../../components/Linear';
import Header from '../../../components/Header';
import UserDetails from '../../../components/UserDetails';

const CreateAccount = ({route}) => {
  const {phone} = route.params;
  return (
    <Linear>
      <Header title={'Create Account'} />

      <View className="flex-1 w-full items-center justify-between mb-5">
        <UserDetails phone={phone} />
      </View>
    </Linear>
  );
};

export default React.memo(CreateAccount);
