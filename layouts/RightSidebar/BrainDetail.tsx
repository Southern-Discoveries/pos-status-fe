import { Box, Flex, HStack, Icon, Input, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

import ChatInput from '@/components/Chat/ChatInput';
import { useTrain } from '@/hooks/userTrain';
import ArrowIcon from '@/public/assets/icons/line/arrow-2.svg';
import EditIcon from '@/public/assets/icons/line/edit-1.svg';
import trainService from '@/redux/train/train-service';
interface IProps {
  onClose: () => void;
}
// Todo Feedback remove content brain when create
const BrainDetail = ({ onClose }: IProps) => {
  const [title, setTitle] = useState('United');
  const [chatMessages, setChatMessages] = useState<[]>([]);
  const { currentBrainID } = useTrain();

  const handleCreateBrain = async (title: string) => {
    // content not need
    const data = {
      title: title,
      description: 'IT not used',
    };
    const response = await trainService.createBrain(data);
    return response;
  };
  useEffect(() => {
    if (currentBrainID) {
    }
  }, []);
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
          onClick={() => {
            handleCreateBrain(title);
          }}
          /*   opacity={0.35} */
        >
          Save
        </Text>
      </HStack>
      {chatMessages.map((list, index) => (
        <Box key={index}>{list}</Box>
      ))}
      <Box
        left={0}
        bottom={0}
        padding={4}
        width="full"
        borderTop="0.063rem solid"
        borderTopColor="shader.a.200"
        position="absolute"
        height="4rem"
      >
        <ChatInput
          onSend={() => setChatMessages}
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
