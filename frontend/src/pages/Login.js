import React, { useState, useContext } from 'react';
import { Box, Input, Button, VStack, Heading, Text } from '@chakra-ui/react';
import { loginUser } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    try {
      const res = await loginUser({ email, password });
      login(res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={10} p={6} borderWidth={1} borderRadius="md">
      <Heading mb={4}>Login</Heading>
      <VStack spacing={4}>
        <Input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <Input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        {error && <Text color="red.500">{error}</Text>}
        <Button colorScheme="teal" width="full" onClick={handleSubmit}>Login</Button>
        <Text>Don't have an account? <Link to="/register" style={{ color: 'teal' }}>Register</Link></Text>
      </VStack>
    </Box>
  );
};

export default Login;
