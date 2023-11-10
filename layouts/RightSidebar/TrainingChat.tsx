/* eslint-disable no-unused-vars */
import { Box, Button, Flex } from '@chakra-ui/react';
import React, { useEffect, useRef } from 'react';

import { ChatScreenProps } from '../ChatScreen';

import ChatInputs from '@/components/Chat/ChatInput';
import ChatLoader from '@/components/Chat/ChatLoader';
import ChatMessage from '@/components/Chat/ChatMessage';
import Scrollbar from '@/components/Scrollbar';

const TrainingChatScreen = ({
  messages,
  loading,
  onSend,
  onCreateImage,
}: ChatScreenProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  return (
    <>
      <Flex
        flexDirection="column"
        height="full"
        position="relative"
        padding={4}
      >
        <Button variant="primary" py={3}>
          + Knowledger Data
        </Button>
      </Flex>
    </>
  );
};
/* <Flex flexDirection="column" height="full" position="relative">
      <Box
        flexGrow={1}
        flexShrink={1}
        flexBasis={0}
        overflow="hidden"
        pb="5rem"
      >
        <Box position="relative" height="full">
          <Scrollbar>
            <Flex flexDirection="column" gap={4} padding={4}>
              {messages.map((message, index) => (
                <Box key={index}>
                  <ChatMessage
                    onCreateImage={onCreateImage}
                    message={message}
                  />
                </Box>
              ))}
              {loading && <ChatLoader />}

              <Box ref={messagesEndRef} />
            </Flex>
          </Scrollbar>
        </Box>
      </Box>
      <Box
        borderTop="0.063rem solid"
        borderTopColor="shader.a.200"
        padding={4}
        position="absolute"
        width="full"
        left={0}
        bottom={0}
        bg="white"
      >
        <ChatInputs
          onSend={onSend}
          sx={{
            placeholder: 'Type Trainning Data',
          }}
        />
      </Box>
    </Flex> */
export default TrainingChatScreen;
