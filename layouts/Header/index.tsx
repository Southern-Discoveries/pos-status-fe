import { Box, Button, HStack, IconButton } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';

import LogoLong from '@/components/Logo/LogoLong';
import { useActions } from '@/hooks/useActions';
import BookIcon from '@/public/assets/icons/line/book.svg';
import { getUserFromStorage } from '@/utils/helper/auth/auth-helper';

interface IProps {
  isOpenSetting?: boolean;
  onToggleSetting?: () => void;
}
const Header = ({ isOpenSetting, onToggleSetting }: IProps) => {
  /*   const [user,setUser]=getUserFromStorage();
  useEffect(() => {
    user = getUserFromStorage();
  }, [user]); */
  /*   const { user, isLoading } = useAuth(); */
  const user = getUserFromStorage();
  const { logout } = useActions();
  const router = useRouter();
  return (
    <>
      <Box
        bg="white"
        as="header"
        height="65px"
        position="sticky"
        zIndex={11}
        top={0}
        left={0}
        right={0}
      >
        <HStack
          justifyContent="space-between"
          borderBottom="0.063rem solid"
          borderBottomColor="shader.a.200"
          width="full"
          px={6}
          py={3}
        >
          <LogoLong />
          <HStack>
            <IconButton
              variant="icon_btn"
              aria-label="Book Button"
              color={isOpenSetting ? 'primary.a.400' : 'red'}
              isActive={isOpenSetting}
              onClick={onToggleSetting}
              icon={<BookIcon />}
            />
            <Button
              onClick={() => {
                logout();
                router.push('/auth/signin');
              }}
            >
              Logout
            </Button>
            {user && (
              <>
                <Box color="red">{user.email}</Box>
              </>
            )}
          </HStack>
        </HStack>
      </Box>
    </>
  );
};

export default Header;
