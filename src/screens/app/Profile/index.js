import React from 'react';
import {StyleSheet, View} from 'react-native';
import Linear from '../../../components/Linear';
import Header from '../../../components/Header';
import UserDetails from '../../../components/UserDetails';

import user from '../../../data/user';

const Profile = () => {
  return (
    <Linear>
      <Header title="Profile" />

      <View className="flex-1 items-center justify-between">
        <UserDetails user={user} />
      </View>
    </Linear>
  );
};

const styles = StyleSheet.create({});

export default Profile;
