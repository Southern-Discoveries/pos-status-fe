import { Box, Button, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

import { IChatData } from '@/redux/chat/chat.interface';
import { instance } from '@/utils/helper/api/api-interupt';
import { getUserFromStorage } from '@/utils/helper/auth/auth-helper';

const ActivityTopic = () => {
  const user = getUserFromStorage();
  const [listChats, setListChat] = useState<Array<IChatData> | null>(null);

  useEffect(() => {
    const fetchList = async () => {
      const response = await instance<any>({
        method: 'GET',
        url: `chat/my-chat?page=1&size=10&order_by=-updated_at`,
      });
      if (response.status === 200) {
        setListChat(response.data.data);
      }
    };
    fetchList();
  }, []);
  return (
    <>
      <Box padding={4}>
        <Button variant="primary" width="full">
          New Topic
        </Button>
        {listChats &&
          listChats.map(list => (
            <>
              <Box key={list.id}>
                <Text>{list.title}</Text>
                {/*  <Text>{getTimeAgo(list.updated_at)}</Text> */}
              </Box>
            </>
          ))}
      </Box>
    </>
  );
};

export default ActivityTopic;
