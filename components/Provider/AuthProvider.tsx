import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { FC, PropsWithChildren, useEffect } from 'react';

import { useActions } from '@/hooks/useActions';
import { useAuth } from '@/hooks/useAuth';
import { EnumTokens, getAccessToken } from '@/utils/helper/auth/auth.helper';

const AuthProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
  const { user } = useAuth();

  const { checkAuth, logout } = useActions();

  const { pathname } = useRouter();

  useEffect(() => {
    const accessToken = getAccessToken();

    if (accessToken) {
      checkAuth();
    }
  }, []);

  useEffect(() => {
    const refreshToken = Cookies.get(EnumTokens.REFRESHTOKEN);
    if (!refreshToken && user) {
      logout();
    }
  }, [pathname]);

  return <>{children}</>;
};

export default AuthProvider;
