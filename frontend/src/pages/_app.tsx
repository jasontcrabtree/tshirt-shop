import NavBar from '@/components/NavBar';
import '@/styles/globals.css';
import type { AppProps } from 'next/app'
import { createContext, useContext } from 'react';
import { Toaster } from 'react-hot-toast';

export const CartContext = createContext({});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartContext.Provider value={{}}>
      <Toaster position="bottom-center" />
      <NavBar />
      <Component {...pageProps} />
    </CartContext.Provider>
  );
}
