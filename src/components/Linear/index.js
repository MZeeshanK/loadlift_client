import React from 'react';
import {
  SafeAreaView,
  Dimensions,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  useColorScheme,
} from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';

import colors from '../../constants/colors';

const {height} = Dimensions.get('window');

// const Linear = ({children, style}) => {
//   return (
//     <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
//       <SafeAreaView className="flex-1" style={[styles.container, style]}>
//         <LinearGradient
//           className="flex-1 w-full h-full items-center justify-center p-4"
//           colors={[colors.start, colors.end]}
//           start={{x: 0, y: 0}}
//           end={{x: 1, y: 1}}
//           locations={[0, 1]}>
//           {children}
//         </LinearGradient>
//       </SafeAreaView>
//     </TouchableWithoutFeedback>
//   );
// };

const Linear = ({children, style}) => {
  const colorScheme = useColorScheme();

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
