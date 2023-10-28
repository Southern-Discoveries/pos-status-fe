/* eslint-disable no-unused-vars */
import { Box } from '@chakra-ui/react';
import React from 'react';

import ChatInputs from '@/components/Chats/ChatInputs';
import { Message } from '@/types';
interface Props {
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
}: Props) => {
  return (
    <>
      <Box>
        <Box position="absolute" bottom={10} width="inherit">
          <ChatInputs onSend={onSend} />
        </Box>
      </Box>
    </>
  );
};

export default ChatScreen;
