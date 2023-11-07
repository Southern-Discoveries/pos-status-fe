import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { useChat } from '@/hooks/useChat';
import { IChatData } from '@/redux/chat/chat-interface';
import chatService from '@/redux/chat/chat-service';
import { setCurrentChatID } from '@/redux/chat/chat-slice';

const ActivityTopic = () => {
  const [listChats, setListChat] = useState<Array<IChatData> | null>(null);
  const { currentChatID } = useChat();
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
  }, [currentChatID]);
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
                <Box
                  cursor="pointer"
                  _hover={{
                    borderColor: 'primary.a.400',
                  }}
                  onClick={() => {
                    dispatch(setCurrentChatID(list.id));
                    router.push(`/chat/${list.id}`);
                  }}
                  key={list.id}
                  width="full"
                  bg={currentChatID === list.id ? 'primary.a.300' : undefined}
                  padding={3}
                  borderRadius="xl"
                  border="0.063rem solid"
                  borderColor="shader.a.200"
                >
                  <Text>{list.title}</Text>
                </Box>
              </>
            ))}
        </Flex>
      </Box>
    </>
  );
};

export default ActivityTopic;
