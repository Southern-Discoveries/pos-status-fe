import { HStack, IconButton, Text } from '@chakra-ui/react';
import React from 'react';

import BookIcon from '@/public/assets/icons/line/book.svg';
import SettingIcon from '@/public/assets/icons/line/setting.svg';
import Logo from '@/public/assets/logo/logo_title.svg';
interface IProps {
  isOpenSetting?: boolean;
  onToggleSetting?: () => void;
}
const Header = ({ isOpenSetting, onToggleSetting }: IProps) => {
  return (
    <HStack
      as="header"
      bg="white"
      top={0}
      position="sticky"
      justifyContent="space-between"
      borderBottom="0.063rem solid"
      borderBottomColor="shader.a.200"
      width="full"
      px={6}
      zIndex="99"
    >
      <HStack py="18px" gap="8px">
        <Logo />
        <Text color="shader.a.900" fontWeight="bold" fontSize="lg">
          Postatus
        </Text>
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
        <IconButton
          variant="icon_btn"
          aria-label="Setting Button"
          icon={<SettingIcon />}
        />
      </HStack>
    </HStack>
  );
};

export default Header;
