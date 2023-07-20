import React from 'react';
import {FlatList} from 'react-native';

import OrderItem from '../OrderItem';

const GFlatList = ({orders, ...props}) => {
  return (
    <FlatList
      className={`flex-1 rounded-xl w-full mt-2 ${props.home && 'mt-5'} `}
      data={orders}
      showsVerticalScrollIndicator={false}
      keyExtractor={item => String(item?.id)}
      renderItem={({item, index}) => (
        <OrderItem
          activity={props.activity}
          danger={item?.status === 'danger'}
          ongoing={item?.status === 'ongoing'}
          item={item}
          index={index}
        />
      )}
    />
  );
};

export default React.memo(GFlatList);
