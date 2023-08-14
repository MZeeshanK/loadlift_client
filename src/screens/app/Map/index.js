import React, {useEffect, useRef, useState} from 'react';
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
import Linear from '../../../components/Linear';

const {width, height} = Dimensions.get('window');

const classNames = 'py-1 rounded-md mx-2 px-4';

const Map = ({route}) => {
  const {state, location} = route.params;

  const dispatch = useDispatch();
  const colorScheme = useColorScheme();
  const navigation = useNavigation();

  // redux states
  const {home, work} = useSelector(state => state.map);

  // states
  const [expanded, setExpanded] = useState(true);
  const [animate, setAnimate] = useState(false);

  const [center, setCenter] = useState({
    lat: location.lat || home?.lat,
    lng: location.lng || home?.lng,
  });

  const delta = {
    latitudeDelta: 0.07,
    longitudeDelta: 0.07,
  };

  const setLocation = () => {
    switch (state) {
      case 'home':
        dispatch(setHome(center));
        break;
      case 'work':
        dispatch(setWork(center));
        break;
      case 'origin':
        dispatch(setOrigin({lat: center.lat, lng: center.lng}));
        break;
      case 'destination':
        dispatch(setDestination(center));
        break;
      default:
        break;
    }

    navigation.goBack();
  };

  const mapViewRef = useRef(null);

  useEffect(() => {
    if (animate) {
      mapViewRef.current.animateToRegion({
        latitude: center?.lat,
        longitude: center?.lng,
        latitudeDelta: delta.latitudeDelta,
        longitudeDelta: delta.longitudeDelta,
      });

      setAnimate(false);
    }
  }, [animate]);

  return (
    <Linear className="p-0">
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
          <InputButton left title={`${center.lat}  ,  ${center.lng}`} />
        )}
      </View>
      {expanded && (
        <View className="flex-row w-full justify-evenly my-2 mb-6">
          <Button
            onPress={() => {
              setCenter(home);
              setAnimate(true);
            }}
            source={
              colorScheme === 'dark'
                ? require('../../../assets/home-focused.png')
                : require('../../../assets/home-light.png')
            }
            title="Home"
            alt
            className={classNames}
          />
          <Button
            onPress={() => {
              setCenter(work);
              setAnimate(true);
            }}
            source={
              colorScheme === 'dark'
                ? require('../../../assets/activity-focused.png')
                : require('../../../assets/activity-light.png')
            }
            title="Work"
            alt
            className={classNames}
          />
          <Button
            source={
              colorScheme === 'dark'
                ? require('../../../assets/current.png')
                : require('../../../assets/current-light.png')
            }
            title="Current"
            alt
            className={classNames}
          />
        </View>
      )}
      {/* MAP */}
      <MapView
        onRegionChange={() => {
          setExpanded(false);
        }}
        ref={mapViewRef}
        onRegionChangeComplete={region => {
          setExpanded(true);
          setCenter({
            lat: region.latitude,
            lng: region.longitude,
          });
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
        initialRegion={{
          latitude: center.lat,
          longitude: center.lng,
          latitudeDelta: delta.latitudeDelta,
          longitudeDelta: delta.longitudeDelta,
        }}></MapView>

      <Image
        source={require('../../../assets/marker.png')}
        className="w-[30] h-[45] absolute top-1/2 left-1/2 z-10"
        style={{transform: [{translateX: -15}, {translateY: -22.5}]}}
      />
      {expanded && (
        <View className="absolute flex-row bottom-10 w-full items-center justify-center space-x-6">
          {(state === 'origin' || state === 'destination') && (
            <Button
              alt
              mini
              title="Set as Home"
              onPress={() => dispatch(setHome(center))}
            />
          )}
          <Button title="Select" onPress={setLocation} />
          {(state === 'origin' || state === 'destination') && (
            <Button
              alt
              mini
              title="Set as Work"
              onPress={() => dispatch(setWork(center))}
            />
          )}
        </View>
      )}
    </Linear>
  );
};

export default React.memo(Map);
