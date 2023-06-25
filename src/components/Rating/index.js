import React from 'react';
import {View, StyleSheet, Image, Pressable} from 'react-native';

const Rating = ({rating, setRating, style}) => {
  const imageSource = level => {
    if (rating <= level + 0.2) {
      return require('../../assets/star-empty.png');
    } else if (rating > level + 0.2 && rating <= level + 0.85) {
      return require('../../assets/star-half.png');
    } else {
      return require('../../assets/star.png');
    }
  };

  const onPress = level => setRating(level + 1);

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
