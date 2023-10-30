import { Box, Flex } from '@chakra-ui/react';
import React from 'react';

import { ChatScreenProps } from '../Chat';

import ChatInputs from '@/components/Chats/ChatInputs';
import ChatLoader from '@/components/Chats/ChatLoader';
import ChatMessage from '@/components/Chats/ChatMessage';
import { ChatReset } from '@/components/Chats/ChatReset';
import Scrollbar from '@/components/Scrollbar';

const TrainingChat = ({
  messages,
  loading,
  onSend,
  onReset,
  onCreateImage,
}: ChatScreenProps) => {
  return (
    <Flex flexDirection="column" height="full">
      <Box
        flexGrow={1}
        flexShrink={1}
        flexBasis={0}
        padding={4}
        overflow="hidden"
        pb="6rem"
      >
        <Box position="relative" height="full">
          <Scrollbar>
            <Flex flexDirection="column" gap={4}>
              {messages.map((message, index) => (
                <div key={index} className="my-1 sm:my-1.5">
                  <ChatMessage
                    onCreateImage={onCreateImage}
                    message={message}
                  />
                </div>
              ))}
            </Flex>

            {loading && <ChatLoader />}
            <ChatReset onReset={onReset} />
          </Scrollbar>
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
        <ChatInputs onSend={onSend} />
      </Box>
    </Flex>
  );
};

export default TrainingChat;
