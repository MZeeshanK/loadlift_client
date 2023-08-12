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
import Button from '../../../components/Button';

import MapView from 'react-native-maps';
import mapStyle from '../../../data/mapStyle';

import {useNavigation} from '@react-navigation/native';
import colors from '../../../constants/colors';

import {useDispatch, useSelector} from 'react-redux';
import {setDestination, setHome, setOrigin, setWork} from '../../../store/map';

const {width, height} = Dimensions.get('window');

const classNames = 'py-1 rounded-md mx-2 px-4';

const Map = ({route}) => {
  const {state} = route.params;

  const dispatch = useDispatch();

  const {home, work} = useSelector(state => state.map);

  const colorScheme = useColorScheme();
  const navigation = useNavigation();

  // let location

  // switch (state) {
  //   case 'origin':
  //     location = {
  //       lat: origin.lat,
  //       lng: origin.lng,
  //     }
  //     break;
  //   case 'destination':
  //     break;
  //   case 'home':
  //     dispatch(setHome(center));
  //     break;
  //   case 'work':
  //     dispatch(setWork(center));
  //     break;
  // }

  const [expanded, setExpanded] = useState(true);
  const [center, setCenter] = useState({
    latitude: 34.025686,
    longitude: 74.802065,
  });

  const delta = {
    latitudeDelta: 0.022,
    longitudeDelta: 0.021,
  };

  const setLocation = () => {
    switch (state) {
      case 'origin':
        dispatch(setOrigin(center));
        break;
      case 'destination':
        dispatch(setDestination(center));
        break;
      case 'home':
        dispatch(setHome(center));
        break;
      case 'work':
        dispatch(setWork(center));
        break;
    }
  };

  return (
    <SafeAreaView style={{height: height, width: width}}>
      <View
        className="px-4 w-full items-center justify-center rounded-b-xl"
        style={{
          backgroundColor:
            colorScheme === 'dark' ? colors.card : colors.lightCard,
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
            <View className="flex-row w-full justify-evenly my-2 mb-6">
              <Button
                onPress={() => setCenter(home)}
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
                title="Work"
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
        {/* <Input placeholder="Search..." /> */}
      </View>
      <MapView
        onRegionChange={region => {
          setExpanded(false);
          setCenter(region);
        }}
        onRegionChangeComplete={() => setExpanded(true)}
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
        initialRegion={{
          latitude: center.latitude,
          longitude: center.longitude,
          latitudeDelta: delta.latitudeDelta,
          longitudeDelta: delta.longitudeDelta,
        }}>
        {/* <Marker
            coordinate={{
              latitude: center.latitude,
              longitude: center.longitude,
            }}
            pinColor={colors.primary}
          /> */}
      </MapView>

      {/* <MapView initialRegion={center}>
        <MapViewDirections
          origin={origin}
          destination={destination}
          apikey={GOOGLE_API_KEY}
        />
      </MapView> */}

      <Image
        source={require('../../../assets/marker.png')}
        className="w-[30] h-[45] absolute top-1/2 left-1/2 z-10"
        style={{transform: [{translateX: -15}, {translateY: -22.5}]}}
      />
      <View className="absolute bottom-10 w-full items-center justify-center ">
        <Button title="Select" onPress={setLocation} />
      </View>
    </SafeAreaView>
  );
};

export default React.memo(Map);
