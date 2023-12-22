import { CartContext } from '@/pages/_app';
import { useContext, useState } from 'react';

const useCart = () => {
  const cart = useContext(CartContext);
  console.log('cart', cart);

  const [cartItems, setCartItems] = useState<{ [key: string]: number }>(cart);

  const addItemToCart = (cartInput: string) => {
    setCartItems(currentCart => {
      return {
        ...currentCart,
        [cartInput]: (currentCart[cartInput] || 0) + 1,
      };
    });
  };

  const cartSize = Object.values(cartItems).reduce(
    (total, quantity) => total + quantity,
    0
  );

  console.log('cartItems', cartItems, 'size', cartSize);

  return {
    cartSize,
    cartItems,
    addItemToCart,
  };
};

export default useCart;
