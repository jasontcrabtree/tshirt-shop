import { CartContext } from './../pages/_app';
import { useContext, useState } from 'react';

const useCart = () => {
  const cart = useContext(CartContext);

  if (cart) {
    let totalQuantity = 0;
    Object.values(cart).forEach(item => {
      totalQuantity += item.quantity;
    });
  }

  return {
    cartContent: cart,
    cartSize: 3,
  };
};

export default useCart;
