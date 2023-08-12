import React, {useEffect} from 'react';
import {Modal, Dimensions, Pressable} from 'react-native';

import Card from '../../Card';
import {useSelector} from 'react-redux';
import {setModalError} from '../../../store/misc';
import Alert from '../../Alert';

const {height} = Dimensions.get('window');

const CustomModal = ({children, visible, setVisible, style, ...props}) => {
  const {
    message: error,
    visible: errorVisible,
    modal,
  } = useSelector(state => state.misc.modalError);

  return (
    <Modal
      onRequestClose={() => setVisible(false)}
      transparent
      animationType="fade"
      visible={visible}>
      <Pressable
        onPress={!props.block && (() => setVisible(false))}
        className="items-center justify-center px-5"
        style={[{height: height, backgroundColor: 'rgba(0,0,0,.6)'}, style]}>
        <Card style={props.style}>
          <Alert message={error} visible={errorVisible} modal={modal} />
          {children}
        </Card>
      </Pressable>
    </Modal>
  );
};

export default React.memo(CustomModal);
