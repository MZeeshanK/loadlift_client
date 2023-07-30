import React, {useState} from 'react';
import {View, ScrollView, Pressable, useColorScheme} from 'react-native';
import Card from '../../../components/Card';
import Button from '../../../components/Button';
import Title from '../../../components/Title';

const FilterCard = ({state, setState, initialState}) => {
  const colorScheme = useColorScheme();

  const [prev, setPrev] = useState('');

  const primary = colorScheme === 'dark' ? colors.primary : colors.lightPrimary;
  const ongoing = colorScheme === 'dark' ? colors.ongoing : colors.lightOngoing;
  const dark = colorScheme === 'dark' ? colors.black : colors.white;
  const light = colorScheme === 'dark' ? colors.white : colors.black;

  const classNames = 'px-5 rounded-full mr-5';

  const onPress = type => {
    initialState[prev] = false;
    initialState[type] = initialState[type] ? false : true;

    setState(initialState);
    setPrev(type);
  };

  const features1 = ['ongoing', 'completed', 'cancelled'];
  const features2 = ['under5', 'under10', 'above10'];
  const features3 = ['under5000', 'under10000', 'above10000'];

  const FilterFeatures = ({type}) => {
    return (
      <Pressable onPress={() => onPress(type)}>
        <Title
          base
          className={classNames}
          style={{
            backgroundColor: state[type] ? primary : ongoing,
            color: state[type] ? dark : light,
          }}>
          {type}
        </Title>
      </Pressable>
    );
  };

  const removeFilter = () => {
    setState(initialState);
  };

  return (
    <Card className="py-4 items-end">
      <Button mini title="Remove Filter" onPress={removeFilter} />

      <Title className="w-full" left>
        Status
      </Title>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="pb-4 my-3">
        {features1.map(feature => (
          <FilterFeatures type={feature} key={feature} />
        ))}
      </ScrollView>

      <View className="w-full h-[0.5]" style={{backgroundColor: primary}} />
      <Title className="w-full" left>
        Distance
      </Title>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="pb-4 my-3">
        {features2.map(feature => (
          <FilterFeatures type={feature} key={feature} />
        ))}
      </ScrollView>

      <View className="w-full h-[0.5]" style={{backgroundColor: primary}} />
      <Title className="w-full" left>
        Price
      </Title>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="pb-4 my-3">
        {features3.map(feature => (
          <FilterFeatures type={feature} key={feature} />
        ))}
      </ScrollView>
    </Card>
  );
};

export default React.memo(FilterCard);
