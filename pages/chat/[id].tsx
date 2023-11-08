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
  useBreakpointValue,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import DefaultBG from '@/components/Logo/DefaultBG';
import Scrollbar from '@/components/Scrollbar';
import { useActions } from '@/hooks/useActions';
import { useChat } from '@/hooks/useChat';
import ChatScreen from '@/layouts/ChatScreen';
import Header from '@/layouts/Header';
import ActivityTopic from '@/layouts/RightSidebar/ActivityTopic';
import TrainingChatScreen from '@/layouts/RightSidebar/TrainingChat';
import Sidebar from '@/layouts/Sidebar';
import { setCurrentChatID } from '@/redux/chat/chat-slice';
import imageService from '@/redux/images/image-service';
import { getAccessToken } from '@/redux/user/user-helper';
import { colors } from '@/theme/theme';
import { Message, PostOption, EngineConfig } from '@/types';

export default function ChatDetail() {
  const toast = useToast();
  const [chatMessages, setChatMessages] = useState<Message[]>([]);

  const [chatLoading, setChatLoading] = useState<boolean>(false);
  const [trainingLoading, setTrainingLoading] = useState<boolean>(false);

  const [trainingMessages, setTrainingMessages] = useState<Message[]>([]);

  const messageFirstRef = useRef<HTMLDivElement>(null);
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

  const router = useRouter();

  const { getChatMessage } = useActions();

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
  } = useDisclosure({ defaultIsOpen: true });
  const [hidden, setHidden] = useState(!isOpenSetting);

  const { currentChatID } = useChat();

  const handleCreateImage = async (msg: string) => {
    setChatLoading(true);
    let htmlMsg = '```html';
    try {
      if (currentChatID) {
        const response = await imageService.generateImage(
          currentChatID,
          JSON.stringify({
            post: postConfig,
            content: msg.slice(0, 999),
            data: trainingMessages.map(element => element.content),
          })
        );

        if (response) {
          for (const img of response.data.images) {
            const res = await imageService.getImage(img.raw);
            await imageService.getImage(img.text);
            htmlMsg += `<img src="${process.env.NEXT_PUBLIC_AI_SERVICE_URL}/image/${img.raw}"/>
            <img src="${process.env.NEXT_PUBLIC_AI_SERVICE_URL}/image/${img.text_banner}"/>
            `;
          }
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
    if (
      !postConfig ||
      !postConfig.audiences.length ||
      !postConfig?.targets.length ||
      postConfig?.platform == null ||
      postConfig?.task === null ||
      !engineConfig?.engine ||
      !engineConfig?.model
    ) {
      toast({
        title: 'Choose Option',
        description: "We've you choose all option in sidebar",
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
      return;
    }
    const updatedMessages = [...chatMessages, message];
    setChatMessages(updatedMessages);
    setChatLoading(true);

    try {
      let request_body = {
        content: message.content,
        post: postConfig,
        engine: engineConfig,
        data: trainingMessages.map(element => element.content),
      };
      const accessToken = getAccessToken();
      const response = await fetch(`/api/stream/chat/${currentChatID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
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
    } catch (error) {
      toast({
        title: 'Choose Option',
        description: "We've you choose all option in sidebar",
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const dispatch = useDispatch();
  const { id } = router.query;

  useEffect(() => {
    if (typeof id == 'string') {
      const fetchMessage = async () => {
        const request_body = {
          chat_id: id,
          filter: {
            page: 1,
            limit: 10,
            order_by: 'updated_at',
          },
        };

        const res: any = await getChatMessage(request_body);
        const message = res.payload;

        dispatch(setCurrentChatID(id));
        const filteredMessages = message.data.map(
          ({ role, content, images }: any) => ({
            role,
            content:
              content === null
                ? images.length
                  ? '```html' +
                    `<img src="${
                      process.env.NEXT_PUBLIC_AI_SERVICE_URL ||
                      'http://127.0.0.1:8000'
                    }/image/${images[0].raw}"/>
            <img src="${
              process.env.NEXT_PUBLIC_AI_SERVICE_URL || 'http://127.0.0.1:8000'
            }/image/${images[0].text_banner}"/>
            `
                  : ''
                : content,
          })
        );
        setChatMessages(filteredMessages);
        return res;
      };
      fetchMessage();
    }
  }, [id]);
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
      <Flex
        flexDirection="column"
        gap={0}
        /*  onContextMenu={e => {
          e.preventDefault(); // prevent the default behaviour when right clicked
          console.log('Right Click');
        }} */
      >
        <Header
          isOpenSetting={isOpenSetting}
          onToggleSetting={onToggleSetting}
        />

        <Flex width="full" height="calc(100vh - 65px)">
          <Box
            display={{ md: 'block', base: 'none' }}
            bg="white"
            borderRight="0.063rem solid"
            borderRightColor="shader.a.200"
            overscrollBehavior="contain"
            minW="400px"
          >
            <Scrollbar overflowY="auto" overflow="hidden">
              <Box padding={4}>
                <Sidebar
                  setEngineConfig={setEngineConfig}
                  setPostConfig={setPostConfig}
                />
              </Box>
            </Scrollbar>
          </Box>
          <DefaultBG>
            <ChatScreen
              onCreateImage={handleCreateImage}
              messages={chatMessages}
              loading={chatLoading}
              onSend={handleChatSend}
              onReset={handleChatReset}
            />
          </DefaultBG>

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
                          /*    h="calc(100vh - 65px)" */
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
      </Flex>
    </>
  );
}
