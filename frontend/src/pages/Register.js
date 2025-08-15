import React, { useState } from 'react';
import { Box, Input, Button, VStack, Heading, Text } from '@chakra-ui/react';
import { registerUser } from '../services/api';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    try {
      await registerUser({ username, email, password });
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={10} p={6} borderWidth={1} borderRadius="md">
      <Heading mb={4}>Register</Heading>
      <VStack spacing={4}>
        <Input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
        <Input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <Input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        {error && <Text color="red.500">{error}</Text>}
        <Button colorScheme="green" width="full" onClick={handleSubmit}>Register</Button>
        <Text>Already have an account? <Link to="/" style={{ color: 'teal' }}>Login</Link></Text>
      </VStack>
    </Box>
  );
};

export default Register;
