import React, { useState, useContext } from 'react';
import { Box, Button, VStack, Text } from '@chakra-ui/react';
import PatternControls from '../components/PatternControls';
import AudioPlayer from '../components/AudioPlayer';
import { generateDrums } from '../services/api';
import { AuthContext } from '../context/AuthContext';

const GenerateDrums = () => {
  const { token } = useContext(AuthContext);
  const [kick, setKick] = useState(4);
  const [shaker, setShaker] = useState(8);
  const [perc, setPerc] = useState(2);
  const [audioSrc, setAudioSrc] = useState('');
  const [message, setMessage] = useState('');

  const handleGenerate = async () => {
    try {
      const res = await generateDrums({ kick, shaker, perc }, token);
      setAudioSrc(`http://localhost:5000/${res.data.file_path}`);
      setMessage('Generated successfully!');
    } catch (err) {
      setMessage('Generation failed.');
    }
  };

  return (
    <Box maxW="lg" mx="auto" mt={10}>
      <VStack spacing={4}>
        <PatternControls label="Kick Pattern" value={kick} onChange={val => setKick(val)} />
        <PatternControls label="Shaker Pattern" value={shaker} onChange={val => setShaker(val)} />
        <PatternControls label="Percussion Pattern" value={perc} onChange={val => setPerc(val)} />
        <Button colorScheme="blue" onClick={handleGenerate}>Generate Drum Loop</Button>
        {message && <Text>{message}</Text>}
        <AudioPlayer src={audioSrc} />
      </VStack>
    </Box>
  );
};

export default GenerateDrums;
