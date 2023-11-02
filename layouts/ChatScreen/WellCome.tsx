import { HStack, Text } from '@chakra-ui/react';
import React from 'react';
const WellCome = () => {
  return (
    <>
      <HStack fontWeight="extrabold">
        <Text>Welcome to</Text>
        <Text color="primary.a.500">PostSatus</Text>
      </HStack>
      <Text>
        Neque porro quisquam est qui dolorem ipsum quia dolor sit amet
      </Text>
    </>
  );
};

export default WellCome;
