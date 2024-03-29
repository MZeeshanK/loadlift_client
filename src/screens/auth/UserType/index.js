import React from 'react';
import {View, Image, StyleSheet, Dimensions} from 'react-native';

import colors from '../../../constants/colors';

import Linear from '../../../components/Linear';
import Header from '../../../components/Header';
import Button from '../../../components/Button';

import Card from '../../../components/Card';
import Title from '../../../components/Title';
import {useSelector, useDispatch} from 'react-redux';
import {changeUserType} from '../../../store/user';

import {useNavigation} from '@react-navigation/native';

const UserType = ({route}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {phone} = route.params;
  const userType = useSelector(state => state.user.type);

  return (
    <Linear>
      <Header title="Register" />

      <View className="items-center justify-between mb-6 flex-1">
        <Title bold xl>
          Register As:
        </Title>

        <View className="items-center justify-center">
          <Card
            style={[styles.card, userType === 'user' && styles.selectedCard]}
            onPress={() => dispatch(changeUserType('user'))}>
            <Image
              style={styles.icon}
              source={
                userType === 'user'
                  ? require('../../../assets/user-dark.png')
                  : require('../../../assets/user-light.png')
              }
            />
            <Title xxl bold black={userType === 'user'}>
              User
            </Title>
          </Card>
          <Card
            style={[styles.card, userType === 'driver' && styles.selectedCard]}
            onPress={() => dispatch(changeUserType('driver'))}>
            <Image
              style={styles.icon}
              source={
                userType === 'driver'
                  ? require('../../../assets/driver-dark.png')
                  : require('../../../assets/driver-light.png')
              }
            />
            <Title xxl bold black={userType === 'driver'}>
              Driver
            </Title>
          </Card>
        </View>
        <Button
          title="Next"
          onPress={() => navigation.navigate('CreateAccount', {phone})}
          style={{marginTop: 20}}
        />
      </View>
    </Linear>
  );
};

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  card: {
    width: width * 0.65,
    height: height * 0.3,
    marginBottom: 20,
    shadowColor: '#000',
    gap: 10,
    elevation: 2,
  },
  selectedCard: {
    backgroundColor: colors.primary,
  },
  icon: {
    width: 120,
    height: 120,
    marginBottom: 10,
  },
});

export default React.memo(UserType);
