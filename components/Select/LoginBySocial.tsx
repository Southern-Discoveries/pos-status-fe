import { Button, HStack, Icon } from '@chakra-ui/react';
import React from 'react';

import FacebookIcon from '@/public/assets/icons/fill/facebook.svg';
import GoogleIcon from '@/public/assets/icons/fill/google.svg';
import Twitter from '@/public/assets/icons/fill/twitter.svg';
const LoginBySocial = () => {
  return (
    <>
      <HStack gap={3}>
        <Button leftIcon={<Icon as={GoogleIcon} />}>Google</Button>
      </HStack>
    </>
  );
};

export default LoginBySocial;
