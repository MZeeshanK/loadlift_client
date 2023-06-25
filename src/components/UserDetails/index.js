import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  Image,
  Text,
} from 'react-native';
import TextLabel from '../TextLabel';
import Input from '../Input';
import CardButton from '../CardButton';

import categories from '../../data/categories';

const UserDetails = ({user, ...props}) => {
  const [driver, setDriver] = useState(true);
  const [category, setCategory] = useState(
    user
      ? categories.find(category => user?.typeOfVehicle === category?.title)
      : {},
  );

  return (
    <ScrollView
      className="w-full flex-1"
      showsHorizontalScrollIndicator={false}>
      <View className="w-full items-center">
        <TextLabel title="Phone Number:" />
        <Input
          placeholder={user ? `+91 ${user?.phone}` : '+91 94190 09876'}
          isDisabled={true}
        />

        {/* Divide Bar */}
        <View className="w-[95%] mb-8 h-[1] bg-primary" />

        <TextLabel title="First Name:" />
        <Input placeholder={user ? user?.firstName : 'Enter your First Name'} />

        <TextLabel title="Last Name:" />
        <Input placeholder={user ? user?.lastName : 'Enter your Last Name'} />

        {driver && (
          <>
            {/* Divide Bar */}
            <View className="w-[95%] mb-5 h-[1] bg-primary" />

            <TextLabel title="Vehicle Number:" />
            <Input
              placeholder={
                user
                  ? user?.vehicleNumber
                  : 'Please Enter your vehicle registration Number'
              }
            />

            {/* Category list for drivers */}
            <TextLabel title="Category of Vehicle" />

            <FlatList
              horizontal
              className="px-4 py-2 mt-2 rounded-xl"
              style={{backgroundColor: colors.cardBackground}}
              showsHorizontalScrollIndicator={false}
              data={categories}
              keyExtractor={item => item?.id}
              renderItem={({item, index}) => (
                <CardButton
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
                  <Text
                    className={`text-xs font-bold pt-2 tracking-wider ${
                      category === item ? 'text-black' : 'text-white'
                    } `}>
                    {item?.title}
                  </Text>
                  <Text
                    className={`text-xs font-bold ${
                      category === item ? 'text-black' : 'text-white'
                    } `}>
                    {item?.weight}T
                  </Text>
                </CardButton>
              )}
            />
          </>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  cardButton: {
    width: 100,
    height: 90,
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
