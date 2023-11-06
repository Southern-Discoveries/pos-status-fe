import React, { useEffect, useState } from 'react';

import { useActions } from '@/hooks/useActions';
import { useChat } from '@/hooks/useChat';
import DefaultLayout from '@/layouts';

const ChatDetail = () => {
  const { currentChatID } = useChat();
  const { getChatMessage } = useActions();
  const [message, setMessage] = useState([]);
  useEffect(() => {
    const fetchMessage = async () => {
      const res: any = await getChatMessage(currentChatID);
      setMessage(res.payload);
      return res;
    };
    fetchMessage();
  }, [currentChatID]);
  console.log('Current Message', message);
  return (
    <>
      <DefaultLayout></DefaultLayout>
    </>
  );
};

export default ChatDetail;
