import { createContext, useState, PropsWithChildren, useContext } from 'react';

interface ChatContextType {
  options: any;
  setOptions: (options: any) => void;
  chatMessage: string;
  setChatMessage: (message: string) => void;
}

const initialOptions = {}; // Initial state for options
const initialChatMessage = 'aaa'; // Initial state for chatMessage

export const ChatContext = createContext<ChatContextType>({
  options: initialOptions,
  setOptions: () => {},
  chatMessage: initialChatMessage,
  setChatMessage: () => {},
});

export function ChatProvider({ children }: PropsWithChildren) {
  const [options, setOptions] = useState(initialOptions);
  const [chatMessage, setChatMessage] = useState(initialChatMessage);
  console.log('Current das', chatMessage);
  return (
    <ChatContext.Provider
      value={{ options, setOptions, chatMessage, setChatMessage }}
    >
      {children}
    </ChatContext.Provider>
  );
}
