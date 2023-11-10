import { Button, Flex } from '@chakra-ui/react';
import React from 'react';

import EyeIcon from '@/public/assets/icons/line/eye.svg';
import ImageIcon from '@/public/assets/icons/line/image.svg';
import RefreshIcon from '@/public/assets/icons/line/refresh.svg';
interface IProps {
  lastMessage: string;
  isLoading: boolean;
  // eslint-disable-next-line no-unused-vars
  onCreateImage?: (msg: string) => void;
}
const ChatControl = ({ lastMessage, onCreateImage, isLoading }: IProps) => {
  return (
    <>
      {!isLoading && (
        <>
          {lastMessage.includes('```html') ? (
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
                leftIcon={<EyeIcon />}
                color="shader.a.900"
              >
                Post Review
              </Button>
            </Flex>
          ) : (
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
                  onCreateImage && onCreateImage(lastMessage);
                }}
                color="shader.a.900"
              >
                Generate Image
              </Button>
            </Flex>
          )}
        </>
      )}
    </>
  );
};

export default ChatControl;
