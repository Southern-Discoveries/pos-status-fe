/* eslint-disable no-unused-vars */
import { Box, Button, Flex, HStack, StackProps, Text } from '@chakra-ui/react';
import React from 'react';

import ImageIcon from '@/public/assets/icons/line/image.svg';
import RefreshIcon from '@/public/assets/icons/line/refresh.svg';
import { Message } from '@/types';
interface Props {
  message: Message;
  onCreateImage?: (msg: string) => void;
  sx?: StackProps;
}
const ChatMessage = ({ message, onCreateImage, sx }: Props) => {
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

              {!isHtml && (
                <Flex gap={2}>
                  <Button variant="primary" leftIcon={<RefreshIcon />}>
                    Retry
                  </Button>
                  <Button
                    px={3}
                    py={2}
                    bg="white"
                    borderRadius="24px"
                    border="0.063rem solid"
                    borderColor="shader.a.300"
                    leftIcon={<ImageIcon />}
                    onClick={() => {
                      onCreateImage && onCreateImage(message.content);
                    }}
                    color="shader.a.900"
                  >
                    Generate Image
                  </Button>
                </Flex>
              )}
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
