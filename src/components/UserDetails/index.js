import React, {useEffect, useState, useRef} from 'react';
import {View, StyleSheet, ScrollView, FlatList, Image} from 'react-native';
import TextLabel from '../TextLabel';
import Input from '../Input';
import Card from '../Card';

import categories from '../../data/categories';
import Title from '../Title';
import Button from '../Button';
import Alert from '../Alert';

import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';
import {setLoading} from '../../store/misc';

const UserDetails = ({phone}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const userType = useSelector(state => state.user.type);
  const user = useSelector(state => state.user.data);

  const [category, setCategory] = useState(
    user
      ? categories.find(category => user?.typeOfVehicle === category?.title)
      : {},
  );
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [vehicleNumber, setVehicleNumber] = useState(user?.vehicleNumber || '');
  const [isMount, setIsMount] = useState(false);
  const [error, setError] = useState(false);
  const [errorModal, setErrorModal] = useState(false);

  console.log(category);

  useEffect(() => {
    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

    const url =
      userType === 'user'
        ? `${BACKEND_URL}/api/users/register`
        : `${BACKEND_URL}/api/drivers/register`;

    const userRegister = async () => {
      dispatch(setLoading(true));
      try {
        const {data, status} = await axios.post(
          url,
          {
            phone,
            firstName,
            lastName,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );

        console.log(data, status);
        if (status === 200) {
          navigation.navigate('OTP', {phone});
        }
      } catch (err) {
        console.log(err);
      }
      dispatch(setLoading(false));
    };

    const driverRegister = async () => {
      dispatch(setLoading(true));
      try {
        const {data, status} = await axios.post(
          url,
          {
            phone,
            firstName,
            lastName,
            typeOfVehicle: category.title,
            vehicleNumber,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        console.log(data, status);

        if (status === 200) {
          navigation.navigate('OTP', {phone});
        }
      } catch (err) {
        console.log(err.response.data);
      }
      dispatch(setLoading(false));
    };

    if (isMount) {
      if (userType === 'user') {
        userRegister();
      } else {
        driverRegister();
      }
      setIsMount(false);
    }
  }, [isMount]);

  const lastNameRef = useRef();
  const vehicleNumberRef = useRef();

  return (
    <ScrollView
      className="w-full flex-1"
      showsHorizontalScrollIndicator={false}>
      <Alert message={error} visible={errorModal} setVisible={setErrorModal} />
      <View className="w-full items-center">
        <TextLabel title="Phone Number:" />
        <Input
          placeholder={user ? `+91 ${user?.phone}` : `+91 ${phone}`}
          isDisabled={true}
        />
        {/* Divide Bar */}
        <View className="w-[95%] mb-4 mt-2 h-[1] bg-primary" />

        <TextLabel title="First Name:" />
        <Input
          value={firstName}
          onChangeText={setFirstName}
          returnKeyType="next"
          onSubmitEditing={() => {
            lastNameRef.current.focus();
            // console.log(123);
          }}
          blurOnSubmit={false}
          placeholder="Enter your First Name"
        />

        <TextLabel title="Last Name:" />
        <Input
          value={lastName}
          ref={lastNameRef}
          onChangeText={setLastName}
          onSubmitEditing={() => {
            if (user) {
              setIsMount(!isMount);
            } else {
              vehicleNumberRef.current.focus();
            }
          }}
          returnKeyType={userType === 'driver' ? 'next' : 'done'}
          placeholder="Enter your Last Name"
        />

        {userType === 'driver' && (
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
      <Button
        title={user ? 'Update Profile' : 'Create Account'}
        onPress={() => setIsMount(!isMount)}
        style={{marginTop: 50, width: '65%', alignSelf: 'center'}}
      />
    </ScrollView>
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
