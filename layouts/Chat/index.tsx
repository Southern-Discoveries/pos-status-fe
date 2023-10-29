/* eslint-disable no-unused-vars */
import { Box } from '@chakra-ui/react';
import React from 'react';

import ChatInputs from '@/components/Chats/ChatInputs';
import { Message } from '@/types';
export interface ChatScreenProps {
  name: String;
  messages: Message[];
  loading: boolean;
  onSend: (message: Message) => void;
  onReset: () => void;
  onCreateImage: (msg: string) => void;
}
const ChatScreen = ({
  name,
  messages,
  loading,
  onSend,
  onReset,
  onCreateImage,
}: ChatScreenProps) => {
  return (
    <>
      <Box position="relative" height="full">
        <Box left={0} bottom={0} width="full" position="absolute">
          <ChatInputs onSend={onSend} />
        </Box>
      </Box>
    </>
  );
};

export default ChatScreen;
