import React from 'react';
import { Box, Slider, SliderTrack, SliderFilledTrack, SliderThumb, Text } from '@chakra-ui/react';

const PatternControls = ({ label, value, onChange, min=0, max=16 }) => {
  return (
    <Box mb={4}>
      <Text mb={2}>{label}: {value}</Text>
      <Slider min={min} max={max} value={value} onChange={onChange}>
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
    </Box>
  );
};

export default PatternControls;
