import React, {useEffect} from 'react';
import {
  SafeAreaView,
  Dimensions,
  Keyboard,
  TouchableWithoutFeedback,
  useColorScheme,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import colors from '../../constants/colors';
import Loader from '../Loader';
import Alert from '../Alert';
import PopUp from '../PopUp';
import {setPopUp} from '../../store/misc';

const {height} = Dimensions.get('window');

const Linear = ({children, style}) => {
  const dispatch = useDispatch();
  const colorScheme = useColorScheme();

  const loading = useSelector(state => state.misc.loading);
  const {message, visible} = useSelector(state => state.misc.error);
  const {visible: popUpVisible, message: popUpMessage} = useSelector(
    state => state.misc.popUp,
  );

  if (loading) {
    Keyboard.dismiss();
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView
        className="flex-1 h-full p-3"
        style={[
          {
            height: height,
            backgroundColor:
              colorScheme === 'dark'
                ? colors.background
                : colors.lightBackground,
          },
          style,
        ]}>
        <>
          <PopUp />
          <Alert message={message} visible={visible} />
          {loading && <Loader />}
          {children}
        </>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default React.memo(Linear);
