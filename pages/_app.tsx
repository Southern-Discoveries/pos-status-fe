import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import AuthProvider from '@/components/Provider/AuthProvider';
import { persistor, store } from '@/redux/store';
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
        <PersistGate loading={null} persistor={persistor}>
          <ChakraProvider theme={theme}>
            <AuthProvider>
              <Component {...pageProps} />
            </AuthProvider>
          </ChakraProvider>
        </PersistGate>
      </Provider>
    </>
  );
}
