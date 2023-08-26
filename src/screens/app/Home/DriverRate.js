import React, {useEffect, useState} from 'react';
import {View, StyleSheet, useColorScheme, Pressable} from 'react-native';
import Card from '../../../components/Card';
import Title from '../../../components/Title';
import Input from '../../../components/Input';
import colors from '../../../constants/colors';
import {useDispatch, useSelector} from 'react-redux';
import {changeRate, userDetails} from '../../../store/user';
import Button from '../../../components/Button';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const DriverRate = () => {
  const colorScheme = useColorScheme();
  const dispatch = useDispatch();

  const {data: userData, token: userToken} = useSelector(state => state.user);

  const {ratePerKm: rate} = userData;

  const [perKmRate, setPerKmRate] = useState(rate || 0);
  const [edit, setEdit] = useState(false);
  const [isMount, setIsMount] = useState(false);

  const ongoing = colorScheme === 'dark' ? colors.ongoing : colors.lightOngoing;
  const primary = colorScheme === 'dark' ? colors.primary : colors.lightPrimary;

  const buttonClassName =
    'rounded-full border-2 w-8 items-center justify-center aspect-square';

  const styles = StyleSheet.create({
    adjust: {
      backgroundColor: ongoing,
      borderColor: primary,
    },
  });

  useEffect(() => {
    if (rate !== perKmRate) {
      setEdit(true);
    }
  }, [perKmRate]);

  const setRate = async () => {
    const url = `${BACKEND_URL}/api/drivers/me/rate`;

    try {
      const {data, status} = await axios({
        method: 'PUT',
        url,
        data: {
          ratePerKm: perKmRate,
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

  const next = () => {
    setRate();
    setEdit(false);
  };

  useEffect(() => {
    if (isMount) {
      next();
      setIsMount(false);
    }
  }, [isMount]);

  return (
    <Card>
      <View className="w-full items-center justify-center">
        <View className="items-center justify-center py-2">
          <Title base bold className="tracking-wider uppercase mb-3 py-0">
            Set rating per km
          </Title>
          <View className="w-full flex-row items-center justify-evenly px-4 mb-3">
            <Pressable
              className={buttonClassName}
              style={styles.adjust}
              onPress={() => setPerKmRate(val => +val - 10)}>
              <Title className="pt-[1]" base bold primary>
                -
              </Title>
            </Pressable>
            <Input
              className="flex-1 my-0 text-base text-center"
              placeholder="Set Rate per km"
              value={perKmRate?.toString()}
              keyboardType="numeric"
              onChangeText={val => {
                setPerKmRate(val);
              }}
            />
            <Pressable
              className={buttonClassName}
              style={styles.adjust}
              onPress={() => setPerKmRate(val => +val + 10)}>
              <Title className="pt-[1]" base bold primary>
                +
              </Title>
            </Pressable>
          </View>
        </View>
      </View>
      {edit && <Button title="Done" half className="mt-5" onPress={next} />}
    </Card>
  );
};

export default React.memo(DriverRate);
