import React from 'react';
import Loader from 'react-loader';

export default function Spinner() {
  return (
    <Loader
      className='spinner'
      color='#4a90e2'
      corners={1}
      direction={1}
      hwaccel={false}
      left='50%'
      length={20}
      lines={13}
      loaded={false}
      loadedClassName='loadedContent'
      radius={30}
      rotate={0}
      scale={0.60}
      shadow={false}
      speed={1}
      top='46%'
      trail={60}
      width={10}
      zIndex={2e9}
    />
  );
}
