import React from 'react';
import {StyleSheet, FlatList} from 'react-native';
import orders from '../../data/orders';
import OrderItem from '../OrderItem';

const GFlatList = ({...props}) => {
  const homeOrders = orders
    .filter(order => order?.status === 'ongoing')
    .slice(0, 3);

  return (
    <FlatList
      className={`flex-1 rounded-xl w-full mt-2 ${props.home && 'mt-32'}`}
      data={props.home ? homeOrders : orders}
      showsVerticalScrollIndicator={false}
      keyExtractor={item => String(item?.id)}
      renderItem={({item, index}) => (
        <OrderItem
          activity={props.activity}
          home={props.home}
          danger={item?.status === 'danger'}
          ongoing={item?.status === 'ongoing'}
          item={item}
          index={index}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({});
export default React.memo(GFlatList);
