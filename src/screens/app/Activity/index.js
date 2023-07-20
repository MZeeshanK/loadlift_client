import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  TextInput,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';

import Linear from '../../../components/Linear';
import GFlatList from '../../../components/GFlatList';
import Card from '../../../components/Card';

import colors from '../../../constants/colors';
import {useSelector} from 'react-redux';

import FilterCard from './FilterCard';

const initialState = {
  ongoing: false,
  completed: false,
  cancelled: false,
  under5: false,
  under10: false,
  above10: false,
  under5000: false,
  under10000: false,
  above10000: false,
};

const Activity = () => {
  const colorScheme = useColorScheme();
  const orders = useSelector(state => state.orders.data);

  // state
  const [text, setText] = useState('');
  const [clear, setClear] = useState(false);
  const [filterOptions, setFilterOptions] = useState(false);
  const [filterSettings, setFilterSettings] = useState(initialState);
  const [filteredOrders, setFilteredOrders] = useState(orders);

  // theme
  const primary = colorScheme === 'dark' ? colors.primary : colors.lightPrimary;
  const ongoing = colorScheme === 'dark' ? colors.ongoing : colors.lightOngoing;

  // Clear button in activity screen search
  useEffect(() => {
    text.length > 0 ? setClear(true) : setClear(false);
    setFilteredOrders(
      filteredOrders.filter(order =>
        order.driverName.toLowerCase().includes(text.toLowerCase()),
      ),
    );
  }, [text]);

  // Search button filter
  const SearchButton = ({...props}) => (
    <TouchableOpacity
      onPress={props.onPress}
      className="px-3 py-3 mx-[4] rounded-lg border"
      style={[{borderColor: primary}, props.style]}>
      <Image
        source={
          colorScheme === 'dark' && props.image === 'filter'
            ? require('../../../assets/filter-light.png')
            : colorScheme === 'dark' && props.image === 'search'
            ? require('../../../assets/search-light.png')
            : colorScheme !== 'dark' && props.image === 'filter'
            ? require('../../../assets/filter-dark.png')
            : require('../../../assets/search-dark.png')
        }
        className="h-4 w-4 "
      />
    </TouchableOpacity>
  );

  return (
    <Linear>
      <Card className="flex-row items-center mt-3 justify-between py-1 px-1">
        <View className="flex-row items-center justify-between flex-1 mx-1 my-2 bg-white rounded-full border">
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
          {/* <SearchButton image="search" /> */}
          <SearchButton
            image="filter"
            onPress={() => setFilterOptions(filterOptions => !filterOptions)}
            style={{backgroundColor: filterOptions && ongoing}}
          />
        </View>
      </Card>
      {filterOptions && (
        <FilterCard
          initialState={initialState}
          state={filterSettings}
          setState={setFilterSettings}
          setFilterOptions={setFilterOptions}
        />
      )}
      {/* List */}
      <GFlatList orders={filteredOrders} activity />
    </Linear>
  );
};

export default React.memo(Activity);
