import React, {useState} from 'react';

import {
  View,
  ScrollView,
  Text,
  FlatList,
  StyleSheet,
  Image,
} from 'react-native';

import Linear from '../../../components/Linear';
import Header from '../../../components/Header';
import TextLabel from '../../../components/TextLabel';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import Card from '../../../components/Card';

import categories from '../../../data/categories';
import colors from '../../../constants/colors';
import CardButton from '../../../components/CardButton';

const CreateAccount = ({navigation}) => {
  const [driver, setDriver] = useState(true);
  const [category, setCategory] = useState({});

  return (
    <Linear>
      <Header title={'Create Account'} />

      <View className="flex-1 w-full items-center justify-between mb-10">
        <ScrollView
          className="w-full flex-1"
          showsHorizontalScrollIndicator={false}>
          <View className="w-full items-center">
            <TextLabel title="Phone Number:" />
            <Input placeholder="+91 94190 12345" isDisabled={true} />

            {/* Divide Bar */}
            <View className="w-[95%] mb-8 h-[1] bg-primary" />

            <TextLabel title="First Name:" />
            <Input placeholder="Enter your First Name" />

            <TextLabel title="Last Name:" />
            <Input placeholder="Enter your Last Name" />

            {driver && (
              <>
                {/* Divide Bar */}
                <View className="w-[95%] mb-5 h-[1] bg-primary" />

                <TextLabel title="Vehicle Number:" />
                <Input placeholder="Please Enter your vehicle registration Number" />

                {/* Category list for drivers */}
                <TextLabel title="Category of Vehicle" />

                <FlatList
                  horizontal
                  className="px-4 py-2 mt-2 rounded-xl"
                  style={{backgroundColor: 'rgba(0,0,0,.3)'}}
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

        <Button
          title="Create Account"
          onPress={() => navigation.navigate('Home')}
        />
      </View>
    </Linear>
  );
};

const styles = StyleSheet.create({
  cardButton: {
    width: 100,
    height: 90,
    elevation: 5,
    marginRight: 10,
    elevation: 2,
  },
  icon: {
    width: 60,
    height: 30,
  },
});

export default React.memo(CreateAccount);
