import React, {useState, useRef} from 'react';
import {ScrollView, View, useColorScheme} from 'react-native';

import Title from '../Title';

import Button from '../Button';
import colors from '../../constants/colors';
import CustomModal from '../CustomModal';
import TextLabel from '../TextLabel';
import Input from '../Input';
import {useDispatch} from 'react-redux';
import {setModalError} from '../../store/misc';

const NewCard = ({visible, setVisible, setState}) => {
  const colorScheme = useColorScheme();
  const dispatch = useDispatch();

  const ongoing = colorScheme === 'dark' ? colors.ongoing : colors.lightOngoing;

  const [cardNumber, setCardNumber] = useState('');
  const [expiryMonth, setExpiryMonth] = useState('');
  const [expiryYear, setExpiryYear] = useState('');
  const [cvv, setCvv] = useState('');
  const [userName, setUserName] = useState('');

  const expiryMonthRef = useRef();
  const expiryYearRef = useRef();
  const cvvRef = useRef();
  const userNameRef = useRef();

  const cancel = () => {
    setVisible(false);
  };

  const addCard = () => {
    if (
      cardNumber &&
      cardNumber.length === 16 &&
      cvv &&
      cvv.length === 3 &&
      expiryMonth &&
      expiryMonth.length === 2 &&
      expiryYear &&
      expiryYear.length === 2 &&
      userName &&
      userName.length > 5
    ) {
      setState(current => [
        ...current,
        {
          cardNumber,
          expiry: `${expiryMonth}/${expiryYear}`,
          cvv,
          userName,
        },
      ]);

      setCardNumber('');
      setExpiryMonth('');
      setExpiryYear('');
      setCvv('');
      setUserName('');

      setVisible(false);
    } else {
      dispatch(setModalError('Please fill in all the fields'));
    }
  };

  return (
    <CustomModal
      visible={visible}
      setVisible={setVisible}
      style={{justifyContent: 'flex-start'}}>
      <Title base bold>
        Add a new Card
      </Title>

      <ScrollView className="w-full">
        <TextLabel title="Card Number" />
        <Input
          autoFocus
          placeholder="Enter your Card Number"
          className="mx-0"
          value={cardNumber}
          onChangeText={val => {
            setCardNumber(val);
            if (val.length === 16) {
              expiryMonthRef.current.focus();
            }
            if (val.length > 16) {
              setCardNumber(val.slice(0, 16));
            }
          }}
          keyboardType="numeric"
          returnKeyType="next"
          onSubmitEditing={() => {
            expiryMonthRef.current.focus();
          }}
        />

        <View className="w-full flex-row items-center justify-evenly">
          <View className="flex-1 mr-6">
            <TextLabel title="Expiry Date" />
            <View className="flex-row items-center justify-between">
              <Input
                placeholder="Month"
                className="mx-0 mr-1 w-1/2"
                value={expiryMonth}
                maxLength={16}
                onChangeText={val => {
                  setExpiryMonth(val);
                  if (val.length === 2) {
                    expiryYearRef.current.focus();
                  }
                  if (val.length > 2) {
                    setExpiryMonth(val.slice(0, 2));
                  }
                }}
                onSubmitEditing={() => {
                  expiryYearRef.current.focus();
                }}
                keyboardType="numeric"
                ref={expiryMonthRef}
                returnKeyType="next"
              />
              <Input
                placeholder="Year"
                className="mx-0 ml-1 w-1/2"
                value={expiryYear}
                onChangeText={val => {
                  setExpiryYear(val);
                  if (val.length === 2) {
                    cvvRef.current.focus();
                  }
                  if (val.length > 2) {
                    setExpiryYear(val.slice(0, 2));
                  }
                }}
                onSubmitEditing={() => cvvRef.current.focus()}
                keyboardType="numeric"
                ref={expiryYearRef}
                returnKeyType="next"
              />
            </View>
          </View>

          <View className="flex-1">
            <TextLabel title="CVV" />
            <Input
              placeholder="Enter your CVV"
              className="mx-0"
              value={cvv}
              onChangeText={val => {
                setCvv(val);
                if (val.length === 3) {
                  userNameRef.current.focus();
                }
                if (val.length > 3) {
                  setCvv(val.slice(0, 3));
                }
              }}
              onSubmitEditing={() => userNameRef.current.focus()}
              keyboardType="numeric"
              ref={cvvRef}
              returnKeyType="next"
            />
          </View>
        </View>

        <TextLabel title="Owner Name" />
        <Input
          placeholder="Enter your full name"
          className="mx-0"
          value={userName}
          ref={userNameRef}
          onChangeText={val => setUserName(val)}
        />
      </ScrollView>

      <View
        className="w-full border-t flex-row items-center justify-evenly pt-4"
        style={{borderColor: ongoing}}>
        <Button half danger title="Cancel" onPress={cancel} />
        <Button half title="Add" onPress={addCard} />
      </View>
    </CustomModal>
  );
};

export default React.memo(NewCard);
