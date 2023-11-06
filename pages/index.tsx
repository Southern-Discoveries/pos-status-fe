import { Box, HStack, VStack, Text } from '@chakra-ui/react';
import React from 'react';

import DefaultLayout from '@/layouts';

const Home = () => {
  return (
    <DefaultLayout>
      <VStack height="100vh" width="full">
        <Box margin="auto" textAlign="center">
          <HStack
            fontWeight="extrabold"
            fontSize="40px"
            justifyContent="center"
            flexWrap="wrap"
            rowGap={0}
          >
            <Text>Welcome to</Text>
            <Text color="primary.a.500">PostStatus</Text>
          </HStack>
          <Text color="shader.a.500" mb="40px">
            Neque porro quisquam est qui dolorem ipsum quia dolor sit amet
          </Text>
          <Box
            bg="white"
            width={{ md: '640px', base: '150px' }}
            height={{ md: '320px', base: '100px' }}
            borderRadius="12px"
            border="0.063rem solid"
            borderColor="shader.a.200"
          ></Box>
        </Box>
      </VStack>
    </DefaultLayout>
  );
};

export default Home;
