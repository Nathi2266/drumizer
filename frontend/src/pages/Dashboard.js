import React from 'react';
import { Box, Heading, VStack, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <Box maxW="lg" mx="auto" mt={10}>
      <Heading mb={6}>Dashboard</Heading>
      <VStack spacing={4}>
        <Button as={Link} to="/upload" colorScheme="teal" width="full">Upload Sample</Button>
        <Button as={Link} to="/generate" colorScheme="blue" width="full">Generate Drums</Button>
      </VStack>
    </Box>
  );
};

export default Dashboard;
