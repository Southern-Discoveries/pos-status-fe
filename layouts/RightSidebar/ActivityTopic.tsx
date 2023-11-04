import { Box, Button } from '@chakra-ui/react';
import React from 'react';

const ActivityTopic = () => {
  /*  const user = getUserFromStorage();
  const [listChats, setListChat] = useState<Array<IChatData> | null>(null);
 */
  /*  useEffect(() => {
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
  }, []); */
  return (
    <>
      <Box padding={4}>
        <Button variant="primary" width="full">
          New Topic
        </Button>
        {/* {listChats &&
          listChats.map(list => (
            <>
              <Box key={list.id}>
                <Text>{list.title}</Text>
             
              </Box>
            </>
          ))} */}
      </Box>
    </>
  );
};

export default ActivityTopic;
