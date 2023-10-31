/* eslint-disable no-unused-vars */
import {
  Box,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  calc,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';

import Scrollbar from '@/components/Scrollbar';
import ChatScreen from '@/layouts/ChatScreen';
import Header from '@/layouts/Header';
import ActivityTopic from '@/layouts/RightSidebar/ActivityTopic';
import TrainingChatScreen from '@/layouts/RightSidebar/TrainingChat';
import Sidebar from '@/layouts/Sidebar';
import { colors } from '@/theme/theme';
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
  const isMobileScreen = useBreakpointValue({ base: true, md: false });
  const {
    isOpen: isOpenSetting,
    onToggle: onToggleSetting,
    onClose: onCloseSetting,
    getDisclosureProps,
  } = useDisclosure({ defaultIsOpen: isMobileScreen ? false : true });
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

      <Flex
        width="full"
        overflowX="hidden"
        maxH={{ md: 'calc(100vh - 4.063rem)', base: '100vh' }}
      >
        <Box
          display={{ md: 'block', base: 'none' }}
          bg="white"
          minWidth="21.875rem"
          borderRight="0.063rem solid"
          borderRightColor="shader.a.200"
          padding={4}
        >
          <Scrollbar overflowY="auto" overflow="hidden">
            <Sidebar
              setEngineConfig={setEngineConfig}
              setPostConfig={setPostConfig}
            />
          </Scrollbar>
        </Box>
        <Box
          maxH="calc(100vh - 4.063rem)"
          h="calc(100vh - 4.063rem)"
          backgroundImage={`url(assets/frame/BG.svg)`}
          backgroundSize="cover"
          width="full"
          flexGrow={1}
          backgroundRepeat="no-repeat"
          backgroundPosition="center"
        >
          <ChatScreen
            onCreateImage={handleCreateImage}
            messages={chatMessages}
            loading={chatLoading}
            onSend={handleChatSend}
            onReset={handleChatReset}
          />
        </Box>
        {isMobileScreen ? (
          <>
            <Drawer
              isOpen={isOpenSetting}
              onClose={onCloseSetting}
              placement="right"
            >
              <DrawerOverlay />
              <DrawerContent>
                <Tabs variant="right_sidebar">
                  <TabList height="54px">
                    <Tab>Trainning</Tab>
                    <Tab>Activity</Tab>
                  </TabList>
                  <TabPanels>
                    <TabPanel>
                      <Box
                        overflow="hidden"
                        height="full"
                        position="relative"
                        bg="white"
                        h="calc(100vh - 65px)"
                      >
                        <TrainingChatScreen
                          onCreateImage={handleCreateImage}
                          messages={trainingMessages}
                          loading={trainingLoading}
                          onSend={handleTrainingSend}
                          onReset={handleTrainingReset}
                        />
                      </Box>
                    </TabPanel>
                    <TabPanel padding={4}>
                      <ActivityTopic />
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </DrawerContent>
            </Drawer>
          </>
        ) : (
          <>
            <motion.div
              {...getDisclosureProps()}
              hidden={hidden}
              initial={false}
              transition={{ duration: 0.3 }}
              onAnimationStart={() => setHidden(false)}
              onAnimationComplete={() => setHidden(!isOpenSetting)}
              style={{
                borderLeft: '0.063rem solid',
                borderLeftColor: colors.shader.a[200],
              }}
              animate={{ width: isOpenSetting ? 500 : 0 }}
            >
              <Tabs variant="right_sidebar">
                <TabList height="54px">
                  <Tab>Trainning</Tab>
                  <Tab>Activity</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <TrainingChatScreen
                      onCreateImage={handleCreateImage}
                      messages={trainingMessages}
                      loading={trainingLoading}
                      onSend={handleTrainingSend}
                      onReset={handleTrainingReset}
                    />
                  </TabPanel>
                  <TabPanel>
                    <ActivityTopic />
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </motion.div>
          </>
        )}
      </Flex>
    </>
  );
}
