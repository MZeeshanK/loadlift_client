import React, {useState, useRef, useEffect} from 'react';
import {View, StyleSheet, Text, Image, Pressable, Animated} from 'react-native';

import Linear from '../../../components/Linear';
import Header from '../../../components/Header';
import colors from '../../../constants/colors';
import Card from '../../../components/Card';

import {useNavigation} from '@react-navigation/native';

const Call = () => {
  const navigation = useNavigation();

  const animationDuration = 1000;

  const [mic, setMic] = useState(false);
  const [speaker, setSpeaker] = useState(false);
  const [incoming, setIncoming] = useState(true);

  const [animationOptions, setAnimationOptions] = useState(false);

  const animation = useRef(new Animated.Value(0)).current;

  const startAnimation = () => {
    Animated.timing(animation, {
      toValue: animationOptions ? 0 : 1,
      duration: animationDuration,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    setTimeout(() => {
      setAnimationOptions(animationOptions => !animationOptions);
    }, animationDuration);

    startAnimation();
  }, [animationOptions]);

  const Buttons = ({icon}) => {
    const imageSource =
      icon === 'mic'
        ? require('../../../assets/mic.png')
        : icon === 'callend'
        ? require('../../../assets/callend.png')
        : require('../../../assets/speaker.png');

    const backgroundStyles =
      icon === 'mic' && mic
        ? colors.primary
        : icon === 'mic' && !mic
        ? colors.ongoing
        : icon === 'speaker' && speaker
        ? colors.primary
        : icon === 'speaker' && !speaker
        ? colors.ongoing
        : null;

    const onPress = () => {
      icon === 'mic'
        ? setMic(!mic)
        : icon === 'speaker'
        ? setSpeaker(!speaker)
        : navigation.goBack();
    };

    return (
      <Pressable
        onPress={onPress}
        className="aspect-square rounded-full p-2 items-center justify-center"
        style={[
          styles.buttons,
          {
            backgroundColor: backgroundStyles,
            elevation: 1,
          },
        ]}>
        <Image
          source={imageSource}
          style={
            icon === 'callend' ? styles.buttons : {width: '90%', height: '90%'}
          }
        />
      </Pressable>
    );
  };

  const IncomingOptions = () => {
    return (
      <View className="w-full items-center justify-center space-y-4">
        <Animated.Image
          source={require('../../../assets/calling-green.png')}
          style={[
            styles.arrows,
            {
              opacity: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [0.3, 0.6],
              }),
            },
          ]}
        />
        <Animated.Image
          source={require('../../../assets/call.png')}
          style={[
            styles.button2,
            {
              transform: [
                {
                  translateY: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -10],
                  }),
                },
              ],
            },
          ]}
        />
        <Animated.Image
          source={require('../../../assets/calling-red.png')}
          style={[
            styles.arrows,
            {
              opacity: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [0.6, 0.3],
              }),
            },
          ]}
        />
      </View>
    );
  };

  return (
    <Linear>
      <Header />
      <View className="flex-1 items-center justify-between pb-10 px-4 w-full">
        <View className="w-full items-center justify-center">
          <Image
            source={require('../../../assets/account-focused.png')}
            className="w-20 h-20"
          />
          <Text className="text-white text-lg font-semibold mt-2">
            Ghulam Nabi
          </Text>
          <Text className="text-white text-sm mt-4">Calling</Text>
        </View>

        {incoming ? (
          <IncomingOptions />
        ) : (
          <Card style={{elevation: 2}}>
            <View className="w-full items-center justify-between flex-row px-5">
              <Buttons icon="mic" />
              <Buttons icon="callend" />
              <Buttons icon="speaker" />
            </View>
          </Card>
        )}
      </View>
    </Linear>
  );
};

const styles = StyleSheet.create({
  buttons: {
    width: 45,
    height: 45,
  },
  button2: {
    width: 60,
    height: 60,
    opacity: 0.6,
    alignSelf: 'center',
  },
  arrows: {
    width: 33,
    height: 60,
    marginVertical: 20,
  },
});

export default React.memo(Call);
