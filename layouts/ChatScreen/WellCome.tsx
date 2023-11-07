import { Box, HStack, Text, VStack, Image } from '@chakra-ui/react';
import React from 'react';

// This Start Screen of chat

const WellCome = () => {
  return (
    <>
      <VStack height="full" width="full">
        <Box margin="auto" textAlign="center" padding={{ md: 0, base: 4 }}>
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
          <Image src="/assets/frame/banner.svg" />
        </Box>
      </VStack>
    </>
  );
};

export default WellCome;
