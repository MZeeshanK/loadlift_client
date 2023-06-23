import React from 'react';
import {Dimensions, StyleSheet, FlatList} from 'react-native';
import orders from '../../../data/orders';
import OrderItem from '../../OrderItem';

const {width, height} = Dimensions.get('window');

const GFlatList = ({...props}) => {
  return (
    <FlatList
      className={`flex-1 rounded-xl w-full mt-2 ${props.home && 'mt-32'}`}
      data={props.home ? orders.slice(0, 5) : orders}
      inverted={props.inverted || false}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item, index) => String(item?.id)}
      renderItem={({item, index}) => (
        <OrderItem
          home={props.home}
          danger={item?.status === 'danger'}
          ongoing={item?.status === 'ongoing'}
          success={item?.status === 'success'}
          item={item}
          index={index}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({});

export default React.memo(GFlatList);
