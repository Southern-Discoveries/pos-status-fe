import { useTypedSelector } from './useTypedSelector';

export const useChat = () => {
  const chat = useTypedSelector(state => state.chat);

  return { ...chat };
};
