/* eslint-disable no-unused-vars */
import { Box, Flex, HStack, Text } from '@chakra-ui/react';
import React from 'react';

import { Message } from '@/types';
interface Props {
  message: Message;
  onCreateImage?: (msg: string) => void;
}
const ChatMessage = ({ message, onCreateImage }: Props) => {
  let content = message.content;
  const isHtml = content.includes('```html');
  content = isHtml ? content.replace('```html', '') : content;
  return (
    <>
      <Flex
        position="relative"
        flexDirection="column"
        alignItems={message.role === 'assistant' ? 'flex-start' : 'flex-end'}
      >
        {message.role === 'assistant' ? (
          <>
            <HStack
              overflowWrap="anywhere"
              borderRadius="xl"
              paddingX={2}
              py={3}
              whiteSpace="pre-wrap"
              alignItems="center"
              maxW="67%"
              bg="white"
              color="shader.a.800"
              border="0.063rem solid"
              borderColor="shader.a.200"
              backdropBlur="blur(2.5px)"
            >
              <Text> {!isHtml && content}</Text>
              {isHtml && (
                <Box dangerouslySetInnerHTML={{ __html: content }}></Box>
              )}
            </HStack>
            {!isHtml && (
              <div
                onClick={() => {
                  onCreateImage && onCreateImage(message.content);
                }}
                className="flex items-center justify-center w-10 h-10 bg-gray-400 rounded-full text-white transition-opacity duration-300 opacity-0 group-hover:opacity-100 cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 19v2a2 2 0 002 2h2a2 2 0 002-2v-2m-6 0h0a2 2 0 002-2V9a2 2 0 00-2-2h0a2 2 0 00-2 2v8a2 2 0 002 2zm6 0h0a2 2 0 002-2V9a2 2 0 00-2-2h0a2 2 0 00-2 2v8a2 2 0 002 2zm0 0h0a2 2 0 002-2V9a2 2 0 00-2-2h0a2 2 0 00-2 2v8a2 2 0 002 2zm6 0h0a2 2 0 002-2V9a2 2 0 00-2-2h0a2 2 0 00-2 2v8a2 2 0 002 2zM5 8H4a2 2 0 00-2 2v2a2 2 0 002 2h1m8 0h3m-3 0H7m10 0a2 2 0 012-2V4a2 2 0 00-2-2H4a2 2 0 00-2 2v2a2 2 0 002 2h16z"
                  />
                </svg>
              </div>
            )}
          </>
        ) : (
          <>
            <HStack
              overflowWrap="anywhere"
              borderRadius="xl"
              paddingX={2}
              py={3}
              whiteSpace="pre-wrap"
              alignItems="center"
              maxW="67%"
              bg="primary.a.500"
              color="white"
            >
              <Text> {!isHtml && content}</Text>
              {isHtml && (
                <Box dangerouslySetInnerHTML={{ __html: content }}></Box>
              )}
            </HStack>
          </>
        )}
      </Flex>
    </>
  );
};

export default ChatMessage;
