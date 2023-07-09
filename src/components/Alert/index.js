import React from 'react';
import {Dimensions, Modal, Pressable} from 'react-native';

import Title from '../Title';
import Card from '../Card';

const {height} = Dimensions.get('window');

const Alert = ({message, visible, setVisible, ...props}) => {
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
        <Card danger style={props.style}>
          <Title bold xl>
            {message}
          </Title>
        </Card>
      </Pressable>
    </Modal>
  );
};

export default React.memo(Alert);
