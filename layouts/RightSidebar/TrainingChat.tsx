/* eslint-disable no-unused-vars */
import { Box, Button, Flex, useDisclosure } from '@chakra-ui/react';
import React, { useEffect, useRef } from 'react';

import { ChatScreenProps } from '../ChatScreen';

import BrainDetail from './BrainDetail';

import Scrollbar from '@/components/Scrollbar';

const TrainingChatScreen = ({ messages }: ChatScreenProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  const { onOpen, onClose, isOpen } = useDisclosure();
  return (
    <>
      <Flex
        flexDirection="column"
        height="full"
        position="relative"
        padding={4}
      >
        {!isOpen && (
          <Button variant="primary" py={3} onClick={onOpen}>
            + Knowledger Data
          </Button>
        )}
        {isOpen && (
          <>
            <BrainDetail onClose={onClose} />
          </>
        )}
      </Flex>
    </>
  );
};

export default TrainingChatScreen;
