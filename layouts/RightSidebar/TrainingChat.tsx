/* eslint-disable no-unused-vars */
import { Box, Button, Flex } from '@chakra-ui/react';
import React, { useEffect, useRef } from 'react';

import { ChatScreenProps } from '../ChatScreen';

import Scrollbar from '@/components/Scrollbar';

const TrainingChatScreen = ({ messages }: ChatScreenProps) => {
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
      vi
    </>
  );
};

export default TrainingChatScreen;
