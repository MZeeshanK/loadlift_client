import React from 'react';
import {
  SafeAreaView,
  Dimensions,
  Keyboard,
  TouchableWithoutFeedback,
  useColorScheme,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import colors from '../../constants/colors';
import Loader from '../Loader';
import PopUp from '../PopUp';

const { height } = Dimensions.get('window');

const Linear = ({ children, style }) => {
  const colorScheme = useColorScheme();

  const { loading, popUp } = useSelector(state => state.misc);

  if (loading || popUp.display) {
    Keyboard.dismiss();
  }

  const background =
    colorScheme === 'dark' ? colors.background : colors.lightBackground;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView
        className="flex-1 h-full p-3"
        style={[
          {
            height: height,
            backgroundColor: background,
          },
          style,
        ]}>
        <>
          {popUp.display && <PopUp />}
          {loading && <Loader />}
          {children}
        </>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default React.memo(Linear);
