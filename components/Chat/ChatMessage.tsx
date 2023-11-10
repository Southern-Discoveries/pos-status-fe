/* eslint-disable no-unused-vars */
import { Box, Flex, HStack, StackProps, Text } from '@chakra-ui/react';
import React from 'react';

import { Message } from '@/types';
interface Props {
  message: Message;
  sx?: StackProps;
}
const ChatMessage = ({ message, sx }: Props) => {
  let content = message.content;
  const isHtml = content.includes('```html');
  content = isHtml ? content.replace('```html', '') : content;
  return (
    <>
      <Flex
        position="relative"
        flexDirection="column"
        /*  alignItems={message.role === 'assistant' ? 'flex-start' : 'flex-end'} */
      >
        {message.role === 'assistant' ? (
          <>
            <Box position="relative">
              <HStack
                overflowWrap="anywhere"
                borderRadius="xl"
                paddingX={2}
                py={3}
                whiteSpace="pre-wrap"
                alignItems="center"
                bg="white"
                gap={0}
                color="shader.a.800"
                border="0.063rem solid"
                borderColor="shader.a.200"
                backdropBlur="blur(2.5px)"
                mb={2}
                position="relative"
                {...sx}
              >
                <Text> {!isHtml && content}</Text>
                {isHtml && (
                  <Box dangerouslySetInnerHTML={{ __html: content }}></Box>
                )}
              </HStack>
            </Box>
          </>
        ) : (
          <>
            <HStack
              overflowWrap="anywhere"
              borderRadius="xl"
              paddingX={2}
              py={3}
              gap={0}
              whiteSpace="pre-wrap"
              alignItems="center"
              bg="primary.a.500"
              color="white"
              {...sx}
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
