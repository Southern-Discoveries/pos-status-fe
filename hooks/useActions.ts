import { bindActionCreators } from '@reduxjs/toolkit';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';

import * as chatAction from '@/redux/chat/chat-action';
import * as trainAction from '@/redux/train/train-action';
import * as userActions from '@/redux/user/user-action';
const rootActions = {
  ...userActions,
  ...chatAction,
  ...trainAction,
};

export const useActions = () => {
  const dispatch = useDispatch();

  return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch]);
};
