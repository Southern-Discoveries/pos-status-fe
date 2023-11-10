import { useTypedSelector } from './useTypedSelector';

export const useTrain = () => {
  const train = useTypedSelector(state => state.train);

  return { ...train };
};
