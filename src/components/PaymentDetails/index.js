import React, {useState} from 'react';
import {Image, Pressable, View} from 'react-native';

import Card from '../Card';
import Title from '../Title';

import upi from '../../data/upi';
import userCards from '../../data/userCards';
import Button from '../Button';

const PaymentDetails = () => {
  const [cards] = useState(userCards);
  const [cardOptions, setCardOptions] = useState(false);
  return (
    <>
      <Card className="flex-row px-6 py-2 justify-between items-center">
        <Title xl bold className="tracking-wide">
          LoadCoin
        </Title>
        <View className="flex-row items-center justify-center">
          <Image
            source={require('../../assets/loadcoin.png')}
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
              className="p-1 mr-5 rounded-md bg-ongoing"
              style={{elevation: 1}}>
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
          {cards.map((card, index) => (
            <Pressable
              onPress={() => setCardOptions(true)}
              key={card.number}
              className={`bg-ongoing ${
                index === 0 && 'bg-secondary'
              }  my-2 flex-row items-center justify-between w-full px-3 py-1 rounded-full`}>
              <Title lg bold left>
                {card.name}
              </Title>
              <Title base semibold right>
                XXXX {card.number.slice(-4)}
              </Title>
            </Pressable>
          ))}
        </View>

        <View className="flex-row items-center justify-end my-3 w-full">
          {cardOptions && (
            <>
              <Button title="Remove Card" mini danger />
              <Button title="Edit Card" card mini className="ml-3" />
            </>
          )}
          <Button title="Add Card" mini className="ml-3" />
        </View>
      </Card>
    </>
  );
};

export default React.memo(PaymentDetails);
