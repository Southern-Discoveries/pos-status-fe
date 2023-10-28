/* eslint-disable no-unused-vars */
import { IconButton, Input, InputGroup } from '@chakra-ui/react';
import { KeyboardEvent, useEffect, useRef, useState } from 'react';

import SendIcon from '@/public/assets/icons/line/send.svg';
import { Message } from '@/types';
interface Props {
  onSend: (message: Message) => void;
}

const ChatInputs = ({ onSend }: Props) => {
  const [content, setContent] = useState<string>();

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length > 4000) {
      alert('Message limit is 4000 characters');
      return;
    }

    setContent(value);
  };

  const handleSend = () => {
    if (!content) {
      alert('Please enter a message');
      return;
    }
    onSend({ role: 'user', content });
    setContent('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    if (textareaRef && textareaRef.current) {
      textareaRef.current.style.height = 'inherit';
      textareaRef.current.style.height = `${textareaRef.current?.scrollHeight}px`;
    }
  }, [content]);

  return (
    <>
      <InputGroup position="relative">
        <Input placeholder="Type SomeThing" />
        <IconButton
          aria-label={''}
          position="absolute"
          right={2}
          bottom={2}
          variant="send_btn"
          icon={<SendIcon />}
        />
      </InputGroup>
    </>
  );
};

export default ChatInputs;
