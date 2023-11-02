import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Icon,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import Cookies from 'js-cookie';
import Link from 'next/link';
import React from 'react';
import * as Yup from 'yup';

import api from '@/axios/config';
import InputPassword from '@/components/Form/InputPassword';
import LoginBySocial from '@/components/Form/LoginBySocial';
import DefaultBG from '@/components/Logo/DefaultBG';
import LogoLong from '@/components/Logo/LogoLong';
import ErrorIcon from '@/public/assets/icons/fill/error.svg';
const SignIn = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (values, { resetForm }) => {
      // do your stuff
      const response = await api.post('/auth/login', {
        email: values.email,
        password: values.password,
      });
      console.log(response);
      Cookies.set('token', response.data.token);
      resetForm();
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required('Email Address cannot be empty')
        .email('Invalid email address'),
      password: Yup.string()
        .required('Password cannot be empty')
        .min(6, 'Password must be at least 6 characters long'),
    }),
    validateOnChange: true,
  });
  // Handle user signin

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
              <form autoComplete="off" onSubmit={formik.handleSubmit}>
                <Flex my={6} flexDirection="column" gap={3}>
                  <FormControl
                    variant="floating_input"
                    isInvalid={!!(formik.touched.email && formik.errors.email)}
                  >
                    <Input
                      variant="auth"
                      placeholder=" "
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                    />
                    <FormLabel>Email</FormLabel>
                    {formik.touched.email && formik.errors.email && (
                      <FormErrorMessage
                        fontSize="sm"
                        display="flex"
                        alignItems="center"
                        gap={1.5}
                      >
                        <Icon as={ErrorIcon} h={3.5} width={3.5} />
                        <Text> {formik.errors.email}</Text>
                      </FormErrorMessage>
                    )}
                  </FormControl>
                  <InputPassword
                    isInvalid={
                      !!(formik.touched.password && formik.errors.password)
                    }
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.password && formik.errors.password
                        ? formik.errors.password
                        : undefined
                    }
                  />
                  <Link href="/auth/reset-email">
                    <Text color="primary.a.500" fontSize="sm" fontWeight="600">
                      Forget your password?
                    </Text>
                  </Link>
                </Flex>
                <Button variant="primary" width="full" type="submit">
                  Login
                </Button>
              </form>
            </Box>
            <Box padding={6}>
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
