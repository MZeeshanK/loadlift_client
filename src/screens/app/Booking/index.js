import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Pressable,
  Image,
  Dimensions,
} from 'react-native';

import Linear from '../../../components/Linear';
import Header from '../../../components/Header';
import InputButton from '../../../components/InputButton';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import Card from '../../../components/Card';
import categories from '../../../data/categories';
import Title from '../../../components/Title';

const {height} = Dimensions.get('window');

const Booking = ({navigation}) => {
  const [weight, setWeight] = useState(true);
  const [vehicle, setVehicle] = useState(categories[0]);

  const ChipButton = () => (
    <Pressable
      className="w-[70%] border-2 border-primary rounded-full flex-row items-center justify-center mb-4"
      onPress={() => setWeight(weight => !weight)}>
      <View
        className={`flex-1 bg-transparent rounded-full items-center justify-center ${
          weight && 'bg-primary'
        }`}>
        <Title primary={!weight} black={weight} bold>
          Weight
        </Title>
      </View>
      <View
        className={`flex-1 bg-transparent rounded-full items-center justify-center ${
          !weight && 'bg-primary'
        }`}>
        <Title primary={weight} black={!weight} bold>
          Vehicle
        </Title>
      </View>
    </Pressable>
  );

  const VehicleCard = () => (
    <Card className="w-full mb-10 py-2">
      <Title primary xxl bold className="pb-2">
        Categories
      </Title>
      <FlatList
        className="w-full"
        style={{height: height / 3}}
        showsVerticalScrollIndicator={false}
        data={categories}
        keyExtractor={item => item?.id}
        renderItem={({item, index}) => {
          return (
            <Card
              onPress={() => setVehicle(item)}
              style={[
                {
                  backgroundColor:
                    vehicle === item ? colors.primary : colors.ongoing,
                  width: '100%',
                  flexDirection: 'row',
                },
                index === categories.length - 1 && {marginBottom: 50},
              ]}>
              <View
                className={`border-r-2 border-primary pr-3 h-12 items-center justify-center ${
                  vehicle === item && 'border-black'
                }`}>
                <Image
                  source={vehicle === item ? item?.darkIcon : item?.icon}
                  style={styles.icon}
                />
              </View>
              <View className="flex-row flex-1 px-2 items-center justify-between">
                <Title base bold black={vehicle === item}>
                  {item?.title}
                </Title>
                <View className="items-start justify-center px-2">
                  <Title
                    className="tracking-tighter"
                    xsm
                    bold
                    black={vehicle === item}>
                    Max Capacity:{' '}
                    <Title xsm medium black={vehicle === item}>
                      {item?.weight}T
                    </Title>
                  </Title>
                  <Title
                    className="tracking-tighter"
                    xsm
                    bold
                    black={vehicle === item}>
                    Rate:{' '}
                    <Title xsm medium black={vehicle === item}>
                      {'\u20b9'} {item?.rate} / km
                    </Title>
                  </Title>
                </View>
              </View>
            </Card>
          );
        }}
      />
    </Card>
  );

  return (
    <Linear>
      <Header title="Booking" />
      <View className="w-full flex-1 items-center justify-start">
        <InputButton
          title="Set pick-up location"
          onPress={() => navigation.navigate('Map')}
        />
        <InputButton
          title="Set Destination location"
          onPress={() => navigation.navigate('Map')}
        />

        <View className="w-full h-[1] bg-primary rounded-full my-5" />

        <ChipButton />

        {weight ? (
          <Input
            placeholder="Enter Weight in Kg"
            keyboard="numeric"
            style={{marginTop: 20}}
          />
        ) : (
          <>
            <VehicleCard />
            <View className="flex-1" />
          </>
        )}
      </View>
      <Button
        title="Search for drivers"
        onPress={() => navigation.navigate('DriverList')}
        style={{marginBottom: 16}}
      />
    </Linear>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 50,
    height: 21,
  },
});

export default React.memo(Booking);
