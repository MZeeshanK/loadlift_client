import React, {useEffect, useState} from 'react';
import {View, Image, TextInput, TouchableOpacity} from 'react-native';

import Linear from '../../../components/Linear';
import GFlatList from '../../../components/GFlatList';
import Card from '../../../components/Card';

import colors from '../../../constants/colors';
import {useSelector} from 'react-redux';

import Title from '../../../components/Title';

const Activity = () => {
  const orders = useSelector(state => state.orders.data);
  const {type} = useSelector(state => state.user);

  // state
  const [text, setText] = useState('');
  const [clear, setClear] = useState(false);
  const [filteredOrders, setFilteredOrders] = useState(orders);

  useEffect(() => {
    if (text) {
      setClear(true);

      const tempOrders = orders.filter(order => {
        const driverName = order?.driver?.firstName + order?.driver?.lastName;
        const userName = order?.user?.firstName + order?.user?.lastName;

        if (type === 'user') {
          return driverName
            .toLocaleLowerCase()
            .includes(text.toLocaleLowerCase());
        }

        if (type === 'driver') {
          return userName
            .toLocaleLowerCase()
            .includes(text.toLocaleLowerCase());
        }
      });

      setFilteredOrders(tempOrders);
    } else {
      setClear(false);
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
      {filteredOrders.length ? (
        <GFlatList orders={filteredOrders} activity />
      ) : text.length ? (
        <View className="flex-1 w-full items-center justify-center">
          <Title bold xl className="tracking-wider">
            No Match Found
          </Title>
        </View>
      ) : (
        <View className="flex-1 w-full items-center justify-center">
          <Title bold xxl className="tracking-wider">
            No Orders Yet
          </Title>
        </View>
      )}
    </Linear>
  );
};

export default React.memo(Activity);
