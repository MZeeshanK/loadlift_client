import React from 'react';

import Linear from '../../../components/Linear';
import Header from '../../../components/Header';
import Loader from '../../../components/Loader';

const Settings = () => {
  return (
    <Linear>
      <Header title="Settings" />
      <Loader />
    </Linear>
  );
};

export default React.memo(Settings);
