/* eslint-disable no-unused-vars */
import { Box, Flex } from '@chakra-ui/react';
import React, { useEffect, useRef } from 'react';

import WellCome from './WellCome';

import ChatInputs from '@/components/Chat/ChatInput';
import ChatLoader from '@/components/Chat/ChatLoader';
import ChatMessage from '@/components/Chat/ChatMessage';
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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <>
      <Box position="relative" height="full" width="full">
        <Scrollbar>
          {messages.length ? (
            <>
              <Box padding={6} py={8} pb="6rem">
                {/* <ChatReset onReset={onReset} /> */}
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
                {loading && <ChatLoader />}
                <Box ref={messagesEndRef} />
              </Box>
            </>
          ) : (
            <>
              <WellCome />
            </>
          )}
        </Scrollbar>
        <Box
          left={0}
          bottom={10}
          width="full"
          position="absolute"
          height="4rem"
        >
          <Box padding={4}>
            <ChatInputs onSend={onSend} />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ChatScreen;
