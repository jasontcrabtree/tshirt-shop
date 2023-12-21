import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import { useContext } from 'react';
import { CartContext } from './_app';
import ProductView from '@/components/ProductView';
import useFetchProduct from '@/hooks/use-fetch-product';

export default function Home(props: any) {


  return (
    <>
      <Head>
        <title>T-Shirt Shop</title>
        <meta name="description" content="T-Shirt Shopp" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <ProductView productId={["1", "2", "4"]} />
      </main>
    </>
  );
}