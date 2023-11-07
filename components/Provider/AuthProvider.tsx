import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { FC, PropsWithChildren, useEffect } from 'react';

import { useActions } from '@/hooks/useActions';
import { useAuth } from '@/hooks/useAuth';
import { EnumTokens, getAccessToken } from '@/redux/user/user-helper';

const AuthProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
  const { user } = useAuth();
  const { checkAuth, logout } = useActions();

  const { pathname } = useRouter();
  const router = useRouter();
  useEffect(() => {
    const accessToken = getAccessToken();
    /* console.log('Auth Check Access Token', accessToken); */
    if (accessToken) {
      checkAuth();
    }
  }, []);

  useEffect(() => {
    const refreshToken = Cookies.get(EnumTokens.REFRESHTOKEN);
    if (!refreshToken && user) {
      router.push('/auth/signin');
      logout();
    }
  }, [pathname]);

  return <>{children}</>;
};
export default AuthProvider;
