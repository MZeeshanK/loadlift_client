import React, {useState} from 'react';

import {View, ScrollView, Text, FlatList} from 'react-native';

import Linear from '../../../components/Linear';
import Header from '../../../components/Header';
import TextLabel from '../../../components/TextLabel';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import Card from '../../../components/Card';

import categories from '../../../data/categories';
import colors from '../../../constants/colors';

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

                <TextLabel title="Category of Vehicle" />
                {/* ** TODO FLATLIST OF CATEGORIES  ** */}

                <FlatList
                  horizontal
                  className="px-4 py-2 rounded-md"
                  style={{backgroundColor: 'rgba(25,25,45,.5)'}}
                  showsHorizontalScrollIndicator={false}
                  data={categories}
                  keyExtractor={item => item?.id}
                  renderItem={({item}) => (
                    <Card
                      style={
                        category === item
                          ? {
                              borderWidth: 2,
                              paddingVertical: 12,
                              paddingHorizontal: 8,
                              marginRight: 10,
                              backgroundColor: colors.primary,
                            }
                          : {
                              borderWidth: 2,
                              paddingVertical: 12,
                              paddingHorizontal: 8,
                              marginRight: 10,
                            }
                      }
                      onPress={() => setCategory(item)}>
                      <Text
                        className={`text-lg font-semibold pb-1 ${
                          category === item ? 'text-black' : 'text-white'
                        } `}>
                        {item?.title}
                      </Text>
                      <Text
                        className={`text-base font-bold pb-1 ${
                          category === item ? 'text-black' : 'text-white'
                        } `}>
                        {item?.weight}T
                      </Text>
                    </Card>
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

export default React.memo(CreateAccount);
