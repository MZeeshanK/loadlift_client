import React, {useState} from 'react';
import {FlatList, View} from 'react-native';

import Linear from '../../../components/Linear';
import Header from '../../../components/Header';
import Title from '../../../components/Title';
import Button from '../../../components/Button';
import CustomModal from '../../../components/CustomModal';

import details from '../../../data/switchDetails';

import {useSelector, useDispatch} from 'react-redux';
import {changeUserType} from '../../../store/user';

const AccountSwitch = ({navigation}) => {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);

  const userType = useSelector(state => state.user.type);

  return (
    <Linear>
      <Header title="Account Switch" />

      <CustomModal visible={modalVisible} setModalVisible={setModalVisible}>
        <Title bold xxl className="tracking-tighter mb-4">
          Are you Sure?
        </Title>
        <View className="w-full flex-row items-center justify-between">
          <Button
            onPress={() => setModalVisible(false)}
            title="No"
            danger
            half
          />
          <Button
            onPress={() => {
              setModalVisible(false);
              dispatch(
                changeUserType(userType === 'driver' ? 'user' : 'driver'),
              );
              navigation.navigate('Home');
            }}
            title="Yes"
            half
          />
        </View>
      </CustomModal>
      <View className="flex-1 w-full items-center -mt-5  ">
        <Title bold base left>
          About Driver Account:
        </Title>
        <FlatList
          className="mb-10"
          data={details}
          keyExtracter={index => String(index)}
          renderItem={({item, index}) => (
            <Title bold left className="mb-2">
              {index + 1}. {'   '}
              <Title>{item.data}</Title>
            </Title>
          )}
        />
        <Button title="Continue" onPress={() => setModalVisible(true)} />
      </View>
    </Linear>
  );
};

export default React.memo(AccountSwitch);
