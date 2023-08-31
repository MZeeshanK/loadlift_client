import React from 'react';
import {View} from 'react-native';

import Linear from '../../../components/Linear';
import Header from '../../../components/Header';
import UserDetails from '../../../components/UserDetails';

const Profile = () => {
  return (
    <Linear>
      <Header title="Profile" />

      <View className="flex-1 items-center justify-between">
        <UserDetails info="profile" />
      </View>
    </Linear>
  );
};

export default Profile;
