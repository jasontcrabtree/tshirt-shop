import NavBar from './../components/NavBar';
import './../styles/globals.css';
import { createContext, useContext, useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';
import cookie from 'cookie';

export const CartContext = createContext({});

export default function App({ Component, pageProps }) {
  const [data, setData] = useState();
  const [cartContextValue, setCartContext] = useState(data);

  useEffect(() => {
    fetch(`/api/cart/read`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(apiRes => apiRes.json())
      .then(jsonData => {
        setData(jsonData);
      });
  }, []);

  const updateContext = newCartContextValue => {
    setCartContext(newCartContextValue);
  };

  return (
    <CartContext.Provider value={{ cartContextValue, updateContext }}>
      <Toaster position="bottom-center" />
      <NavBar />
      <Component {...pageProps} />
    </CartContext.Provider>
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
