import React from 'react';

const AudioPlayer = ({ src }) => {
  if (!src) return null;
  return (
    <audio controls src={src} style={{ width: '100%' }} />
  );
};

export default AudioPlayer;
