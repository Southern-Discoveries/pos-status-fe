import {
  Box,
  BoxProps,
  SystemStyleObject,
  useColorModeValue,
} from '@chakra-ui/react';
import React, { PropsWithChildren } from 'react';

export const scrollbarThumb = (rest?: SystemStyleObject) => ({
  '::-webkit-scrollbar-thumb': {
    bg: 'light.accent.400',
    borderRadius: '1rem',
    ...rest,
  },
});

export const scrollbarWebkit = (rest?: SystemStyleObject) => ({
  '::-webkit-scrollbar': {
    height: '0.1875rem',
    bg: 'inherit',
    ...rest,
  },
});

type ScrollbarProps = PropsWithChildren & BoxProps;
type Props = {
  scrollBarColor?: string;
  alway?: boolean;
};

export default function Scrollbar({
  scrollBarColor,
  children,
  alway,
  ...rest
}: ScrollbarProps & Props) {
  const colorThumb = useColorModeValue('primary.a.400', 'white');

  return (
    <Box
      overflow="auto"
      height="100%"
      _hover={scrollbarThumb({
        bg: scrollBarColor ? scrollBarColor : colorThumb,
        width: 1,
      })}
      sx={{
        ...(alway
          ? scrollbarThumb({
              bg: scrollBarColor ? scrollBarColor : colorThumb,
              width: 1,
            })
          : {}),
        ...scrollbarWebkit({
          width: 1,
          height: 1,
        }),
        '::-webkit-scrollbar-corner': {
          display: 'none',
        },
      }}
      {...rest}
    >
      {children}
    </Box>
  );
}
