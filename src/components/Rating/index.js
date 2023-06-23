import React from 'react';
import {View, StyleSheet, Image, Pressable} from 'react-native';

const Rating = ({rating, style}) => {
  return (
    <View className="flex-row items-center justify-center">
      <Pressable>
        <Image
          style={[styles.icon, style]}
          source={
            rating >= 0 && rating <= 0.2
              ? require('../../assets/star-empty.png')
              : rating <= 0.85
              ? require('../../assets/star-half.png')
              : require('../../assets/star.png')
          }
        />
      </Pressable>
      <Pressable>
        <Image
          style={[styles.icon, style]}
          source={
            rating >= 1 && rating <= 1.2
              ? require('../../assets/star-empty.png')
              : rating <= 1.85
              ? require('../../assets/star-half.png')
              : require('../../assets/star.png')
          }
        />
      </Pressable>
      <Pressable>
        <Image
          style={[styles.icon, style]}
          source={
            rating >= 2 && rating <= 2.2
              ? require('../../assets/star-empty.png')
              : rating <= 2.85
              ? require('../../assets/star-half.png')
              : require('../../assets/star.png')
          }
        />
      </Pressable>
      <Pressable>
        <Image
          style={[styles.icon, style]}
          source={
            rating >= 3 && rating <= 3.2
              ? require('../../assets/star-empty.png')
              : rating <= 3.85
              ? require('../../assets/star-half.png')
              : require('../../assets/star.png')
          }
        />
      </Pressable>
      <Pressable>
        <Image
          style={[styles.icon, style]}
          source={
            rating >= 4 && rating <= 4.2
              ? require('../../assets/star-empty.png')
              : rating <= 4.85
              ? require('../../assets/star-half.png')
              : require('../../assets/star.png')
          }
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 22,
    height: 22,
  },
});

export default React.memo(Rating);
