import React, {useState} from 'react';
import {View, StyleSheet, Text, Image, Pressable} from 'react-native';
import Linear from '../../../components/Linear';
import Header from '../../../components/Header';
import colors from '../../../constants/colors';
import Card from '../../../components/Card';

const Call = ({navigation}) => {
  const [mic, setMic] = useState(false);
  const [speaker, setSpeaker] = useState(false);

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

        <Card style={{elevation: 2}}>
          <View className="w-full items-center justify-between flex-row px-5">
            <Buttons icon="mic" />
            <Buttons icon="callend" />
            <Buttons icon="speaker" />
          </View>
        </Card>
      </View>
    </Linear>
  );
};

const styles = StyleSheet.create({
  buttons: {
    width: 45,
    height: 45,
  },
});

export default React.memo(Call);
