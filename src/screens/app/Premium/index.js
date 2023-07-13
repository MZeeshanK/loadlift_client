import React, {useState} from 'react';
import {ScrollView, View, useColorScheme} from 'react-native';

import Linear from '../../../components/Linear';
import Header from '../../../components/Header';
import Card from '../../../components/Card';
import Title from '../../../components/Title';
import colors from '../../../constants/colors';
import Button from '../../../components/Button';

const Premium = () => {
  const [pack, setPack] = useState(false);
  const colorScheme = useColorScheme();

  const header = ['Basic', 'Premium'];

  const data = [
    ['Unable to skip ads', 'Ad free user experience'],
    ['Unable to track drivers', 'Track drivers as they carry your load'],
    [
      'Get 2 loadcoins for every kilometer of delivery',
      'get 5 loadcoins for every kilometer of delivery',
    ],
  ];

  const primary = colorScheme === 'dark' ? colors.primary : colors.lightPrimary;
  const ongoing = colorScheme === 'dark' ? colors.ongoing : colors.lightOngoing;

  return (
    <Linear>
      <Header title="Premium" />
      <ScrollView className="w-full flex-1">
        <View className="w-full">
          <Card className="pb-10">
            <Title xl semibold primary className="mb-4">
              Benifits of Premium
            </Title>
            {/* Table */}
            <View className="w-full items-center justify-center">
              {/* Header */}
              <View
                className="w-full flex-row items-center justify-center border-2 rounded-tr-xl rounded-tl-xl"
                style={{borderColor: primary}}>
                {header.map((head, index) => (
                  <Title
                    key={index}
                    semibold
                    base
                    className={`flex-1 py-1 ${index === 0 && 'border-r-2'}`}
                    style={{borderColor: primary}}>
                    {head}
                  </Title>
                ))}
              </View>
              {/* Table data */}
              {data.map((d, index) => (
                <View
                  key={index}
                  className={`w-full flex-row items-center justify-center border-l-2 border-r-2 ${
                    index === data.length - 1 &&
                    'rounded-br-xl rounded-bl-xl border-b-2'
                  }`}
                  style={{borderWidth: 0.2, borderColor: primary}}>
                  {d.map((item, index) => (
                    <Title
                      key={index}
                      light
                      left
                      className={`flex-1 h-full p-3 ${
                        index === 0 && 'border-r-2'
                      } `}
                      style={{borderColor: primary}}>
                      {item}
                    </Title>
                  ))}
                </View>
              ))}
            </View>
          </Card>

          <View className="w-full flex-row justify-center gap-x-2 items-center">
            <Card
              className="flex-1 h-32"
              style={{backgroundColor: !pack ? primary : ongoing}}
              onPress={() => setPack(false)}>
              <Title className="py-4 px-2" base black={!pack} semibold>
                {'\u20b9'}199 for 1 month
              </Title>
            </Card>
            <Card
              className="flex-1 h-32"
              style={{backgroundColor: pack ? primary : ongoing}}
              onPress={() => setPack(true)}>
              <Title className="py-4 px-2" black={pack} base semibold>
                {'\u20b9'}499 for 3 month
              </Title>
            </Card>
          </View>
        </View>
      </ScrollView>
      <Button title="Go for Premium" className="mb-10" />
    </Linear>
  );
};

export default React.memo(Premium);
