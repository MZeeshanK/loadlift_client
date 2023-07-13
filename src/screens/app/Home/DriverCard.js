import React from 'react';
import {Pressable, View, useColorScheme} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import Title from '../../../components/Title';
import Rating from '../../../components/Rating';
import Button from '../../../components/Button';

const DriverCard = ({
  deliveryModalVisible,
  setDeliveryModalVisible,
  isDelivering,
  setIsActive,
  setIsDelivering,
}) => {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();

  const primary = colorScheme === 'dark' ? colors.primary : colors.lightPrimary;

  return (
    <Pressable className="w-full">
      <View
        className="w-full items-start justify-center border-b pb-3"
        style={{borderColor: primary}}>
        <View className="w-full justify-center">
          <View className="w-full flex-row items-center justify-between">
            <Title bold primary left>
              Name: <Title>John Doe</Title>
            </Title>
            {isDelivering && (
              <Title right bold primary>
                Status: <Title>User Waiting</Title>
              </Title>
            )}
          </View>
          <View className="w-full flex-row items-center justify-between mb-1">
            <Rating
              className="mt-0"
              rating={4.5}
              style={{width: 13, height: 13}}
            />
            <Title bold primary left>
              Distance: <Title>11.8 km</Title>
            </Title>
          </View>
        </View>
      </View>
      <View
        className="w-full py-2 mb-5 border-b"
        style={{borderColor: primary}}>
        <Title className="mb-3" bold primary left numberOfLines={2}>
          Pick Up: <Title light>121, Hawaal, Srinagar, Jammu and Kashmir</Title>
        </Title>

        <Title className="mb-3" primary bold left numberOfLines={2}>
          Destination:{' '}
          <Title light>203, Rainawari, Srinagar, Jammu and Kashmir</Title>
        </Title>
      </View>

      {deliveryModalVisible && (
        <View className="w-full mb-5">
          <Button
            title="Details"
            onPress={() => navigation.navigate('Order')}
            card
          />
        </View>
      )}

      <View className="w-full flex-row items-center justify-between">
        {isDelivering ? (
          <>
            <Button
              onPress={() => {
                navigation.navigate('Order');
              }}
              card
              title="Details"
              half
            />
            <Button
              onPress={() => navigation.navigate('Map')}
              title="Map"
              half
            />
          </>
        ) : (
          <>
            <Button
              title="Cancel"
              onPress={() => setDeliveryModalVisible(false)}
              className="w-[48%]"
              danger
            />
            <Button
              onPress={() => {
                setIsDelivering(true);
                setIsActive(false);
                setDeliveryModalVisible(false);
              }}
              title="Accept"
              className="w-[48%]"
            />
          </>
        )}
      </View>
    </Pressable>
  );
};

export default DriverCard;
