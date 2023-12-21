import { useEffect, useState } from 'react';

const sizeIdMapping: { [key: string]: string } = {
  '1': 'S',
  '2': 'M',
  '3': 'L',
};

const useCart = () => {
  const [cartItems, setCartItems] = useState<{ [key: string]: number }>({});

  const cartSize = Object.values(cartItems).reduce(
    (total, quantity) => total + quantity,
    0
  );

  const addItemToCart = (cartInput: string) => {
    setCartItems(currentCart => {
      return {
        ...currentCart,
        [cartInput]: (currentCart[cartInput] || 0) + 1,
      };
    });
  };

  console.log('cartItems', cartItems);

  return {
    cartSize,
    cartItems,
    addItemToCart,
  };
};

export default useCart;
