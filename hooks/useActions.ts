import { bindActionCreators } from '@reduxjs/toolkit';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';

import * as chatAction from '@/redux/chat/chat-action';
import * as userActions from '@/redux/user/user-action';
const rootActions = {
  ...userActions,
  ...chatAction,
};

export const useActions = () => {
  const dispatch = useDispatch();

  return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch]);
};
