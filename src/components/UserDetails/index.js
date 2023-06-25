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
import Card from '../Card';

import categories from '../../data/categories';
import Title from '../Title';
import Button from '../Button';

import {useNavigation} from '@react-navigation/native';

const UserDetails = ({user, ...props}) => {
  const navigation = useNavigation();

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
        <View className="w-[95%] mb-4 mt-2 h-[1] bg-primary" />

        <TextLabel title="First Name:" />
        <Input placeholder={user ? user?.firstName : 'Enter your First Name'} />

        <TextLabel title="Last Name:" />
        <Input placeholder={user ? user?.lastName : 'Enter your Last Name'} />

        {driver && (
          <>
            {/* Divide Bar */}
            <View className="w-[95%] mb-4 mt-2 h-[1] bg-primary" />

            <TextLabel title="Vehicle Number:" />
            <Input
              placeholder={
                user
                  ? user?.vehicleNumber
                  : 'Enter your vehicle registration Number'
              }
            />

            {/* Category list for drivers */}
            <TextLabel title="Category of Vehicle" />
            <FlatList
              horizontal
              className="px-4 py-2 mt-2 rounded-xl bg-card"
              showsHorizontalScrollIndicator={false}
              data={categories}
              keyExtractor={item => item?.id}
              renderItem={({item, index}) => (
                <Card
                  alt
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
        onPress={() => navigation.navigate(user ? 'Account' : 'Tabs')}
        style={{marginTop: 50, width: '65%', alignSelf: 'center'}}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  cardButton: {
    backgroundColor: colors.ongoing,
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
