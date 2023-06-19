import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, Dimensions} from 'react-native';

import colors from '../../../constants/colors';

import Linear from '../../../components/Linear';
import Header from '../../../components/Header';
import Button from '../../../components/Button';

import CardButton from '../../../components/CardButton';

const UserType = ({navigation}) => {
  const [userType, setUserType] = useState('driver');

  return (
    <Linear>
      <Header title="Register" />

      <View className="items-center justify-between mb-6 flex-1">
        <Text className="text-xl font-bold text-white">Register As:</Text>

        <View className="items-center justify-center">
          <CardButton
            style={[styles.card, userType === 'user' && styles.selectedCard]}
            onPress={() => setUserType('user')}>
            <Image
              style={styles.icon}
              source={
                userType === 'user'
                  ? require('../../../assets/user-dark.png')
                  : require('../../../assets/user-light.png')
              }
            />
            <Text
              className={`text-3xl font-bold text-white ${
                userType === 'user' && 'text-black'
              }`}>
              User
            </Text>
          </CardButton>
          <CardButton
            style={[styles.card, userType === 'driver' && styles.selectedCard]}
            onPress={() => setUserType('driver')}>
            <Image
              style={styles.icon}
              source={
                userType === 'driver'
                  ? require('../../../assets/driver-dark.png')
                  : require('../../../assets/driver-light.png')
              }
            />
            <Text
              className={`text-3xl font-bold text-white ${
                userType === 'driver' && 'text-black'
              }`}>
              Driver
            </Text>
          </CardButton>
        </View>
        <Button
          title="Next"
          onPress={() => navigation.navigate('CreateAccount')}
          style={{marginTop: 20}}
        />
      </View>
    </Linear>
  );
};

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  card: {
    width: width * 0.8,
    height: height * 0.35,
    elevation: 5,
    shadowColor: '#000',
    gap: 10,
  },
  selectedCard: {
    backgroundColor: colors.primary,
  },
  icon: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
});

export default UserType;
