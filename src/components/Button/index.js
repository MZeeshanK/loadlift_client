import React from 'react';
import {TouchableOpacity, StyleSheet, Text} from 'react-native';

const Button = ({title, onPress, mini, medium, max, danger, green, style}) => {
  return (
    <TouchableOpacity
      className={`bg-primary rounded-full items-center justify-center px-20 py-1 ${
        mini && 'px-10 py-2'
      } ${danger && 'bg-red'} ${green && 'bg-green-500'}`}
      style={style}
      onPress={onPress}>
      <Text
        className={`text-black font-bold text-lg ${mini && 'text-lg'} ${
          medium && 'text-lg'
        } ${max && 'text-2xl'}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

// const styles = StyleSheet.create({
//   mini:{

//   },
//   medium:{

//   },
//   max:{

//   },
//   red:{

//   },
//   green:{

//   },
//   disabled:{

//   },
// })

export default React.memo(Button);
