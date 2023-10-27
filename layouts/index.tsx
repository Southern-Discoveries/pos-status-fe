import { Box, Flex } from '@chakra-ui/react';
import React, { PropsWithChildren } from 'react';

import Header from './Header';
import Sidebar from './Sidebar';

const DefaultLayout = ({ children }: PropsWithChildren) => (
  <>
    <Header />

    <Flex width="full">
      <Sidebar />
      <Box
        height="800px"
        /*   bg="shader.a.50" */
        backgroundImage={`url(assets/frame/BG.svg)`}
        backgroundSize="cover"
        width="full"
        backgroundRepeat="no-repeat"
        backgroundPosition="center"
        padding={6}
      >
        {children}
      </Box>
    </Flex>
  </>
);

export default DefaultLayout;
