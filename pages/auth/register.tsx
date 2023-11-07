import {
  Box,
  VStack,
  Text,
  HStack,
  FormLabel,
  FormControl,
  Button,
  Input,
  Flex,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import * as Yup from 'yup';

import LoginBySocial from '@/components/Form/LoginBySocial';
import DefaultBG from '@/components/Logo/DefaultBG';
import LogoLong from '@/components/Logo/LogoLong';
import { useActions } from '@/hooks/useActions';

interface IProps {
  hasUpperCase?: string;
  hasNumber?: string;
  hasSpecialChar?: string;
}
const RegisterPage = () => {
  const { register, login, checkAuth } = useActions();
  // eslint-disable-next-line no-unused-vars
  const isPasswordValid = (password: string) => {
    const errors: IProps = {};

    if (!/[A-Z]/.test(password)) {
      errors.hasUpperCase = 'Password must contain an uppercase letter.';
    }
    if (!/\d/.test(password)) {
      errors.hasNumber = 'Password must contain a number.';
    }

    if (!/[!@#$%^&+=]/.test(password)) {
      errors.hasSpecialChar = 'Password must contain a special character.';
    }

    return {
      valid: Object.keys(errors).length === 0,
      errors,
    };
  };
  /*  const SignupSchema = Yup.object().shape({
    password: Yup.string().required('Password is required'),
    
     .test('password-validation', 'Invalid password', function (values) {
        const validation = isPasswordValid(values || '');

        if (!validation.valid) {
          return this.createError({
            message: validation.errors.hasNumber,
            path: 'password',
          
          });
        }

        return true;
      }),
  }); */
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirm_password: '',
      error_message: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required('Email Address cannot be empty')
        .email('Invalid email address'),
      password: Yup.string()
        .required('Password cannot be empty')
        .min(6, 'Password must be at least 6 characters long'),
    }),
    onSubmit: async (values, { setFieldError }) => {
      try {
        await register({ email: values.email, password: values.password });
        await login({ email: values.email, password: values.password });
        await checkAuth();
        router.push('/');
      } catch (error) {
        setFieldError('error_message', 'Invalid Email or Password');
      }
    },
    validateOnChange: true,
  });
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
                Register Account
              </Text>
              <Text fontSize="sm">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </Text>
              <form autoComplete="off" onSubmit={formik.handleSubmit}>
                <Flex my={6} flexDirection="column" gap={3}>
                  <FormControl variant="floating_input">
                    <Input
                      variant="auth"
                      mb={2}
                      placeholder=" "
                      type="text"
                      name="username"
                      value={formik.values.username}
                      onChange={formik.handleChange}
                    />
                    <FormLabel>Username</FormLabel>
                  </FormControl>

                  <FormControl
                    variant="floating_input"
                    isInvalid={!!(formik.touched.email && formik.errors.email)}
                  >
                    <Input
                      variant="auth"
                      mb={2}
                      placeholder=" "
                      type="email"
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                    />
                    <FormLabel>Email</FormLabel>
                  </FormControl>
                  <FormControl
                    variant="floating_input"
                    isInvalid={
                      !!(formik.touched.password && formik.errors.password)
                    }
                  >
                    <Input
                      variant="auth"
                      mb={3}
                      type="password"
                      placeholder=" "
                      name="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                    />
                    <FormLabel>Password</FormLabel>
                    {formik.touched.password && formik.errors.password && (
                      <FormErrorMessage>
                        <Text> {formik.errors.password}</Text>
                      </FormErrorMessage>
                    )}
                  </FormControl>
                  <Box borderRadius="xl" padding={4} border="0.063rem solid">
                    <Text
                      fontSize="sm"
                      color="shader.a.700"
                      mb={2}
                      fontWeight="medium"
                    >
                      Your Password need to:
                    </Text>
                    <Flex flexDirection="column" gap="6px">
                      <HStack>
                        {/* {formik.touched.password &&
                          formik.errors.password.includes(
                            'Password must contain an uppercase letter.'
                          ) && (
                            <Text color="resd">
                              (Password must contain an uppercase letter)
                            </Text>
                          )} */}
                        <Text fontSize="xs">8 to 20 Characters</Text>
                      </HStack>
                      <HStack>
                        <Text fontSize="xs">1 Uppercase Letter</Text>
                      </HStack>
                      <HStack>
                        <Text fontSize="xs">1 or more numbers</Text>
                      </HStack>
                      <HStack>
                        <Text fontSize="xs">1 or more special characters</Text>
                      </HStack>
                    </Flex>
                  </Box>
                  <FormControl variant="floating_input">
                    <Input
                      variant="auth"
                      mb={2}
                      placeholder=" "
                      id="confirm-password"
                      type="password"
                      name="confirm_password"
                      value={formik.values.confirm_password}
                      onChange={formik.handleChange}
                    />
                    <FormLabel>Confirm password</FormLabel>
                  </FormControl>
                </Flex>
                <Button variant="primary" width="full" type="submit">
                  Create Account
                </Button>
              </form>
            </Box>
            <Box padding={6}>
              <LoginBySocial />
              <HStack mt={6}>
                <Text fontSize="sm">I already have an account?</Text>
                <Link href="/auth/signin">
                  <Text color="primary.a.500" fontSize="sm" fontWeight="600">
                    Login now
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

export default RegisterPage;
