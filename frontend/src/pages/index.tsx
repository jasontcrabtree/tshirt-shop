import { NextApiRequest, NextApiResponse } from 'next';
import Head from 'next/head';
import ProductView from '@/components/ProductView';
import { v4 as uuidv4 } from 'uuid';
import getCartByUser from '@/lib/get-cart'
import cookie from 'cookie'

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


export function getServerSideProps({ req, res }: { req: NextApiRequest, res: NextApiResponse }): { props: { userCart: Promise<{}>; }; } {
  let cookies = cookie.parse(req.headers.cookie || "")
  let userId = cookies.userId;

  console.log('cookies, userId', cookies, userId)

  if (!userId) {
    userId = uuidv4();
    res.setHeader('Set-Cookie', cookie.serialize('userId', userId, { path: '/' }))
  }

  const userCart = getCartByUser(userId);

  console.log('cookies', cookies);
  return {
    props: {
      userCart
    }
  }
}