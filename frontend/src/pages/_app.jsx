import NavBar from './../components/NavBar';
import './../styles/globals.css';
import { createContext, useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';

import LoadingSpinner from './../components/LoadingSpinner';

export const CartContext = createContext(() => {});

export default function App({ Component, pageProps }) {
  const [cartContextValue, setCartContext] = useState(null);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [isLoading, setLoading] = useState(true);

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
        setCartContext(jsonData);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        toast.error('Error loading cart');
      });
  }, []);

  useEffect(() => {
    if (cartContextValue) {
      const newCount = Object.values(cartContextValue).reduce(
        (total, item) => total + (item.quantity || 0),
        0
      );
      setCartItemCount(newCount);
    }
  }, [cartContextValue]);

  const updateContext = newCartContextValue => {
    setCartContext(newCartContextValue);
  };

  if (cartContextValue === null) {
    return (
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <CartContext.Provider
      value={{ cartContextValue, updateContext, cartItemCount }}>
      <Toaster position="bottom-center" />
      <NavBar />
      <Component {...pageProps} />
    </CartContext.Provider>
  );
}
