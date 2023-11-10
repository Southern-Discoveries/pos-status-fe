/* eslint-disable no-unused-vars */
import { Box, Button, Flex, useDisclosure, Text } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import { ChatScreenProps } from '../ChatScreen';

import BrainDetail from './BrainDetail';

import { useTrain } from '@/hooks/userTrain';
import { IBrainData } from '@/redux/train/train-interface';
import trainService from '@/redux/train/train-service';
import { colors } from '@/theme/theme';
import { convertHex } from '@/utils';

const TrainingChatScreen = ({ messages }: ChatScreenProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  const { onOpen, onClose, isOpen } = useDisclosure();
  const [listTrain, setListTrain] = useState<IBrainData[]>();

  const { currentBrainID, isBrainLoading } = useTrain();
  useEffect(() => {
    const fetchList = async () => {
      const response = await trainService.getUserBrains({
        page: 1,
        limit: 10,
        order_by: '-updated_at',
      });
      if (response.status === 200) {
        setListTrain(response.data.data);
        console.log('List', listTrain);
      }
    };
    fetchList();
  }, [currentBrainID, isBrainLoading]);

  return (
    <>
      <Flex height="full" flexDirection="column" position="relative">
        <Flex flexDirection="column" gap={2} padding={4}>
          {!isOpen && (
            <Button variant="primary" py={3} onClick={onOpen}>
              + Knowledger Data
            </Button>
          )}
          {listTrain &&
            listTrain.map(list => (
              <>
                <Box position="relative" role="group" key={list.id}>
                  <Box
                    role="group"
                    _hover={{
                      borderColor: 'primary.a.400',
                      bg: convertHex(colors.primary.a[500], 0.05),
                    }}
                    onClick={() => {}}
                    width="full"
                    padding={3}
                    cursor="pointer"
                    borderRadius="xl"
                    border="0.063rem solid"
                    borderColor="shader.a.200"
                  >
                    <Text
                      _groupHover={{
                        color: 'shader.a.900',
                        fontWeight: 'bold',
                      }}
                      whiteSpace="nowrap"
                      textOverflow="ellipsis"
                      maxWidth="200"
                      overflow="hidden"
                    >
                      {list.title}
                    </Text>
                  </Box>
                  <Box
                    zIndex="popover"
                    top={0}
                    right={0}
                    display="none"
                    _groupHover={{
                      display: 'block',
                    }}
                    position="absolute"
                    onClick={e => {
                      e.preventDefault();
                    }}
                  >
                    Dot
                  </Box>
                </Box>
              </>
            ))}
        </Flex>

        {isOpen && (
          <>
            <Box
              position="absolute"
              height="full"
              width="full"
              bg="white"
              zIndex="popover"
            >
              <BrainDetail onClose={onClose} />
            </Box>
          </>
        )}
      </Flex>
    </>
  );
};

export default TrainingChatScreen;
