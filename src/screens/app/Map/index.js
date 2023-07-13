import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  View,
  useColorScheme,
} from 'react-native';

import Header from '../../../components/Header';
import InputButton from '../../../components/InputButton';

import MapView from 'react-native-maps';
import Button from '../../../components/Button';

import mapStyle from '../../../data/mapStyle';

import {useNavigation} from '@react-navigation/native';
import colors from '../../../constants/colors';

const {width, height} = Dimensions.get('window');

const classNames = 'py-1 rounded-md mx-1 px-3';

const Map = () => {
  const colorScheme = useColorScheme();
  const navigation = useNavigation();

  const [expanded, setExpanded] = useState(true);
  const [center, setCenter] = useState({
    latitude: 34.108756,
    longitude: 74.808197,
    latitudeDelta: 0.0022,
    longitudeDelta: 0.0021,
  });

  return (
    <SafeAreaView style={{height: height, width: width}}>
      <View
        className="px-4 w-full items-center justify-center rounded-b-xl"
        style={{
          backgroundColor:
            colorScheme === 'dark' ? colors.background : colors.lightBackground,
          elevation: 10,
        }}>
        <Header
          title="Map"
          className="mb-0 py-4"
          expand
          isInverted={expanded}
          onPress={() => setExpanded(expanded => !expanded)}
        />
        {expanded && (
          <>
            <InputButton
              left
              title={`${center.latitude}  ,  ${center.longitude}`}
            />
            <View className="flex-row w-full justify-between my-2 mb-6">
              <Button
                source={
                  colorScheme === 'dark'
                    ? require('../../../assets/home-focused.png')
                    : require('../../../assets/home-light.png')
                }
                title="Home"
                card
                className={classNames}
              />
              <Button
                source={
                  colorScheme === 'dark'
                    ? require('../../../assets/activity-focused.png')
                    : require('../../../assets/activity-light.png')
                }
                title="Previous"
                card
                className={classNames}
              />
              <Button
                source={
                  colorScheme === 'dark'
                    ? require('../../../assets/current.png')
                    : require('../../../assets/current-light.png')
                }
                title="Current"
                card
                className={classNames}
              />
            </View>
          </>
        )}
      </View>
      <MapView
        onRegionChange={region => {
          setExpanded(false);
          setCenter(region);
        }}
        customMapStyle={colorScheme === 'dark' && mapStyle}
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          zIndex: -1,
          left: 0,
          right: 0,
          bottom: 0,
        }}
        initialRegion={center}>
        {/* <Marker
            coordinate={{
              latitude: center.latitude,
              longitude: center.longitude,
            }}
            pinColor={colors.primary}
          /> */}
      </MapView>
      <Image
        source={require('../../../assets/marker.png')}
        className="w-[30] h-[45] absolute top-1/2 left-1/2 z-10"
        style={{transform: [{translateX: -15}, {translateY: -22.5}]}}
      />
      <View className="absolute bottom-10 w-full items-center justify-center ">
        <Button title="Select" onPress={() => navigation.navigate('Tabs')} />
      </View>
    </SafeAreaView>
  );
};

export default React.memo(Map);
