import { Button, HStack, Icon } from '@chakra-ui/react';
import React from 'react';

import FacebookIcon from '@/public/assets/icons/fill/facebook.svg';
import GoogleIcon from '@/public/assets/icons/fill/google.svg';
import TwitterIcon from '@/public/assets/icons/fill/twitter.svg';
const LoginBySocial = () => {
  return (
    <>
      <HStack gap={3}>
        <Button variant="sign_in" leftIcon={<Icon as={GoogleIcon} />}>
          Google
        </Button>
        <Button variant="sign_in" leftIcon={<Icon as={FacebookIcon} />}>
          Facebook
        </Button>
        <Button variant="sign_in" leftIcon={<Icon as={TwitterIcon} />}>
          Twitter
        </Button>
      </HStack>
    </>
  );
};

export default LoginBySocial;
