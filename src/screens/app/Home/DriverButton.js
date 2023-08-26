import React, {useEffect, useState} from 'react';
import {Pressable, Dimensions, useColorScheme} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';

import Title from '../../../components/Title';

import colors from '../../../constants/colors';
import axios from 'axios';
import {changeActivity, userDetails} from '../../../store/user';

const {width} = Dimensions.get('window');

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const DriverHomeButton = () => {
  const colorScheme = useColorScheme();
  const dispatch = useDispatch();

  const [isMount, setIsMount] = useState(false);

  const {data: userData, token: userToken} = useSelector(state => state.user);

  const {active} = userData;

  const activateDriver = async () => {
    const url = `${BACKEND_URL}/api/drivers/me/activate`;

    try {
      const {data, status} = await axios({
        method: 'PUT',
        url,
        data: {
          active: !active,
        },
        headers: {
          Authorization: `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (status === 200) {
        dispatch(userDetails(data));
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (isMount) {
      activateDriver();
      setIsMount(false);
    }
  }, [isMount]);

  const primary = colorScheme === 'dark' ? colors.primary : colors.lightPrimary;
  return (
    <>
      {active && (
        <Title className="my-3 tracking-wider" lg bold>
          You are now visible to customers
        </Title>
      )}
      <Pressable
        onPress={() => setIsMount(isMount => !isMount)}
        className={`aspect-square items-center justify-center rounded-full border-4  mb-5 `}
        style={[
          {
            width: width - 220,
            backgroundColor: active && primary,
            borderColor: primary,
          },
          active && {
            elevation: 10,
            shadowColor: colors.ongoing,
          },
        ]}>
        <Title xxl bold primary={!active} black={active}>
          {active ? 'Active' : 'InActive'}
        </Title>
      </Pressable>
    </>
  );
};

export default React.memo(DriverHomeButton);
