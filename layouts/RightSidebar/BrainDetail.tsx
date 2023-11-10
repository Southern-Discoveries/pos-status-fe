import { Box, Flex, HStack, Icon, Input, Text } from '@chakra-ui/react';
import React, { useState } from 'react';

import ChatInput from '@/components/Chat/ChatInput';
import ArrowIcon from '@/public/assets/icons/line/arrow-2.svg';
import EditIcon from '@/public/assets/icons/line/edit-1.svg';
interface IProps {
  onClose: () => void;
}
const BrainDetail = ({ onClose }: IProps) => {
  const [title, setTitle] = useState('United');

  return (
    <Box position="relative" height="full">
      <HStack width="full" justifyContent="space-between" padding={4}>
        <Icon
          as={ArrowIcon}
          onClick={() => onClose()}
          height={5}
          width={5}
          cursor="pointer"
          transform="rotate(180deg)"
        />
        <Flex alignItems="center" gap={1}>
          <Input
            variant="unstyled"
            htmlSize={6}
            width="auto"
            textAlign="center"
            value={title}
            onChange={e => {
              setTitle(e.target.value);
            }}
            fontSize="lg"
            color="shader.a.900"
            fontWeight="bold"
          />
          <Icon as={EditIcon} height={5} width={5} cursor="pointer" />
        </Flex>
        <Text
          cursor="pointer"
          color="primary.a.500"
          fontWeight="medium"
          opacity={0.35}
        >
          Save
        </Text>
      </HStack>
      <Box left={0} bottom={-5} width="full" position="absolute" height="4rem">
        <ChatInput
          onSend={() => {}}
          isLoading={false}
          sx={{
            placeholder: 'Type Trainning Data',
          }}
        />
      </Box>
    </Box>
  );
};

export default BrainDetail;
