import {
  Box,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  HStack,
  Icon,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';
import { useDispatch } from 'react-redux';

import { AccountMenu } from '../../components/Menu/AccountMenu';

import LogoLong from '@/components/Logo/LogoLong';
import BookIcon from '@/public/assets/icons/line/book.svg';
import MenuIcon from '@/public/assets/icons/line/menu.svg';
import { setCurrentChatID } from '@/redux/chat/chat-slice';
interface IProps {
  isOpenSetting?: boolean;
  onToggleSetting?: () => void;
}
const Header = ({ isOpenSetting, onToggleSetting }: IProps) => {
  const dispatch = useDispatch();
  const { isOpen, onToggle, onClose } = useDisclosure();
  return (
    <>
      <Box
        bg="white"
        as="header"
        height="65px"
        position="sticky"
        zIndex="popover"
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
          <HStack>
            <Link
              href="/chat"
              onClick={() => {
                dispatch(setCurrentChatID(null));
              }}
            >
              <LogoLong />
            </Link>
            <IconButton
              aria-label=""
              variant="unstyled"
              onClick={onToggle}
              display={{ md: 'none', base: 'flex' }}
              icon={<Icon as={MenuIcon} height={5} width={5} />}
            />
            {/*      <Box
              cursor="pointer"
              onClick={() => {
                window.location.href = '/chat';
                dispatch(setCurrentChatID(null));
              }}
            >
              <LogoLong />
            </Box> */}
          </HStack>

          <HStack>
            <IconButton
              variant="icon_btn"
              aria-label="Book Button"
              color={isOpenSetting ? 'primary.a.400' : 'red'}
              isActive={isOpenSetting}
              onClick={onToggleSetting}
              icon={<BookIcon />}
            />
            <AccountMenu />
          </HStack>
        </HStack>
      </Box>

      <Drawer size="full" isOpen={isOpen} onClose={onClose} placement="left">
        <DrawerOverlay />
        <DrawerContent mt="65px">sad</DrawerContent>
      </Drawer>
    </>
  );
};

export default Header;
