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

import { useActions } from '@/hooks/useActions';
import { useChat } from '@/hooks/useChat';
import DeleteIcon from '@/public/assets/icons/line/delete.svg';
import DotIcon from '@/public/assets/icons/line/dot.svg';

// Dot Menu Activitys
interface IProps {
  chat_id: string;
}
const DotMenuActivity = ({ chat_id }: IProps) => {
  const { deleteChat } = useActions();
  const router = useRouter();
  const { currentChatID } = useChat();
  return (
    <>
      <Popover placement="left-start">
        <PopoverTrigger>
          <IconButton
            height={10}
            width={10}
            variant="unstyled"
            icon={<Icon as={DotIcon} height={4} width={4} />}
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
