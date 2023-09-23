import React from 'react';
import { Modal, Dimensions, Pressable } from 'react-native';

import Card from '../Card';

const { height } = Dimensions.get('window');

const CustomModal = ({ children, visible, setVisible, style, ...props }) => {
  return (
    <Modal
      onRequestClose={() => setVisible(false)}
      transparent
      animationType="fade"
      visible={visible}>
      <Pressable
        onPress={!props.block ? () => setVisible(false) : () => {}}
        className="items-center justify-center px-5"
        style={[{ height: height, backgroundColor: 'rgba(0,0,0,.6)' }, style]}>
        <Card style={props.style}>{children}</Card>
      </Pressable>
    </Modal>
  );
};

export default React.memo(CustomModal);
