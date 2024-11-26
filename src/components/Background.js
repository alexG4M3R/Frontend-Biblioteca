import React from 'react';

const Background = ({ imageUrl }) => {
  const backgroundStyle = {
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    position: 'fixed',
    width: '100%',
    height: '100%',
    zIndex: '-1',
  };

  return <div style={backgroundStyle}></div>;
};

export default Background;
