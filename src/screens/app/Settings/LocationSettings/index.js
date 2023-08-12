import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  useColorScheme,
  ScrollView,
  Pressable,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import Linear from '../../../../components/Linear';
import Header from '../../../../components/Header';
import Card from '../../../../components/Card';
import Title from '../../../../components/Title';
import InputButton from '../../../../components/InputButton';
import {useSelector} from 'react-redux';

const LocationSettings = () => {
  const colorScheme = useColorScheme();
  const navigation = useNavigation();

  const {home, work} = useSelector(state => state.map);

  const LocationCard = ({location, state}) => {
    return (
      <Card>
        <Title lg bold className="pl-2 capitalize">
          {state}:{' '}
        </Title>
        <InputButton
          onPress={() => navigation.navigate('Map', {state})}
          title={`${location?.lat}, ${location?.lng}`}
        />
      </Card>
    );
  };

  return (
    <Linear>
      <Header title="Location Settings" />

      <ScrollView className="px-2">
        <LocationCard location={home} state="home" />
        <LocationCard location={work} state="work" />
      </ScrollView>
    </Linear>
  );
};

const styles = StyleSheet.create({
  editIcon: {
    width: 22,
    height: 22,
  },
});

export default React.memo(LocationSettings);
