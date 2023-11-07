import { HStack, Text } from '@chakra-ui/react';
import React from 'react';

import Logo from '@/public/assets/logo/logo.svg';
const LogoLong = () => {
  return (
    <>
      <HStack gap="8px">
        <Logo />
        <Text color="shader.a.900" fontWeight="bold" fontSize="lg">
          Postatus
        </Text>
      </HStack>
    </>
  );
};

export default LogoLong;
