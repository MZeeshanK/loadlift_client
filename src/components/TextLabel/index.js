import React from 'react';
import Title from '../Title';

const TextLabel = ({title, style}) => {
  return (
    <Title className="w-full px-4 mb-1" left semibold style={style}>
      {title}
    </Title>
  );
};

export default React.memo(TextLabel);
