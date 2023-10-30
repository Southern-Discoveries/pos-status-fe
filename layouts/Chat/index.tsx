/* eslint-disable no-unused-vars */
import { Box, Flex } from '@chakra-ui/react';
import React from 'react';

import ChatInputs from '@/components/Chats/ChatInputs';
import ChatLoader from '@/components/Chats/ChatLoader';
import ChatMessage from '@/components/Chats/ChatMessage';
import { ChatReset } from '@/components/Chats/ChatReset';
import Scrollbar from '@/components/Scrollbar';
import { Message } from '@/types';
export interface ChatScreenProps {
  messages: Message[];
  loading: boolean;
  onSend: (message: Message) => void;
  onReset: () => void;
  onCreateImage: (msg: string) => void;
}
const ChatScreen = ({
  messages,
  loading,
  onSend,
  onReset,
  onCreateImage,
}: ChatScreenProps) => {
  return (
    <>
      <Box position="relative" height="full" width="full">
        <Scrollbar>
          <Box padding={6} py={8}>
            {loading && <ChatLoader />}
            <ChatReset onReset={onReset} />
            <Flex flexDirection="column" gap={4}>
              {messages.map((message, index) => (
                <Box key={index}>
                  <ChatMessage
                    onCreateImage={onCreateImage}
                    message={message}
                  />
                </Box>
              ))}
            </Flex>
          </Box>
        </Scrollbar>

        <Box left={0} bottom={2} width="full" position="absolute">
          <Box padding={4}>
            <ChatInputs onSend={onSend} />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ChatScreen;
