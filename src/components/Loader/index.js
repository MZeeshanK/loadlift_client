import React from 'react';
import {ActivityIndicator, Dimensions, Modal, Pressable} from 'react-native';
import colors from '../../constants/colors';

const {height, width} = Dimensions.get('window');

const Loader = ({visible, setVisible, ...props}) => {
  return (
    <Modal
      onRequestClose={() => setVisible(false)}
      transparent
      animationType="fade"
      visible={visible}>
      <Pressable
        onPress={!props.block && (() => setVisible(false))}
        className="items-center justify-around px-5"
        style={{height: height, backgroundColor: 'rgba(0,0,0,.6)'}}>
        <ActivityIndicator
          color={colors.primary}
          size="large"
          style={{transform: [{scale: 3}]}}
        />
      </Pressable>
    </Modal>
  );
};

export default React.memo(Loader);
