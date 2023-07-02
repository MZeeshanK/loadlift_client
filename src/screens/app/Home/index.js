import React, {useEffect, useState} from 'react';
import {View, Image, StyleSheet} from 'react-native';

import Linear from '../../../components/Linear';
import Header from '../../../components/Header';
import HomeButton from './UserButton';
import GFlatList from '../../../components/GFlatList';
import Title from '../../../components/Title';
import DriverButton from './DriverButton';
import DriverCard from './DriverCard';
import CustomModal from '../../../components/CustomModal';
import Card from '../../../components/Card';

const Home = () => {
  const [driver] = useState(true);
  const [isActive, setIsActive] = useState(false);
  const [isDelivering, setIsDelivering] = useState(false);
  const [deliveryModalVisible, setDeliveryModalVisible] = useState(false);

  useEffect(() => {
    isActive ? setDeliveryModalVisible(true) : setDeliveryModalVisible(false);
  }, [isActive]);

  const Driver = () => (
    <View className="flex-1 w-full items-center justify-between -mt-8">
      <CustomModal
        visible={deliveryModalVisible}
        setVisible={setDeliveryModalVisible}>
        <DriverCard
          deliveryModalVisible={deliveryModalVisible}
          setDeliveryModalVisible={setDeliveryModalVisible}
          isActive={isActive}
          isDelivering={isDelivering}
          setIsActive={setIsActive}
          setIsDelivering={setIsDelivering}
        />
      </CustomModal>

      {isDelivering && (
        <Card>
          <DriverCard
            deliveryModalVisible={deliveryModalVisible}
            setDeliveryModalVisible={setDeliveryModalVisible}
            isActive={isActive}
            isDelivering={isDelivering}
            setIsActive={setIsActive}
            setIsDelivering={setIsDelivering}
          />
        </Card>
      )}
      <View className="flex-1" />

      <DriverButton
        isActive={isActive}
        setIsActive={setIsActive}
        isDelivering={isDelivering}
      />
    </View>
  );

  return (
    <Linear style={{paddingVertical: 0, paddngHorizontal: 0}}>
      <Header title="Home" isBack={false} />

      <View className="flex-1 w-full items-center justify-between">
        <Image
          style={styles.logo}
          source={require('../../../assets/logo.png')}
        />
        {driver ? (
          <Driver />
        ) : (
          <>
            {/* 3 last orders list */}
            <GFlatList home />

            <HomeButton />
          </>
        )}
      </View>
    </Linear>
  );
};

const styles = StyleSheet.create({
  logo: {opacity: 0.08, position: 'absolute', top: 0, zIndex: -1},
});

export default React.memo(Home);
