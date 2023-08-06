import React, {useEffect} from 'react';
import {
  SafeAreaView,
  Dimensions,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  useColorScheme,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import colors from '../../constants/colors';
import Loader from '../Loader';
import Alert from '../Alert';
import {removeError} from '../../store/misc';

const {height} = Dimensions.get('window');

const Linear = ({children, style}) => {
  const colorScheme = useColorScheme();
  const dispatch = useDispatch();

  const loading = useSelector(state => state.misc.loading);

  if (loading) {
    Keyboard.dismiss();
  }

  const {visible} = useSelector(state => state.misc.error);

  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        dispatch(removeError());
      }, 2000);
    }
  }, [visible]);

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
          <Alert />
          {loading && <Loader />}
          {children}
        </>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    height: height,
    backgroundColor: colors.background,
  },
});

export default React.memo(Linear);
