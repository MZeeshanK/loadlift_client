import React, {useEffect, useState} from 'react';
import {Pressable, Dimensions, useColorScheme} from 'react-native';

import Title from '../../../components/Title';

import colors from '../../../constants/colors';

import {useSelector, useDispatch} from 'react-redux';
import {activateDriver} from '../../../store/user';

const {width} = Dimensions.get('window');

const DriverHomeButton = () => {
  const colorScheme = useColorScheme();
  const dispatch = useDispatch();

  // local state
  const [isMount, setIsMount] = useState(false);

  // global states
  const {data: userData, token: userToken} = useSelector(state => state.user);
  const orders = useSelector(state => state.orders.data);

  const activeOrder = orders.find(
    order =>
      order?.order?.status.code !== 0 &&
      order?.order?.status.code !== 9 &&
      order?.order?.status.code !== 8 &&
      order?.order?.status.code !== 4,
  );

  const {active} = userData;

  useEffect(() => {
    if (isMount) {
      dispatch(activateDriver({active, userToken}));
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
        onPress={() => {
          if (!activeOrder) setIsMount(isMount => !isMount);
        }}
        className={`aspect-square items-center justify-center rounded-full border-4 mb-5`}
        style={[
          {
            width: width - 220,
            backgroundColor: active ? primary : 'transparent',
            borderColor: primary,
          },
          active && {
            elevation: 10,
            shadowColor: colors.ongoing,
          },
        ]}>
        <Title xxl bold primary={!active} black={active}>
          {activeOrder ? 'isDelivering' : active ? 'Active' : 'InActive'}
        </Title>
      </Pressable>
    </>
  );
};

export default React.memo(DriverHomeButton);
