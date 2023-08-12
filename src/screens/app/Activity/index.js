import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  Pressable,
} from 'react-native';

import Linear from '../../../components/Linear';
import GFlatList from '../../../components/GFlatList';
import Card from '../../../components/Card';

import colors from '../../../constants/colors';
import {useDispatch, useSelector} from 'react-redux';

import FilterCard from './FilterCard';
import axios from 'axios';
import {setError} from '../../../store/misc';
import {getAllOrders} from '../../../store/orders';
import Title from '../../../components/Title';

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

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const Activity = () => {
  const dispatch = useDispatch();
  const colorScheme = useColorScheme();
  const {token: userToken} = useSelector(state => state.user);

  const orders = useSelector(state => state.orders.data);

  // state
  const [text, setText] = useState('');
  const [clear, setClear] = useState(false);
  const [filteredOrders, setFilteredOrders] = useState(orders);

  // theme
  const primary = colorScheme === 'dark' ? colors.primary : colors.lightPrimary;
  const ongoing = colorScheme === 'dark' ? colors.ongoing : colors.lightOngoing;

  useEffect(() => {
    if (text) {
      setClear(true);

      setFilteredOrders(
        orders.filter(
          order =>
            order?.driver?.firstName
              .toLocaleLowerCase()
              .includes(text.toLocaleLowerCase()) ||
            order?.driver?.lastName
              .toLocaleLowerCase()
              .includes(text.toLocaleLowerCase()),
        ),
      );
    }
  }, [text]);

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
            returnKeyType="search"
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

        {/* Filter Button */}
      </Card>

      {/* List */}
      <GFlatList orders={filteredOrders} activity />
    </Linear>
  );
};

export default React.memo(Activity);
