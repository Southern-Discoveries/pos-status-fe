import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import DotMenuActivity from '@/components/Menu/DotMenuActivity';
import { useChat } from '@/hooks/useChat';
import { IChatData } from '@/redux/chat/chat-interface';
import chatService from '@/redux/chat/chat-service';
import { setCurrentChatID } from '@/redux/chat/chat-slice';
import { colors } from '@/theme/theme';
import { convertHex } from '@/utils';
const ActivityTopic = () => {
  const [listChats, setListChat] = useState<Array<IChatData> | null>(null);
  const { currentChatID, isChatLoading } = useChat();
  useEffect(() => {
    const fetchList = async () => {
      const response = await chatService.getOwnChats({
        page: 1,
        limit: 10,
        order_by: '-updated_at',
      });

      if (response.status === 200) {
        setListChat(response.data.data);
      }
    };
    fetchList();
  }, [currentChatID, isChatLoading]);
  const router = useRouter();
  const dispatch = useDispatch();
  return (
    <>
      <Box padding={4}>
        <Flex flexDirection="column" gap={3}>
          <Button
            variant="primary"
            width="full"
            onClick={() => {
              dispatch(setCurrentChatID(null));
              router.push(`/`);
            }}
          >
            New Topic
          </Button>
          {listChats &&
            listChats.map(list => (
              <>
                <Box position="relative" role="group" key={list.id}>
                  <Box
                    _hover={{
                      border: '0.125rem solid',
                      borderColor: 'primary.a.500',
                    }}
                    onClick={() => {
                      dispatch(setCurrentChatID(list.id));
                      router.push(`/chat/${list.id}`);
                    }}
                    width="full"
                    bg={
                      currentChatID === list.id
                        ? convertHex(colors.primary.a[500], 0.05)
                        : undefined
                    }
                    padding={3}
                    cursor="pointer"
                    borderRadius="xl"
                    border={
                      currentChatID === list.id
                        ? '0.125rem solid'
                        : '0.063rem solid'
                    }
                    borderColor={
                      currentChatID === list.id
                        ? 'primary.a.500'
                        : 'shader.a.200'
                    }
                  >
                    <Text
                      whiteSpace="nowrap"
                      textOverflow="ellipsis"
                      maxWidth="200"
                      overflow="hidden"
                      color={
                        currentChatID == list.id
                          ? 'shader.a.900'
                          : 'shader.a.600'
                      }
                    >
                      {list.title}
                    </Text>
                  </Box>
                  <Box
                    zIndex="popover"
                    top={'20%'}
                    right={2}
                    display="none"
                    _groupHover={{
                      display: 'block',
                    }}
                    position="absolute"
                    onClick={e => {
                      e.preventDefault();
                    }}
                  >
                    <DotMenuActivity chat_id={list.id} />
                  </Box>
                </Box>
              </>
            ))}
        </Flex>
      </Box>
    </>
  );
};

export default ActivityTopic;
