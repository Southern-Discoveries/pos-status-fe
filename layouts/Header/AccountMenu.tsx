import {
  Menu,
  MenuButton,
  MenuItem,
  Text,
  MenuList,
  Icon,
  useColorMode,
  Flex,
  Switch,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';

import { useActions } from '@/hooks/useActions';
import GlobalIcon from '@/public/assets/icons/line/global.svg';
import LogoutIcon from '@/public/assets/icons/line/log-out.svg';
import SunIcon from '@/public/assets/icons/line/sun.svg';
import UserIcon from '@/public/assets/icons/line/user-2.svg';
export const AccountMenu = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { logout } = useActions();
  const router = useRouter();
  return (
    <>
      <Menu closeOnSelect={false} direction="ltr" variant="account">
        <MenuButton
          padding={2.5}
          borderRadius="full"
          height={'40px'}
          width="40px"
          border="2px solid"
          borderColor="primary.a.500"
        >
          <Icon as={UserIcon} />
        </MenuButton>
        <MenuList>
          <MenuItem>
            <Icon as={UserIcon} />
            <Text>Profile</Text>
          </MenuItem>
          <MenuItem>
            <Flex alignItems="center" gap={3}>
              <Icon as={GlobalIcon} />
              <Text>Language</Text>
            </Flex>
          </MenuItem>
          <MenuItem justifyContent="space-between">
            <Flex alignItems="center" gap={3}>
              <Icon as={SunIcon} />
              <Text>{colorMode == 'light' ? 'Light Mode' : 'Dark mode'}</Text>
            </Flex>
            <Switch
              variant="toggle"
              onChange={toggleColorMode}
              isChecked={colorMode === 'light'}
            />
          </MenuItem>
          <MenuItem
            onClick={async () => {
              router.push('/auth/signin');
              logout();
            }}
          >
            <Icon color="primary.a.500" as={LogoutIcon} />
            <Text>Log out</Text>
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};
