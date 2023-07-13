import React from 'react';
import {View, StyleSheet, Image, Pressable, useColorScheme} from 'react-native';

const Rating = ({rating, setRating, style}) => {
  const colorScheme = useColorScheme();

  const imageSource = level => {
    if (rating <= level + 0.2) {
      if (colorScheme === 'dark') {
        return require('../../assets/star-empty.png');
      } else {
        return require('../../assets/star-empty-light.png');
      }
    } else if (rating > level + 0.2 && rating <= level + 0.85) {
      if (colorScheme === 'dark') {
        return require('../../assets/star-half.png');
      } else {
        return require('../../assets/star-half-light.png');
      }
    } else {
      if (colorScheme === 'dark') {
        return require('../../assets/star.png');
      } else {
        return require('../../assets/star-light-primary.png');
      }
    }
  };

  const onPress = setRating ? level => setRating(level + 1) : () => null;

  return (
    <View className="flex-row items-center justify-center">
      <Pressable onPress={() => onPress(0)}>
        <Image style={[styles.icon, style]} source={imageSource(0)} />
      </Pressable>
      <Pressable onPress={() => onPress(1)}>
        <Image style={[styles.icon, style]} source={imageSource(1)} />
      </Pressable>
      <Pressable onPress={() => onPress(2)}>
        <Image style={[styles.icon, style]} source={imageSource(2)} />
      </Pressable>
      <Pressable onPress={() => onPress(3)}>
        <Image style={[styles.icon, style]} source={imageSource(3)} />
      </Pressable>
      <Pressable onPress={() => onPress(4)}>
        <Image style={[styles.icon, style]} source={imageSource(4)} />
      </Pressable>
    </View>
  );
};

Rating.defaultProps = {
  rating: 0,
};

const styles = StyleSheet.create({
  icon: {
    height: 22,
    aspectRatio: 1,
  },
});

export default React.memo(Rating);
