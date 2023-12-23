import Head from 'next/head';
import ProductView from './../components/ProductView';
import { v4 as uuidv4 } from 'uuid';
import cookie from 'cookie';

export default function Home() {
  return (
    <>
      <Head>
        <title>T-Shirt Shop</title>
        <meta name="description" content="T-Shirt Shopp" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <ProductView productId={['1']} />
      </main>
    </>
  );
}

export async function getServerSideProps({ req, res }) {
  let cookies = cookie.parse(req.headers.cookie || '');
  let userId = cookies.userId;

  if (!userId) {
    userId = uuidv4();
    res.setHeader(
      'Set-Cookie',
      cookie.serialize('userId', userId, { path: '/' })
    );
  }

  return {
    props: {
      userId: userId,
    },
  };
}
