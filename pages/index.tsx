/* eslint-disable no-unused-vars */
import { Box, Collapse, Flex, useDisclosure } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';

import ChatScreen from '@/layouts/Chat';
import Header from '@/layouts/Header';
import RightSetting from '@/layouts/RightSidebar/RightSetting';
import Sidebar from '@/layouts/Sidebar';
import { Message, PostOption, EngineConfig } from '@/types';

export default function Update() {
  const [chatMessages, setChatMessages] = useState<Message[]>([]);

  const [chatLoading, setChatLoading] = useState<boolean>(false);
  const [trainingLoading, setTrainingLoading] = useState<boolean>(false);

  const [trainingMessages, setTrainingMessages] = useState<Message[]>([]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [postConfig, setPostConfig] = useState<PostOption>();
  const [engineConfig, setEngineConfig] = useState<EngineConfig>();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleTrainingSend = async (message: Message) => {
    const updatedMessages = [...trainingMessages, message];

    setTrainingMessages(updatedMessages);
  };

  const handleCreateImage = async (msg: string) => {
    setChatLoading(true);
    let htmlMsg = '```html';

    try {
      const response = await fetch('/api/ai/image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: msg.slice(0, 999),
        }),
      });
      const res = await response.json();
      if (res && res.data) {
        for (const img of res.data) {
          htmlMsg += `<img src="${img.url.replace(
            'https://oaidalleapiprodscus.blob.core.windows.net/',
            '/api/oaidalleapiprodscus/'
          )}"/>`;

          /*   console.log(htmlMsg); */
        }
      }
    } catch (error) {
    } finally {
      setChatLoading(false);
    }
    setChatMessages(chatMessages => [
      ...chatMessages,
      {
        role: 'assistant',
        content: htmlMsg,
      },
    ]);
  };

  const handleChatSend = async (message: Message) => {
    const updatedMessages = [...chatMessages, message];
    setChatMessages(updatedMessages);
    setChatLoading(true);

    let request_body = {
      content: message.content,
      post: postConfig,
      engine: engineConfig,
      data: trainingMessages.map(element => element.content),
    };

    /*    console.log('request_body: ', request_body); */

    const response = await fetch('/api/stream/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request_body),
    });

    if (!response.ok) {
      setChatLoading(false);
      throw new Error(response.statusText);
    }

    const data = response.body;

    if (!data) {
      return;
    }

    setChatLoading(false);

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;
    let isFirst = true;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);

      if (isFirst) {
        isFirst = false;
        setChatMessages(chatMessages => [
          ...chatMessages,
          {
            role: 'assistant',
            content: chunkValue,
          },
        ]);
      } else {
        setChatMessages(chatMessages => {
          const lastMessage = chatMessages[chatMessages.length - 1];
          const updatedMessage = {
            ...lastMessage,
            content: lastMessage.content + chunkValue,
          };
          return [...chatMessages.slice(0, -1), updatedMessage];
        });
      }
    }
  };

  const handleTrainingReset = () => {
    setTrainingMessages([]);
  };

  const handleChatReset = () => {
    setChatMessages([]);
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  useEffect(() => {
    setChatMessages([]);
  }, []);
  const {
    isOpen: isOpenSetting,
    onToggle: onToggleSetting,
    getDisclosureProps,
  } = useDisclosure();
  const [hidden, setHidden] = useState(!isOpenSetting);
  return (
    <>
      <Head>
        <title>Mediator - Grindy Marketing System</title>
        <meta
          name="description"
          content="A simple chatbot starter kit for OpenAI's chat model using Next.js, TypeScript, and Tailwind CSS."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header isOpenSetting={isOpenSetting} onToggleSetting={onToggleSetting} />

      <Flex width="full">
        <Sidebar />
        <Box
          minH="90vh"
          height="full"
          /*   bg="shader.a.50" */
          backgroundImage={`url(assets/frame/BG.svg)`}
          backgroundSize="cover"
          width="full"
          backgroundRepeat="no-repeat"
          backgroundPosition="center"
        >
          <Box margin={6} height="90vh">
            <ChatScreen
              onCreateImage={handleCreateImage}
              name={'Training'}
              messages={trainingMessages}
              loading={trainingLoading}
              onSend={handleTrainingSend}
              onReset={handleTrainingReset}
            />
          </Box>
        </Box>
        <motion.div
          {...getDisclosureProps()}
          hidden={hidden}
          initial={false}
          onAnimationStart={() => setHidden(false)}
          onAnimationComplete={() => setHidden(!isOpenSetting)}
          animate={{ width: isOpenSetting ? 500 : 0 }}
        >
          <RightSetting />
        </motion.div>
      </Flex>
    </>
  );
}
