import React, {useState} from 'react';
import {View, Text, Pressable, Image, StyleSheet} from 'react-native';

import colors from '../../../constants/colors';

import Linear from '../../../components/Linear';
import Header from '../../../components/Header';
import Button from '../../../components/Button';

import Card from '../../../components/Card';

const textClasses = 'font-bold pt-6 text-3xl text-center text-white';

const UserType = ({navigation}) => {
  const [selectedUserType, setSelectedUserType] = useState('user');

  return (
    <Linear>
      <Header title="Register" />

      <View className="items-center justify-between mb-6">
        <Text className="text-xl font-bold text-white mb-4">Register As:</Text>

        <Card
          style={selectedUserType === 'user' ? styles.selectedUserType : {}}>
          <Pressable
            className="w-full px-20 py-12"
            onPress={() => setSelectedUserType('user')}>
            <Image
              source={
                selectedUserType === 'user'
                  ? require('../../../assets/user-dark.png')
                  : require('../../../assets/user-light.png')
              }
            />
            <Text
              className={textClasses}
              style={
                selectedUserType === 'user' ? styles.selectedUserText : {}
              }>
              User
            </Text>
          </Pressable>
        </Card>

        <Card
          style={selectedUserType === 'driver' ? styles.selectedUserType : {}}>
          <Pressable
            className="w-full px-20 py-12"
            onPress={() => setSelectedUserType('driver')}>
            <Image
              source={
                selectedUserType === 'driver'
                  ? require('../../../assets/driver-dark.png')
                  : require('../../../assets/driver-light.png')
              }
            />
            <Text
              className={textClasses}
              style={
                selectedUserType === 'driver' ? styles.selectedUserText : {}
              }>
              Driver
            </Text>
          </Pressable>
        </Card>

        <Button
          title="Next"
          onPress={() => navigation.navigate('CreateAccount')}
          style={{marginTop: 20}}
        />
      </View>
    </Linear>
  );
};

const styles = StyleSheet.create({
  card: {
    paddingHorizontal: 75,
    paddingVertical: 50,
  },
  selectedUserType: {
    backgroundColor: colors.primary,
  },
  selectedUserText: {
    color: '#000',
  },
});

export default UserType;
