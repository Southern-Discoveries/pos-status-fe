/* eslint-disable no-unused-vars */
import { HStack, IconButton, Textarea, TextareaProps } from '@chakra-ui/react';
import { KeyboardEvent, useEffect, useRef, useState } from 'react';

import SendIcon from '@/public/assets/icons/line/send.svg';
import { Message } from '@/types';
interface Props {
  onSend: (message: Message) => void;
  sx?: TextareaProps;
}

const ChatInput = ({ onSend, sx }: Props) => {
  const [messageContent, setMessageContent] = useState<string>('');

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length > 4000) {
      alert('Message limit is 4000 characters');
      return;
    }

    setMessageContent(value);
  };

  const handleSend = () => {
    if (!messageContent) {
      alert('Please enter a message');
      return;
    }
    onSend({ role: 'user', content: messageContent });
    setMessageContent('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    if (textareaRef && textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current?.scrollHeight}px`;
    }
  }, [messageContent]);
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '3.5rem'; // Adjust this value as needed
    }
  }, []);
  return (
    <>
      <HStack position="relative" flexGrow={1} overflow="hidden">
        <Textarea
          value={messageContent}
          ref={textareaRef}
          variant="chat_input"
          height="56px"
          rows={1}
          placeholder="Write post's content - Send the message"
          {...sx}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <IconButton
          onClick={() => handleSend()}
          zIndex={6}
          aria-label={''}
          position="absolute"
          right={2}
          bottom={2}
          variant="primary"
          icon={<SendIcon />}
        />
      </HStack>
    </>
  );
};

export default ChatInput;
