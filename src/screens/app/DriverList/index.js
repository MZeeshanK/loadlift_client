import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  Pressable,
  useColorScheme,
} from 'react-native';

import Linear from '../../../components/Linear';
import Header from '../../../components/Header';
import Card from '../../../components/Card';
import Button from '../../../components/Button';

import driverList from '../../../data/driverList';
import categories from '../../../data/categories';

import colors from '../../../constants/colors';
import styleConstants from '../../../constants/styles';
import Title from '../../../components/Title';

const DriverList = ({navigation}) => {
  const colorScheme = useColorScheme();

  const primary = colorScheme === 'dark' ? colors.primary : colors.lightPrimary;
  const card = colorScheme === 'dark' ? colors.card : colors.lightCard;
  const ongoing = colorScheme === 'dark' ? colors.ongoing : colors.lightOngoing;

  const [driver, setDriver] = useState({});

  const Item = ({item}) => {
    const image = categories.find(
      category => category?.title === item?.typeOfVehicle,
    );

    return (
      <Pressable
        onPress={() => setDriver(item)}
        className="flex-1 flex-row items-center justify-center mb-5 rounded-xl py-4"
        style={{
          backgroundColor: driver === item ? primary : ongoing,
          elevation: 2,
        }}>
        <View
          className="items-center justify-center border-r-2 w-16 h-full"
          style={{
            borderColor:
              driver === item && colorScheme === 'dark'
                ? colors.black
                : driver === item && colorScheme !== 'dark'
                ? colors.white
                : colorScheme === 'dark'
                ? colors.white
                : colors.black,
          }}>
          <Image
            source={
              driver === item && colorScheme === 'dark'
                ? image?.darkIcon
                : driver === item && colorScheme === 'light'
                ? image?.icon
                : colorScheme !== 'dark'
                ? image?.darkIcon
                : image?.icon
            }
            style={styles.icon}
          />
          <Title className="tracking-tighter" xxs black={driver === item}>
            {item?.typeOfVehicle}
          </Title>
        </View>
        <View className="flex-1 flex-row items-center justify-between px-1">
          <View className="w-1/2 items-start justify-center">
            <Title
              semibold
              sm
              left
              className="tracking-tighter leading-5 "
              black={driver === item}>
              {item?.driverName}
            </Title>
            <View className="flex-row items-center">
              <Title
                className="tracking-tighter leading-4 "
                xxs
                semibold
                black={driver === item}>
                {item?.driverRating}
              </Title>
              <Image
                source={
                  driver === item && colorScheme === 'dark'
                    ? require('../../../assets/star-dark.png')
                    : driver === item && colorScheme === 'light'
                    ? require('../../../assets/star-light.png')
                    : colorScheme !== 'dark'
                    ? require('../../../assets/star-dark.png')
                    : require('../../../assets/star-light.png')
                }
                style={styles.star}
              />
            </View>
          </View>
          <View className="flex-row items-center justify-center px-1">
            <Title
              className="tracking-tighter"
              xsm
              bold
              black={driver === item}>
              Rate/Km:{' '}
            </Title>
            <Title
              className="tracking-tighter"
              xsm
              semibold
              black={driver === item}>
              {'\u20b9'} {item?.rateperKm}
            </Title>
          </View>
        </View>
        <View
          className={`items-center justify-center border-l-2 h-full border-primary ${
            driver === item && 'border-black'
          } px-3`}
          style={{
            borderColor:
              driver === item && colorScheme === 'dark'
                ? colors.black
                : driver === item && colorScheme === 'light'
                ? colors.white
                : colorScheme === 'dark'
                ? colors.white
                : colors.black,
          }}>
          <Title
            className="tracking-tighter"
            xsm
            semibold
            black={driver === item}>
            {item?.distance}m
          </Title>
          <Title
            className="tracking-tighter leading-3"
            xsm
            semibold
            black={driver === item}>
            away
          </Title>
        </View>
      </Pressable>
    );
  };

  return (
    <Linear>
      <Header title="Driver List" />
      <View className="w-full flex-1 items-center justify-center">
        <View className="w-full flex-1 mb-5">
          <Card style={{width: '100%', flex: 1}}>
            <Title className="tracking-wider my-2 mb-8" xl bold>
              Choose a driver from the list.
            </Title>
            <FlatList
              // showsVerticalScrollIndicator={false}
              className="flex-1 w-full"
              data={driverList}
              keyExtractor={item => item?.id}
              renderItem={({item}) => <Item item={item} />}
            />
          </Card>
        </View>
        {/* <View className="flex-1" /> */}
        <Button
          title="Book Vehicle"
          style={{marginVertical: 15}}
          onPress={() => navigation.navigate('Order')}
        />
      </View>
    </Linear>
  );
};

const styles = StyleSheet.create({
  icon: {
    ...styleConstants.icon,
  },
  star: {
    width: 10,
    height: 10,
    marginLeft: 2,
    marginTop: 1,
  },
});

export default React.memo(DriverList);
