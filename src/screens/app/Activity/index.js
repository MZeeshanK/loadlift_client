import React, {useEffect, useState} from 'react';
import {
  View,
  Pressable,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import Linear from '../../../components/Linear';
import Header from '../../../components/Header';
import GFlatList from '../../../components/GFlatList';
import Card from '../../../components/Card';

const Activity = () => {
  const [text, setText] = useState('');
  const [clear, setClear] = useState(false);

  useEffect(() => {
    text.length > 0 ? setClear(true) : setClear(false);
  }, [text]);

  const SearchButtons = ({...props}) => (
    <Pressable className="px-3 py-3 mx-[4] rounded-lg border border-primary">
      <Image
        source={
          props.image === 'filter'
            ? require('../../../assets/filter-light.png')
            : require('../../../assets/search-light.png')
        }
        className="h-4 w-4 "
      />
    </Pressable>
  );

  return (
    <Linear>
      <Card className="flex-row items-center mt-3 justify-between py-1 px-1">
        <View className="flex-row items-center justify-between flex-1 mx-1 my-2 bg-white rounded-full border border-card">
          <TextInput
            value={text}
            onChangeText={value => setText(value)}
            className="flex-1 px-3 py-1 pt-2 text-black"
            style={{
              fontSize: 14,
              fontFamily: 'Poppins-SemiBold',
              borderWidth: 0,
            }}
            placeholderTextColor={colors.grey}
            placeholder="Search..."
          />
          {clear && (
            <TouchableOpacity onPress={() => setText('')} className="p-3 mr-1">
              <Image
                source={require('../../../assets/clear.png')}
                style={{width: 10, height: 10}}
              />
            </TouchableOpacity>
          )}
        </View>
        <View className="px-2 py-2 flex-row items-center justify-center">
          <SearchButtons />
          <SearchButtons image="filter" />
        </View>
      </Card>
      {/* List */}
      <GFlatList activity />
    </Linear>
  );
};

export default React.memo(Activity);
