import React from 'react';
import {FlatList} from 'react-native';

import OrderItem from '../OrderItem';

const GFlatList = ({orders, ...props}) => {
  return (
    <FlatList
      className={`flex-1 w-full mt-2 ${props.home && 'mt-5'} `}
      data={orders}
      showsVerticalScrollIndicator={false}
      keyExtractor={item => String(item?._id)}
      renderItem={({item, index}) => (
        <OrderItem
          activity={props.activity}
          danger={item?.status === 'cancelled'}
          ongoing={item?.status !== 'completed' && item?.status !== 'cancelled'}
          item={item}
          index={index}
        />
      )}
    />
  );
};

export default React.memo(GFlatList);
