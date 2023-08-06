import React from 'react';
import {Modal, View} from 'react-native';

import Title from '../Title';
import Card from '../Card';

import {useSelector} from 'react-redux';

const Alert = ({...props}) => {
  const {message, visible} = useSelector(state => state.misc.error);

  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View className="px-3 absolute top-12 w-full ">
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
