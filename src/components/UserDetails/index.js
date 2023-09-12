import React, {useEffect, useState, useRef} from 'react';
import {View, StyleSheet, ScrollView, FlatList, Image} from 'react-native';
import TextLabel from '../TextLabel';
import Input from '../Input';
import Card from '../Card';

import categories from '../../data/categories';
import Title from '../Title';
import Button from '../Button';

import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {registerUser, updateUser} from '../../store/user';

const UserDetails = ({phoneNumber, info}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {
    type: userType,
    data: user,
    token: userToken,
  } = useSelector(state => state.user);

  const [category, setCategory] = useState(
    user
      ? categories.find(category => user?.typeOfVehicle === category?.value)
      : {},
  );
  const phone = user?.phone?.toString() || phoneNumber;
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [vehicleNumber, setVehicleNumber] = useState(
    user?.vehicleNumber?.toString() || '',
  );
  const [isMount, setIsMount] = useState(false);

  const userInputs = {
    phone,
    firstName,
    lastName,
  };

  const driverInputs = {
    phone,
    firstName,
    lastName,
    vehicleNumber,
    typeOfVehilce: category?.title,
  };

  const inputs = userType === 'driver' ? driverInputs : userInputs;

  useEffect(() => {
    if (isMount) {
      if (info === 'create') {
        dispatch(registerUser({userType, inputs, phone, navigation}));
      }
      if (info === 'profile') {
        dispatch(updateUser({userType, inputs, userToken, navigation}));
      }

      setIsMount(false);
    }
  }, [isMount]);

  const lastNameRef = useRef();
  const vehicleNumberRef = useRef();

  return (
    <View className="h-full w-full items-center justify-between">
      <ScrollView className="w-full" showsHorizontalScrollIndicator={false}>
        <View className="w-full items-center">
          <TextLabel title="Phone Number:" />
          <Input
            placeholder={user ? `+91 ${user?.phone}` : `+91 ${phoneNumber}`}
            isDisabled={true}
          />
          {/* Divide Bar */}
          <View className="w-[95%] mb-4 mt-2 h-[1] bg-primary" />

          <TextLabel title="First Name:" />
          <Input
            value={firstName}
            onChangeText={setFirstName}
            returnKeyType="next"
            onSubmitEditing={() => lastNameRef.current.focus()}
            blurOnSubmit={false}
            placeholder="Enter your First Name"
          />

          <TextLabel title="Last Name:" />
          <Input
            value={lastName}
            ref={lastNameRef}
            onChangeText={setLastName}
            onSubmitEditing={() => {
              if (userType === 'user') {
                setIsMount(!isMount);
              } else {
                vehicleNumberRef.current.focus();
              }
            }}
            returnKeyType={userType === 'driver' ? 'next' : 'done'}
            placeholder="Enter your Last Name"
          />

          {(userType === 'driver' || info === 'switch') && (
            <>
              {/* Divide Bar */}
              <View className="w-[95%] mb-4 mt-2 h-[1] bg-primary" />

              <TextLabel title="Vehicle Number:" />
              <Input
                value={vehicleNumber}
                onChangeText={setVehicleNumber}
                placeholder="Enter your vehicle registration Number"
                ref={vehicleNumberRef}
              />

              {/* Category list for drivers */}
              <TextLabel title="Category of Vehicle" />
              <FlatList
                horizontal
                className="px-4 py-2 mt-2 rounded-xl"
                style={{
                  backgroundColor: colors.card,
                }}
                showsHorizontalScrollIndicator={false}
                data={categories}
                keyExtractor={item => item?.id}
                renderItem={({item, index}) => (
                  <Card
                    ongoing
                    border
                    style={[
                      styles.cardButton,
                      category === item && {backgroundColor: colors.primary},
                      index === categories.length - 1 && {marginRight: 30},
                    ]}
                    onPress={() => setCategory(item)}>
                    {item?.icon && item?.darkIcon ? (
                      <Image
                        source={category === item ? item.darkIcon : item.icon}
                        style={styles.icon}
                      />
                    ) : (
                      <View style={styles.icon} />
                    )}
                    <Title
                      className="pt-3 leading-3 tracking-wider"
                      xxsm
                      semibold
                      black={category === item}>
                      {item?.title}
                    </Title>
                    <Title
                      className="leading-3"
                      xxsm
                      semibold
                      black={category === item}>
                      {item?.weight}T
                    </Title>
                  </Card>
                )}
              />
            </>
          )}
        </View>
      </ScrollView>
      <Button
        title={user ? 'Update Profile' : 'Create Account'}
        onPress={() => setIsMount(!isMount)}
        className="mb-10"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  cardButton: {
    width: 105,
    height: 100,
    elevation: 1,
    marginRight: 10,
    elevation: 2,
  },
  icon: {
    width: 60,
    height: 22,
  },
});

export default React.memo(UserDetails);
