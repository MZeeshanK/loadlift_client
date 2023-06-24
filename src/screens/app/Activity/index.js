import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Image,
  TextInput,
} from 'react-native';

import Linear from '../../../components/Linear';
import Header from '../../../components/Header';
import GFlatList from '../../../components/GFlatList';

const Activity = () => {
  const SearchButtons = ({...props}) => (
    <Pressable className="px-3 py-3 mx-[4] rounded-lg border border-primary">
      <Image
        source={
          props.image === 'filter'
            ? require('../../../assets/filter-light.png')
            : require('../../../assets/Search-white.png')
        }
        className="h-4 w-4 "
      />
    </Pressable>
  );

  return (
    <Linear>
      <Header title="Activity" isBack={false} />
      {/* Search */}
      <View
        className="flex-row items-center bg-card z-1 -mt-5 justify-between py-1 mb-3 px-2 rounded-xl"
        style={{elevation: 3}}>
        <TextInput
          className={`flex-1 mx-2 px-3 py-[3] text-black bg-white text-md font-semibold rounded-full`}
          placeholderTextColor={colors.grey}
          placeholder="Search..."
          style={{elevation: 3}}
        />
        <View className="px-2 py-2 flex-row items-center justify-center">
          <SearchButtons />
          <SearchButtons image="filter" />
        </View>
      </View>
      {/* List */}
      <GFlatList activity />
    </Linear>
  );
};

const styles = StyleSheet.create({});

export default React.memo(Activity);
