import { Box, Flex, Text } from '@chakra-ui/react';
import React, { useState } from 'react';

import ChatInputs from '@/components/Chats/ChatInputs';
import { Message } from '@/types';

const RightSetting = () => {
  const [trainingLoading, setTrainingLoading] = useState<boolean>(false);

  const [trainingMessages, setTrainingMessages] = useState<Message[]>([]);
  const handleTrainingSend = async (message: Message) => {
    const updatedMessages = [...trainingMessages, message];

    setTrainingMessages(updatedMessages);
  };
  const handleTrainingReset = () => {
    setTrainingMessages([]);
  };
  return (
    <>
      <Box
        overflow="hidden"
        height="full"
        borderLeft="0.063rem solid"
        borderLeftColor="shader.a.200"
        position="relative"
        bg="white"
      >
        <Flex flexDirection="column" height="full">
          <Box
            flexGrow={1}
            flexShrink={1}
            flexBasis={0}
            overflow="hidden"
            pb="6rem"
          >
            <Box position="relative" height="full">
              <Box overflowY="auto" height="full">
                <Box height="2000px">das</Box>
                <Text> dasdwqewq</Text>
              </Box>
            </Box>
          </Box>
          <Box
            borderTop="0.063rem solid"
            borderTopColor="shader.a.200"
            padding={4}
            position="absolute"
            width="full"
            bottom={0}
            height="6rem"
            left={0}
            bg="white"
            pb={8}
          >
            <ChatInputs onSend={handleTrainingSend} />
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default RightSetting;
