import { Box } from '@chakra-ui/react';
import React, { PropsWithChildren } from 'react';

const DefaultBG = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Box
        backgroundImage={`url(/assets/frame/BG.svg)`}
        backgroundSize="cover"
        width="full"
        backgroundRepeat="no-repeat"
        backgroundPosition="center"
      >
        {children}
      </Box>
    </>
  );
};

export default DefaultBG;
