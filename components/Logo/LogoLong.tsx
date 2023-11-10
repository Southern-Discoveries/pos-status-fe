import { HStack, Icon, Text } from '@chakra-ui/react';
import React from 'react';

import LogoIcon from '@/public/assets/logo/logo.svg';
const LogoLong = () => {
  return (
    <>
      <HStack gap="8px">
        <Icon as={LogoIcon} height={7} width={7} />
        <Text
          color="shader.a.900"
          fontWeight="bold"
          fontSize="lg"
          display={{ md: 'block', base: 'none' }}
        >
          Postatus
        </Text>
      </HStack>
    </>
  );
};

export default LogoLong;
