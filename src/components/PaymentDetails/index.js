import React, {useState} from 'react';
import {Image, Pressable, View, useColorScheme} from 'react-native';

import Card from '../Card';
import Title from '../Title';

import upi from '../../data/upi';
import Button from '../Button';
import colors from '../../constants/colors';
import NewCard from './NewCard';

const PaymentDetails = () => {
  const colorScheme = useColorScheme();

  const [cards, setCards] = useState([
    {
      userName: 'John Doe',
      cardNumber: '1234567890123456',
      expiry: '12/24',
      cvv: '123',
    },
  ]);
  const [newCardModal, setNewCardModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState('');

  const ongoing =
    colorScheme === 'dark' ? colors.ongoing : colors.lightSecondary;
  const primary = colorScheme === 'dark' ? colors.primary : colors.lightPrimary;
  const dark = colorScheme === 'dark' ? colors.black : colors.white;
  const light = colorScheme === 'dark' ? colors.white : colors.black;

  const deleteCard = () => {
    setCards(cards.filter(card => card.cardNumber !== selectedCard));
  };

  return (
    <>
      <NewCard
        visible={newCardModal}
        setVisible={setNewCardModal}
        setState={setCards}
      />
      <Card className="flex-row px-6 py-2 justify-between items-center">
        <Title xl bold className="tracking-wide">
          LoadCoin
        </Title>
        <View className="flex-row items-center justify-center">
          <Image
            source={
              colorScheme === 'dark'
                ? require('../../assets/loadcoin.png')
                : require('../../assets/loadcoin-light.png')
            }
            className="w-6 h-6 mr-3"
          />
          <Title lg semibold>
            170
          </Title>
        </View>
      </Card>
      <Card className="py-2">
        <Title className="px-4 w-full" sm left bold>
          UPI
        </Title>
        <View className="items-center justify-start w-full flex-row p-2 pt-2">
          {upi.map(item => (
            <Pressable
              key={item.title}
              className="p-1 mr-5 rounded-md"
              style={{elevation: 1, backgroundColor: ongoing}}>
              <Image
                key={item.title}
                className="h-10 w-10"
                source={item.image}
              />
            </Pressable>
          ))}
        </View>
      </Card>

      <Card>
        <Title className="px-4 w-full" sm left bold>
          Credit / Debit / ATM Card
        </Title>

        <View className="w-full py-1">
          {cards.map((card, index) => {
            const selectCondition = selectedCard === card?.cardNumber;

            if (selectCondition) {
              return (
                <Pressable
                  onPress={() => {
                    setSelectedCard('');
                  }}
                  key={card?.cardNumber}
                  className="my-2 w-full px-3 py-1 rounded-xl"
                  style={{backgroundColor: index === 0 ? primary : ongoing}}>
                  <View className="flex-row w-full items-center justify-between mb-3">
                    <View className="flex-row items-center">
                      <Title
                        base
                        bold
                        left
                        style={{color: index === 0 ? dark : light}}>
                        Name:{' '}
                      </Title>
                      <Title
                        base
                        semibold
                        left
                        style={{color: index === 0 ? dark : light}}>
                        {card?.userName}
                      </Title>
                    </View>
                    <View className="flex-row items-center">
                      <Title
                        base
                        bold
                        right
                        style={{color: index === 0 ? dark : light}}>
                        Expiry:{' '}
                      </Title>
                      <Title
                        base
                        semibold
                        right
                        style={{color: index === 0 ? dark : light}}>
                        {card?.expiry}
                      </Title>
                    </View>
                  </View>
                  <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center">
                      <Title
                        base
                        bold
                        left
                        style={{color: index === 0 ? dark : light}}>
                        Card Number:{' '}
                      </Title>
                      <Title
                        semibold
                        left
                        style={{color: index === 0 ? dark : light}}>
                        {card?.cardNumber}
                      </Title>
                    </View>
                  </View>
                  <View className="flex-row w-full items-center gap-x-2 justify-end mt-5 mb-2">
                    <Button mini title="Make Primary Card" />
                    <Button danger mini title="Delete" onPress={deleteCard} />
                  </View>
                </Pressable>
              );
            }

            return (
              <Pressable
                onPress={() => {
                  setSelectedCard(card?.cardNumber);
                }}
                key={card?.cardNumber}
                className="my-2 flex-row items-center justify-between w-full px-3 py-1 rounded-full"
                style={{backgroundColor: index === 0 ? primary : ongoing}}>
                <Title
                  base
                  bold
                  left
                  style={{color: index === 0 ? dark : light}}>
                  {card?.userName}
                </Title>
                <Title
                  base
                  semibold
                  right
                  style={{color: index === 0 ? dark : light}}>
                  XXXX {card?.cardNumber.slice(-4)}
                </Title>
              </Pressable>
            );
          })}
        </View>

        {cards.length <= 2 && (
          <View className="flex-row items-center justify-end my-3 w-full">
            <Button
              title="Add Card"
              mini
              className="ml-3"
              onPress={() => setNewCardModal(true)}
            />
          </View>
        )}
      </Card>
    </>
  );
};

export default React.memo(PaymentDetails);
