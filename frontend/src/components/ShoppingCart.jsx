import { CartContext } from './../pages/_app';
import styles from './../styles/components/shopping-cart.module.scss';
import clsx from 'clsx';
import { useContext, useEffect, useState } from 'react';
import Image from 'next/image';

const ShoppingCart = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const { cartContextValue, cartItemCount } = useContext(CartContext);

  return (
    <div className={styles.cart__group}>
      <button
        data-testid="cart-button"
        className={clsx(
          styles.cart__button,
          isCartOpen ? styles.cartButtonActive : ''
        )}
        onClick={() => {
          setIsCartOpen(!isCartOpen);
        }}>
        My Cart {cartItemCount > 0 ? `( ${cartItemCount} )` : null}
      </button>
      {isCartOpen ? (
        <div className={styles.cart__wrapper}>
          {Object.values(cartContextValue).flatMap((cartItem, index) => {
            if (cartItem.quantity <= 0) {
              return null;
            }
            return (
              <div key={index} className={styles.cart__item}>
                <Image
                  src={cartItem.imageURL}
                  alt={cartItem.title}
                  width={70}
                  height={104}
                />
                <div>
                  <p>{cartItem.title ? cartItem.title : 'Product'}</p>
                  <p>
                    {cartItem.quantity}x{' '}
                    {cartItem.price ? (
                      <span>${cartItem.price.toFixed(2)}</span>
                    ) : (
                      ''
                    )}
                  </p>
                  <p className={styles.cart__size}>
                    Size: {cartItem.size ? cartItem.size : ''}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default ShoppingCart;
