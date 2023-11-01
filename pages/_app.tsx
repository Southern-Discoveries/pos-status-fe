import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import { Provider } from 'react-redux';

import store from '@/redux/store';
import theme from '@/theme/theme';
const inter = Inter({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps<{}>) {
  return (
    <>
      <style jsx global>
        {`
          :root {
            --font-work: ${inter.style.fontFamily};
          }
        `}
      </style>
      <Provider store={store}>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </Provider>
    </>
  );
}
