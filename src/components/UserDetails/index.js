import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  Image,
  Dimensions,
} from 'react-native';
import TextLabel from '../TextLabel';
import Input from '../Input';
import Card from '../Card';

import categories from '../../data/categories';
import Title from '../Title';
import Button from '../Button';

import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';
import {setLoading} from '../../store/misc';
import {userDetails, switchUser} from '../../store/user';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

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
      ? categories.find(category => user?.typeOfVehicle === category?.title)
      : {},
  );
  const phone = user?.phone?.toString() || phoneNumber;
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [vehicleNumber, setVehicleNumber] = useState(
    user?.vehicleNumber?.toString() || '',
  );
  const [isMount, setIsMount] = useState(false);

  const url =
    userType === 'user'
      ? `${BACKEND_URL}/api/users/register`
      : `${BACKEND_URL}/api/drivers/register`;

  const updateUrl =
    userType === 'user'
      ? `${BACKEND_URL}/api/users/me`
      : `${BACKEND_URL}/api/drivers/me`;

  const switchUrl = `${BACKEND_URL}/api/users/me/switch`;

  useEffect(() => {
    const register = async inputs => {
      dispatch(setLoading(true));

      try {
        const {status} = await axios({
          method: 'POST',
          url,
          data: inputs,
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (status === 200) {
          navigation.navigate('OTP', {phone});
        }
      } catch (err) {
        console.log(err.response.data);
      }
      dispatch(setLoading(false));
    };

    const update = async inputs => {
      dispatch(setLoading(true));
      try {
        const {data, status} = await axios({
          method: 'PUT',
          url: updateUrl,
          data: inputs,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userToken}`,
          },
        });

        if (status === 200) {
          dispatch(
            userDetails({
              phone: data?.user?.phone,
              firstName: data?.user?.firstName,
              lastName: data?.user?.lastName,
            }),
            navigation.goBack(),
          );
        }
      } catch (err) {
        console.log(err.response.data);
      }
      dispatch(setLoading(false));
    };

    const switchUser = async () => {
      try {
        const {data, status} = await axios({
          method: 'POST',
          url: switchUrl,
          data: driverInputs,
          headers: {
            Authorization: `Bearer ${userToken}`,
            'Content-Type': 'application/json',
          },
        });

        console.log(data, status);
      } catch (err) {
        console.log('error', err.response);
      }
    };

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

    if (isMount) {
      if (info === 'create') {
        if (userType === 'user') {
          register(userInputs);
        } else {
          register(driverInputs);
        }
      } else if (info === 'switch') {
        switchUser();
      } else {
        if (userType === 'user') {
          update(userInputs);
        } else {
          update(driverInputs);
        }
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
