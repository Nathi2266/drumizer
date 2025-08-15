import React, { useContext } from 'react';
import { Box, Button, Flex } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Flex bg="teal.500" p={4} justify="space-between" align="center">
      <Box color="white" fontWeight="bold">Drumizer</Box>
      <Box>
        {token ? (
          <>
            <Button as={Link} to="/dashboard" mr={2} colorScheme="teal" variant="outline">Dashboard</Button>
            <Button colorScheme="red" onClick={handleLogout}>Logout</Button>
          </>
        ) : (
          <>
            <Button as={Link} to="/" mr={2} colorScheme="teal" variant="outline">Login</Button>
            <Button as={Link} to="/register" colorScheme="green">Register</Button>
          </>
        )}
      </Box>
    </Flex>
  );
};

export default Navbar;
