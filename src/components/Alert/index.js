import React, {useEffect} from 'react';
import {Modal, View} from 'react-native';

import Title from '../Title';
import Card from '../Card';

const Alert = ({message, visible, setVisible, ...props}) => {
  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        setVisible(false);
      }, 3000);
    }
  }, [visible]);

  return (
    <Modal
      onRequestClose={() => setVisible(false)}
      transparent
      animationType="fade"
      visible={visible}>
      <View className="px-3 absolute top-12 w-full">
        <Card danger style={props.style} className="py-1 rounded-full">
          <Title bold white>
            {message}
          </Title>
        </Card>
      </View>
    </Modal>
  );
};

export default React.memo(Alert);
