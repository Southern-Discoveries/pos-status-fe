import {
  HStack,
  Icon,
  IconButton,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch } from 'react-redux';

import { useActions } from '@/hooks/useActions';
import { useChat } from '@/hooks/useChat';
import DeleteIcon from '@/public/assets/icons/line/delete.svg';
import DotIcon from '@/public/assets/icons/line/dot.svg';
import { setCurrentChatID } from '@/redux/chat/chat-slice';

// Dot Menu Activitys
interface IProps {
  chat_id: string;
}
const DotMenuActivity = ({ chat_id }: IProps) => {
  const { deleteChat } = useActions();
  const router = useRouter();
  const { currentChatID } = useChat();
  const dispatch = useDispatch();
  return (
    <>
      <Popover placement="left-start">
        <PopoverTrigger>
          <IconButton
            variant="unstyled"
            padding={0}
            paddingInline={0}
            h={6}
            minW={6}
            display="flex"
            alignItems="center"
            icon={<Icon as={DotIcon} />}
            position="relative"
            bg="shader.a.300"
            _hover={{
              opacity: 0.7,
            }}
            color="white"
            aria-label=""
          />
        </PopoverTrigger>
        <PopoverContent padding={3} width="fit-content">
          <HStack
            color="secondary.red"
            cursor="pointer"
            fontWeight="bold"
            gap={2}
            onClick={async () => {
              await deleteChat(chat_id);
              if (currentChatID == chat_id) {
                dispatch(setCurrentChatID(null));
                router.push('/chat');
              }
            }}
          >
            <Icon as={DeleteIcon} height={5} width={5} />
            <Text>Delete</Text>
          </HStack>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default DotMenuActivity;
