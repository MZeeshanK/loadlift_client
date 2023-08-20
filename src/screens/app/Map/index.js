import React, {useEffect, useRef, useState} from 'react';
import {Image, View, useColorScheme} from 'react-native';

import Header from '../../../components/Header';
import InputButton from '../../../components/InputButton';
import Button from '../../../components/Button';

import MapView, {Marker} from 'react-native-maps';
import mapStyle from '../../../data/mapStyle';

import {useNavigation} from '@react-navigation/native';
import colors from '../../../constants/colors';

import {useDispatch, useSelector} from 'react-redux';
import {setDestination, setHome, setOrigin, setWork} from '../../../store/map';
import Linear from '../../../components/Linear';
import CustomModal from '../../../components/CustomModal';
import Input from '../../../components/Input';
import TextLabel from '../../../components/TextLabel';

const classNames = 'py-1 rounded-md mx-2 px-4';

const Map = ({route}) => {
  const {state, location} = route.params;

  const dispatch = useDispatch();
  const colorScheme = useColorScheme();
  const navigation = useNavigation();

  // redux states
  const {home, work, destination} = useSelector(state => state.map);

  // states
  const [expanded, setExpanded] = useState(true);
  const [animate, setAnimate] = useState(false);

  const [center, setCenter] = useState({
    lat: location?.lat || home?.lat,
    lng: location?.lng || home?.lng,
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [modalState, setModalState] = useState('default');

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

  const AddressModal = ({modalState}) => {
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

      if (state === 'destination') {
        navigation.navigate('Booking');
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
          title="Map"
          className="mb-0 py-4"
          expand
          isInverted={expanded}
          onPress={() => setExpanded(expanded => !expanded)}
        />
        {expanded && <Input placeholder="Search..." returnKeyType="search" />}
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
        style={{transform: [{translateX: -15}, {translateY: -22.5}]}}
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
