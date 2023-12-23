import Head from 'next/head';
import ProductView from './../components/ProductView';

export default function Home(props) {
  return (
    <>
      <Head>
        <title>T-Shirt Shop</title>
        <meta name="description" content="T-Shirt Shopp" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <ProductView productId={['1', '2', '4']} />
      </main>
    </>
  );
}
