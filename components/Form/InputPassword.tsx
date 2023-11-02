import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  Text,
  InputRightElement,
} from '@chakra-ui/react';
import React, { useState } from 'react';

import ErrorIcon from '@/public/assets/icons/fill/error.svg';
import EyeOffIcon from '@/public/assets/icons/line/eye-off.svg';
import EyeIcon from '@/public/assets/icons/line/eye.svg';
interface Props {
  isInvalid?: boolean;
  value: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  error?: string;
}
const InputPassword = ({ isInvalid, value, onChange, error }: Props) => {
  const [hide, setHide] = useState(true);
  return (
    <>
      <FormControl variant="floating_input" isInvalid={isInvalid}>
        <InputGroup>
          <Input
            variant="auth"
            name="password"
            type={hide ? 'text' : 'password'}
            placeholder=" "
            value={value}
            onChange={onChange}
          />
          <FormLabel>Password</FormLabel>
          {value.length > 0 && (
            <InputRightElement>
              <Icon
                as={hide ? EyeOffIcon : EyeIcon}
                h={6}
                width={6}
                color="shader.a.500"
                onClick={() => setHide(!hide)}
              />
            </InputRightElement>
          )}
        </InputGroup>

        {error && (
          <FormErrorMessage
            fontSize="sm"
            display="flex"
            alignItems="center"
            gap={1.5}
          >
            <Icon as={ErrorIcon} h={3.5} width={3.5} />
            <Text> {error}</Text>
          </FormErrorMessage>
        )}
      </FormControl>
    </>
  );
};

export default InputPassword;
