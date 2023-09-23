import React, { useEffect, useRef, useState } from 'react';
import { Image, View, useColorScheme } from 'react-native';

import Header from '../../../components/Header';
import Button from '../../../components/Button';

import MapView, { Marker } from 'react-native-maps';
import mapStyle from '../../../data/mapStyle';

import { useNavigation } from '@react-navigation/native';
import colors from '../../../constants/colors';

import { useDispatch, useSelector } from 'react-redux';
import {
  setDestination,
  setHome,
  setOrigin,
  setWork,
} from '../../../store/map';
import Linear from '../../../components/Linear';
import CustomModal from '../../../components/CustomModal';
import Input from '../../../components/Input';
import TextLabel from '../../../components/TextLabel';
import Geolocation from '@react-native-community/geolocation';

import MapViewDirections from 'react-native-maps-directions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const classNames = 'py-1 z-10 rounded-md mx-2 px-4';

const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API;

const Map = ({ route }) => {
  const { state, location } = route.params;

  const dispatch = useDispatch();
  const colorScheme = useColorScheme();
  const navigation = useNavigation();

  const primary = colorScheme === 'dark' ? colors.primary : colors.lightPrimary;

  // redux states
  const { home, work, origin, destination } = useSelector(state => state.map);

  // states
  const [expanded, setExpanded] = useState(true);
  const [animate, setAnimate] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalState, setModalState] = useState('default');
  const [isLocationMount, setIsLocationMount] = useState(false);

  const [center, setCenter] = useState(
    location
      ? {
          lat: location?.lat,
          lng: location?.lng,
        }
      : {
          lat: home?.lat,
          lng: home?.lng,
        },
  );

  const delta = {
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
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

  // geolocation
  useEffect(() => {
    if (isLocationMount) {
      Geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;

          setCenter({
            lat: latitude,
            lng: longitude,
          });
        },
        error => {
          console.warn(error.message);
        },
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
      );

      setIsLocationMount(false);
    }
  }, [isLocationMount]);

  // Google directions api for calculating distance and time between origin and destination

  const AddressModal = ({ modalState }) => {
    const pinCodeRef = React.useRef();

    const [address, setAddress] = useState(
      modalState === 'home'
        ? home?.address
        : modalState === 'work'
        ? work?.address
        : state === 'home'
        ? home?.address
        : destination?.address || '',
    );
    const [pinCode, setPinCode] = useState(
      modalState === 'home'
        ? home?.pinCode
        : modalState === 'work'
        ? work?.pinCode
        : state === 'home'
        ? home?.pinCode
        : destination?.pinCode || '',
    );

    // set address for all the location states
    const result = () => {
      switch (modalState) {
        case 'home':
          dispatch(
            setHome({
              lat: center?.lat,
              lng: center?.lng,
              address: address,
              pinCode: pinCode,
            }),
          );
          break;
        case 'work':
          dispatch(
            setWork({
              lat: center?.lat,
              lng: center?.lng,
              address: address,
              pinCode: pinCode,
            }),
          );
          break;
        case 'default':
          if (state === 'origin') {
            dispatch(
              setOrigin({
                lat: center?.lat,
                lng: center?.lng,
                address: address,
                pinCode: pinCode,
              }),
            );
          } else {
            dispatch(
              setDestination({
                lat: center?.lat,
                lng: center?.lng,
                address: address,
                pinCode: pinCode,
              }),
            );
          }
          break;
      }

      if (state === 'origin') {
        navigation.navigate('Map', {
          state: 'destination',
          location: destination,
        });
      }

      setModalVisible(false);
    };

    return (
      <CustomModal
        className="pb-44"
        block
        visible={modalVisible}
        setVisible={setModalVisible}>
        <TextLabel title="Address" />
        <Input
          placeholder="Enter Physical address here"
          value={address}
          onChangeText={setAddress}
          returnKeyType="next"
          onSubmitEditing={() => pinCodeRef.current.focus()}
          blurOnSubmit={false}
        />

        <TextLabel title="Pincode" />
        <Input
          placeholder="Enter Pincode"
          ref={pinCodeRef}
          value={pinCode}
          onChangeText={setPinCode}
          keyboardType="numeric"
        />

        <Button title="Done" className="mt-4" onPress={result} />
      </CustomModal>
    );
  };

  return (
    <Linear className="p-0">
      <AddressModal modalState={modalState} />

      <View
        className="px-4 w-full items-center justify-center rounded-b-xl"
        style={{
          backgroundColor:
            colorScheme === 'dark' ? colors.card : colors.lightCard,
          elevation: 10,
        }}>
        <Header
          title={
            state === 'origin'
              ? 'Pick Up'
              : state === 'destination'
              ? 'Destination'
              : 'Map'
          }
          className="mb-0 py-2"
          expand
          isInverted={expanded}
          onPress={() => setExpanded(expanded => !expanded)}
        />
        {expanded && (
          <View className="flex-row z-10 w-full justify-evenly my-2">
            <Button
              onPress={() => {
                setAnimate(true);
                setCenter({
                  lat: home?.lat,
                  lng: home?.lng,
                });
              }}
              source={
                colorScheme === 'dark'
                  ? require('../../../assets/home-focused.png')
                  : require('../../../assets/home-light.png')
              }
              card
              title="Home"
              className={classNames}
            />
            <Button
              onPress={() => {
                setAnimate(true);
                setCenter({
                  lat: work?.lat,
                  lng: work?.lng,
                });
              }}
              source={
                colorScheme === 'dark'
                  ? require('../../../assets/activity-focused.png')
                  : require('../../../assets/activity-light.png')
              }
              card
              title="Work"
              className={classNames}
            />
            <Button
              source={
                colorScheme === 'dark'
                  ? require('../../../assets/current.png')
                  : require('../../../assets/current-light.png')
              }
              title="Current"
              onPress={() => {
                setIsLocationMount(true);
                setAnimate(true);
              }}
              card
              className={classNames}
            />
          </View>
        )}
      </View>

      {/* MAP */}

      {expanded && (
        <GooglePlacesAutocomplete
          placeholder="Search... "
          textInputProps={{
            InputComp: Input,
            errorStyle: { color: 'red' },
          }}
          returnKeyType="search"
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            console.log(details);
          }}
          query={{
            key: API_KEY,
            language: 'en',
            types: 'geocode',
            components: 'country:in',
          }}
          styles={{
            container: {
              marginTop: 10,
            },
          }}
        />
      )}

      <MapView
        showsCompass
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
        }}>
        <MapViewDirections
          origin={{ latitude: origin?.lat, longitude: origin?.lng }}
          destination={{
            latitude: destination?.lat,
            longitude: destination?.lng,
          }}
          apikey={process.env.REACT_APP_GOOGLE_MAPS_API}
          strokeWidth={4}
          timePrecision="now"
          strokeColor={primary}
        />
        <Marker
          coordinate={{
            latitude: origin?.lat,
            longitude: origin?.lng,
          }}
          title="Pick Up"
          description={`${origin?.address} \n ${origin?.pinCode}`}
          image={require('../../../assets/Pickup-marker.png')}
        />

        <Marker
          coordinate={{
            latitude: destination?.lat,
            longitude: destination?.lng,
          }}
          title="Destination"
          description={`${destination?.address} \n ${destination?.pinCode}`}
          image={require('../../../assets/Destination-marker.png')}
        />

        <Marker
          coordinate={{
            latitude: home?.lat,
            longitude: home?.lng,
          }}
          title="Home"
          description={`${home?.address} \n ${home?.pinCode}`}
          image={require('../../../assets/Home-marker.png')}
        />

        <Marker
          coordinate={{
            latitude: work?.lat,
            longitude: work?.lng,
          }}
          title="Work"
          description={`${work?.address} \n ${work?.pinCode}`}
          image={require('../../../assets/Work-marker.png')}
        />
      </MapView>

      <Image
        source={require('../../../assets/marker.png')}
        className="w-[30] h-[45] absolute top-1/2 left-1/2 z-10"
        style={{ transform: [{ translateX: -15 }, { translateY: -22.5 }] }}
      />
      {expanded && (
        <View className="absolute flex-row bottom-10 w-full items-center justify-center space-x-6">
          <Button
            alt
            mini
            title="Set as Home"
            onPress={() => {
              setModalState('home');
              setModalVisible(true);
            }}
          />
          <Button
            title="Mark"
            onPress={() => {
              setModalState('default');
              setModalVisible(true);
            }}
          />
          <Button
            alt
            mini
            title="Set as Work"
            onPress={() => {
              setModalState('work');
              setModalVisible(true);
            }}
          />
        </View>
      )}
    </Linear>
  );
};

export default React.memo(Map);
