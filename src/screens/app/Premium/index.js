import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';

import Linear from '../../../components/Linear';
import Header from '../../../components/Header';
import Card from '../../../components/Card';
import Title from '../../../components/Title';
import colors from '../../../constants/colors';
import Button from '../../../components/Button';

const Premium = () => {
  const [pack, setPack] = useState(false);

  const header = ['Basic', 'Premium'];

  const data = [
    ['Unable to skip ads', 'Ad free user experience'],
    ['Unable to track drivers', 'Track drivers as they carry your load'],
    [
      'Get 2 loadcoins for every kilometer of delivery',
      'get 5 loadcoins for every kilometer of delivery',
    ],
  ];

  return (
    <Linear>
      <Header title="Premium" />
      <View className="w-full flex-1 items-center justify-between">
        <View className="w-full">
          <Card className="pb-10">
            <Title xl semibold className="mb-5">
              Benifits of Premium
            </Title>
            {/* Table */}
            <View className="w-full items-center justify-center">
              {/* Header */}
              <View className="w-full flex-row items-center justify-center border border-primary rounded-tr-md rounded-tl-md ">
                {header.map((head, index) => (
                  <Title
                    semibold
                    className={`flex-1 px-3 py-2 ${
                      index === 0 && 'border-r border-primary'
                    }`}>
                    {head}
                  </Title>
                ))}
              </View>
              {/* Table data */}
              {data.map((d, index) => (
                <View
                  className={`w-full flex-row items-center justify-center border-b border-r border-l border-primary ${
                    index === data.length - 1 && 'rounded-br-md rounded-bl-md'
                  }`}>
                  {d.map((item, index) => (
                    <Title
                      sm
                      left
                      className={`flex-1 h-full px-3 py-2 ${
                        index === 0 && 'border-r border-primary'
                      }`}>
                      {item}
                    </Title>
                  ))}
                </View>
              ))}
            </View>
          </Card>

          <View className="w-full flex-row justify-between items-center">
            <Card
              className="w-[45%]"
              style={{backgroundColor: !pack ? colors.primary : colors.card}}
              onPress={() => setPack(false)}>
              <Title className="py-4 px-2" base black={!pack} semibold>
                {'\u20b9'}199 for 1 month
              </Title>
            </Card>
            <Card
              className="w-[45%]"
              style={{backgroundColor: pack ? colors.primary : colors.card}}
              onPress={() => setPack(true)}>
              <Title className="py-4 px-2" black={pack} base semibold>
                {'\u20b9'}499 for 3 month
              </Title>
            </Card>
          </View>
        </View>
      </View>
      <Button title="Go for Premium" className="mb-10" />
    </Linear>
  );
};

export default React.memo(Premium);
