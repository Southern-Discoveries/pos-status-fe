import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import api from '@/axios/config';
import DefaultBG from '@/components/Logo/DefaultBG';
import LogoLong from '@/components/Logo/LogoLong';
import LoginBySocial from '@/components/Select/LoginBySocial';
import {
  loginFailure,
  loginStart,
  loginSuccess,
} from '@/redux/reducer/userSlice';

const SignIn = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const dispatch = useDispatch();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const response = await api.post('/auth/login', {
        email: user.email,
        password: user.password,
      });

      if (response.status === 200) {
        console.log(response.data);
        dispatch(loginSuccess(response.data));
        router.push('/'); // Replace with your desired route
      } else {
        dispatch(loginFailure('Authentication failed'));
      }
    } catch (error) {
      // Handle network or server errors
      console.error('Network or server error:', error);
    }
  };
  return (
    <>
      <DefaultBG>
        <VStack height="100vh" width="full">
          <Box
            margin="auto"
            width="25rem"
            border="0.063rem solid"
            borderColor="shader.a.200"
            borderRadius="xl"
            bg="white"
          >
            <Box
              padding={6}
              borderBottom="0.063rem solid"
              borderBottomColor="shader.a.200"
            >
              <Box mb="4.5rem">
                <LogoLong />
              </Box>
              <Text fontWeight="extrabold" fontSize="lg">
                Login to account
              </Text>
              <Text fontSize="sm">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </Text>
              <Box my={6}>
                <FormControl variant="floating_input">
                  <Input
                    variant="auth"
                    mb={2}
                    placeholder=" "
                    id="user-email"
                    type="email"
                    onChange={e => setUser({ ...user, email: e.target.value })}
                  />
                  <FormLabel>Email</FormLabel>
                </FormControl>
                <FormControl variant="floating_input" id="user-password">
                  <Input
                    variant="auth"
                    mb={3}
                    type="password"
                    placeholder=" "
                    onChange={e =>
                      setUser({ ...user, password: e.target.value })
                    }
                  />
                  <FormLabel>Password</FormLabel>
                </FormControl>

                <Link href="/auth/reset-email">
                  <Text color="primary.a.500" fontSize="sm" fontWeight="600">
                    Forget your password?
                  </Text>
                </Link>
              </Box>
              <Button
                variant="primary"
                width="full"
                onClick={e => handleSubmit(e)}
              >
                Login
              </Button>
            </Box>
            <Box
              borderTop="0.063rem solid"
              borderTopColor="shader.a.200"
              padding={6}
            >
              <LoginBySocial />
              <HStack mt={6}>
                <Text fontSize="sm">Don&rsquo;t have account ?</Text>
                <Link href="/auth/register">
                  <Text color="primary.a.500" fontSize="sm" fontWeight="600">
                    Register Now
                  </Text>
                </Link>
              </HStack>
            </Box>
          </Box>
        </VStack>
      </DefaultBG>
    </>
  );
};

export default SignIn;
