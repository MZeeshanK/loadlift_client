import React, {useEffect, useState} from 'react';
import {View, StyleSheet, useColorScheme, Pressable} from 'react-native';
import Card from '../../../components/Card';
import Title from '../../../components/Title';
import Input from '../../../components/Input';
import colors from '../../../constants/colors';
import {useDispatch, useSelector} from 'react-redux';
import {changeRate} from '../../../store/user';
import Button from '../../../components/Button';

const DriverRate = () => {
  const colorScheme = useColorScheme();
  const dispatch = useDispatch();

  const {perkm, per5km} = useSelector(state => state.user.rate);

  const [perKmRate, setPerKmRate] = useState(perkm);
  const [per5KmRate, setPer5KmRate] = useState(per5km);
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
    if (perkm !== perKmRate || per5km !== per5KmRate) {
      setEdit(true);
    }
  }, [per5KmRate, perKmRate]);

  const next = () => {
    dispatch(changeRate({perkm: perKmRate, per5km: per5KmRate}));
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
        <View
          className="items-center justify-center border-b-2 py-2"
          style={{borderColor: ongoing}}>
          <Title bold className="tracking-wider uppercase my-0 py-0">
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
              className="flex-1 my-0"
              placeholder="Set Rate per km"
              value={perKmRate.toString()}
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
        <View className="items-center justify-center py-2">
          <Title bold className="tracking-wider uppercase my-0 py-0">
            Set rating per 5 km
          </Title>
          <View className="w-full flex-row items-center justify-evenly px-4 mb-3">
            <Pressable
              className={buttonClassName}
              style={styles.adjust}
              onPress={() => setPer5KmRate(val => +val - 10)}>
              <Title className="pt-[1]" base bold primary>
                -
              </Title>
            </Pressable>
            <Input
              className="flex-1 my-0"
              placeholder="Set Rate per km"
              value={per5KmRate.toString()}
              keyboardType="numeric"
            />
            <Pressable
              className={buttonClassName}
              style={styles.adjust}
              onPress={() => setPer5KmRate(val => +val + 10)}>
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
