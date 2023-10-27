import { Box } from '@chakra-ui/react';
import React, { PropsWithChildren } from 'react';

const DefaultLayout = ({ children }: PropsWithChildren) => (
  <>
    <Box>{children}</Box>
  </>
);

export default DefaultLayout;
