import React, {useState} from 'react';
import {View, StyleSheet, Image, Pressable, useColorScheme} from 'react-native';
import Button from '../Button';
import {reviewOrder} from '../../store/orders';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

const Rating = ({rating, setRating, style, ...props}) => {
  const colorScheme = useColorScheme();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {token: userToken} = useSelector(state => state.user);
  const [isFinal, setIsFinal] = useState(false);

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

  const onPress = setRating
    ? level => {
        setRating(level + 1);
        setIsFinal(true);
      }
    : () => null;

  return (
    <View className="items-center justify-center">
      <View className="flex-row items-center justify-center">
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
      </View>

      {setRating && rating > 0 && isFinal && (
        <Button
          title="Rate Driver"
          onPress={() =>
            dispatch(
              reviewOrder({
                rating,
                driverId: props.driverId,
                orderId: props.orderId,
                userToken,
                navigation,
              }),
            )
          }
        />
      )}
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
