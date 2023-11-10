/* eslint-disable no-unused-vars */
import { Box, Flex } from '@chakra-ui/react';
import React, { useEffect, useRef } from 'react';

import WellCome from './WellCome';

import ChatInput from '@/components/Chat/ChatInput';
import ChatLoader from '@/components/Chat/ChatLoader';
import ChatMessage from '@/components/Chat/ChatMessage';
import Scrollbar from '@/components/Scrollbar';
import { Message } from '@/types';
export interface ChatScreenProps {
  messages: Message[];
  loading: boolean;
  onSend: (message: Message) => void;
  onCreateImage: (msg: string) => void;
}
const ChatScreen = ({
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
      <Box position="relative" height="calc(100vh - 65px)" width="full">
        <Scrollbar>
          {messages.length ? (
            <>
              <Box padding={6} py={8} mb="6rem">
                <Flex flexDirection="column" gap={4}>
                  {messages.map((message, index) => (
                    <Box key={index} role="group" position="relative">
                      <ChatMessage
                        onCreateImage={onCreateImage}
                        message={message}
                        sx={{
                          maxWidth: { md: '67%', base: 'full' },
                        }}
                      />
                      {/*  <Box
                        display="none"
                        _groupHover={{
                          display: 'block',
                        }}
                        bg="red"
                        top={0}
                        right="28%"
                        position="absolute"
                      >
                        DOT
                      </Box> */}
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
            <ChatInput onSend={onSend} isLoading={loading} />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ChatScreen;
