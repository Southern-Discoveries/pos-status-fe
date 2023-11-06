import { Box, HStack, IconButton } from '@chakra-ui/react';
import React from 'react';

import { AccountMenu } from './AccountMenu';

import LogoLong from '@/components/Logo/LogoLong';
import BookIcon from '@/public/assets/icons/line/book.svg';

interface IProps {
  isOpenSetting?: boolean;
  onToggleSetting?: () => void;
}
const Header = ({ isOpenSetting, onToggleSetting }: IProps) => {
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
            <AccountMenu />
          </HStack>
        </HStack>
      </Box>
    </>
  );
};

export default Header;
