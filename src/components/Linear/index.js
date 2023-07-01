import React from 'react';
import {
  SafeAreaView,
  Dimensions,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import colors from '../../constants/colors';

const {height} = Dimensions.get('window');

const Linear = ({children, style}) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView
        className="flex-1 items-center p-4"
        style={[styles.container, style]}>
        {children}
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
