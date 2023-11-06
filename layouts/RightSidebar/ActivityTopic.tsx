import { Box, Button, Flex, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

import { useChat } from '@/hooks/useChat';
import { IChatData } from '@/redux/chat/chat-interface';
import chatService from '@/redux/chat/chat-service';

const ActivityTopic = () => {
  const [listChats, setListChat] = useState<Array<IChatData> | null>(null);

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
  }, []);
  const { currentChatID } = useChat();
  return (
    <>
      <Box padding={4}>
        <Flex flexDirection="column" gap={3}>
          <Button variant="primary" width="full">
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
