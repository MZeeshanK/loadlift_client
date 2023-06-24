import React, {useState} from 'react';
import {View, StyleSheet, Text, FlatList, Image, Pressable} from 'react-native';

import Linear from '../../../components/Linear';
import Header from '../../../components/Header';
import Card from '../../../components/Card';
import Button from '../../../components/Button';

import driverList from '../../../data/driverList';
import categories from '../../../data/categories';

import colors from '../../../constants/colors';
import styleConstants from '../../../constants/styles';

const DriverList = ({navigation}) => {
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
          backgroundColor:
            driver === item ? colors.primary : colors.ongoingBackground,
          elevation: 3,
        }}>
        <View
          className={`items-center justify-center border-r-2 border-primary ${
            driver === item && 'border-black'
          } px-2 h-full`}>
          <Image
            source={driver === item ? image?.darkIcon : image?.icon}
            style={styles.icon}
          />
          <Text
            className={`text-white ${
              driver === item && 'text-black'
            } font-semibold tracking-tighter mt-2`}
            style={{fontSize: 9}}>
            {item?.typeOfVehicle}
          </Text>
        </View>
        <View className="flex-1 flex-row items-center justify-between px-2">
          <View className="items-start justify-center gap-y-1">
            <Text
              className={`text-white ${
                driver === item && 'text-black'
              } text-xs font-semibold tracking-tighter`}>
              {item?.driverName}
            </Text>
            <View className="flex-row items-center gap-x-1">
              <Text
                className={`text-white ${
                  driver === item && 'text-black'
                } text-xs text-semibold tracking-tighter`}>
                {item?.driverRating}
              </Text>
              <Image
                source={
                  driver === item
                    ? require('../../../assets/star-dark.png')
                    : require('../../../assets/star-light.png')
                }
                style={styles.star}
              />
            </View>
          </View>
          <Text
            className={`text-sm text-white ${
              driver === item && 'text-black'
            } font-bold tracking-tighter`}>
            {item?.vehicleNumber}
          </Text>
        </View>
        <View
          className={`items-center justify-center border-l-2 h-full border-primary ${
            driver === item && 'border-black'
          } px-2`}>
          <Text
            className={`text-white ${
              driver === item && 'text-black'
            } font-semibold text-sm tracking-tighter`}>
            {item?.distance}m away
          </Text>
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
            <Text className="text-white font-bold text-xl tracking-wider my-2 mb-8">
              Choose a driver from the list.
            </Text>
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
  },
});

export default React.memo(DriverList);
