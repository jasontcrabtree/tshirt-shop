import styles from './../styles/components/product-view.module.scss';

import { useState, useContext } from 'react';
import toast from 'react-hot-toast';
import clsx from 'clsx';
import { CartContext } from './../pages/_app';

const AddItemCart = ({ options, productData }) => {
  const [size, setSize] = useState('');
  const { updateContext } = useContext(CartContext);

  const addNewItemToCartContext = size => {
    updateContext(initialCartContext => {
      let itemUpdated = false;
      const updatedCart = Object.entries(initialCartContext).reduce(
        (newCart, [key, item]) => {
          if (item.size === size) {
            newCart[key] = { ...item, quantity: item.quantity + 1 };
            itemUpdated = true;
          } else {
            newCart[key] = item;
          }
          return newCart;
        },
        {}
      );

      if (!itemUpdated) {
        updatedCart[size] = {
          quantity: 1,
          size: size,
          title: productData.title,
          price: productData.price,
          imageURL: productData.imageURL,
        };
      }

      // Add API Route call to add to server-side cart
      return updatedCart;
    });
  };

  if (!options) {
    return null;
  }

  return (
    <>
      <p className={styles.size__label}>
        Size <span className="required">*</span>{' '}
        {size ? (
          <span style={{ fontWeight: 'bold', color: 'var(--grey-900)' }}>
            {' '}
            {size}
          </span>
        ) : (
          ''
        )}
      </p>
      <ul className={styles.size__list}>
        {options.map(({ id, label }) => (
          <li key={id}>
            <button
              className={clsx(
                styles.buttonSubtle,
                size === label ? styles.buttonGhost : ''
              )}
              onClick={() => {
                setSize(label);
              }}>
              {label}
            </button>
          </li>
        ))}
      </ul>
      <button
        className="button--primary"
        onClick={() => {
          if (size) {
            addNewItemToCartContext(size);
            toast.success('Item added to cart!');
          } else {
            toast.error('Please select a size');
          }
        }}>
        Add to cart
      </button>
    </>
  );
};

export default AddItemCart;
