import React, { useState, useContext } from 'react';
import { Box, Input, Button, VStack, Text } from '@chakra-ui/react';
import { uploadSample } from '../services/api';
import { AuthContext } from '../context/AuthContext';

const UploadSample = () => {
  const { token } = useContext(AuthContext);
  const [file, setFile] = useState(null);
  const [type, setType] = useState('kick');
  const [message, setMessage] = useState('');

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('sample_type', type);
    try {
      await uploadSample(formData, token);
      setMessage('Uploaded successfully!');
    } catch (err) {
      setMessage('Upload failed.');
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={10}>
      <VStack spacing={4}>
        <Input type="file" accept=".wav" onChange={e => setFile(e.target.files[0])} />
        <Input placeholder="Sample type (kick, shaker, percussion)" value={type} onChange={e => setType(e.target.value)} />
        <Button colorScheme="teal" onClick={handleUpload}>Upload</Button>
        {message && <Text>{message}</Text>}
      </VStack>
    </Box>
  );
};

export default UploadSample;
