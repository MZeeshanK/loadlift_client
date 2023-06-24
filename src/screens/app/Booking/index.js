import React, {useState} from 'react';
import {View, StyleSheet, FlatList, Pressable, Text, Image} from 'react-native';

import Linear from '../../../components/Linear';
import Header from '../../../components/Header';
import InputButton from '../../../components/InputButton';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import Card from '../../../components/Card';
import categories from '../../../data/categories';
import CardButton from '../../../components/CardButton';

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
        <Text
          className={`text-primary font-semibold text-base ${
            weight && 'text-black'
          }`}>
          Weight
        </Text>
      </View>
      <View
        className={`flex-1 bg-transparent rounded-full items-center justify-center ${
          !weight && 'bg-primary'
        }`}>
        <Text
          className={`text-primary font-semibold text-base ${
            !weight && 'text-black'
          }`}>
          Vehicle
        </Text>
      </View>
    </Pressable>
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
          <Card className="w-full mb-10 py-2">
            <Text className="text-primary text-2xl text-center font-bold pb-2">
              Categories
            </Text>
            <FlatList
              className="w-full"
              showsVerticalScrollIndicator={false}
              data={categories}
              keyExtractor={item => item?.id}
              renderItem={({item}) => {
                return (
                  <CardButton
                    onPress={() => setVehicle(item)}
                    selected={vehicle === item}
                    style={[
                      {
                        width: '100%',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      },
                    ]}>
                    <View
                      className={`border-r-2 h-[44] my-2 border-primary items-center justify-center px-3 ${
                        vehicle === item && 'border-black'
                      }`}>
                      <Image
                        source={vehicle === item ? item?.darkIcon : item?.icon}
                        style={styles.icon}
                      />
                    </View>
                    <View className="flex-row flex-1 px-2 items-center justify-between">
                      <Text
                        className={`text-lg font-semibold text-white ${
                          vehicle === item && 'text-black'
                        }`}>
                        {item?.title}
                      </Text>
                      <View className="items-start justify-center gap-y-2 px-2">
                        <Text
                          className={`text-xs font-bold text-white tracking-tighter ${
                            vehicle === item && 'text-black'
                          }`}>
                          Max Capacity:{' '}
                          <Text className="font-normal">{item?.weight}T</Text>
                        </Text>
                        <Text
                          className={`text-xs font-bold text-white tracking-tighter ${
                            vehicle === item && 'text-black'
                          }`}>
                          Rate:{' '}
                          <Text className="font-normal">
                            {'\u20b9'} {item?.rate} / km
                          </Text>
                        </Text>
                      </View>
                    </View>
                  </CardButton>
                );
              }}
            />
          </Card>
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
