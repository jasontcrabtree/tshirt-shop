import styles from './../styles/components/product-view.module.scss';
import useCart from './../hooks/use-cart';
import { useState, useContext } from 'react';
import toast from 'react-hot-toast';
import clsx from 'clsx';
import { CartContext } from './../pages/_app';

const AddItemCart = ({ options }) => {
  const [size, setSize] = useState('');
  //   const { addItemToCart } = useCart();

  const { updateContext } = useContext(CartContext);

  const addNewItemToCartContext = () => {
    updateContext(initialCartContext => ({
      ...initialCartContext,
      //   [productId]: {
      //     quantity: 1,
      //     size: size,
      //     title: title,
      //     price: price,
      //     imageURL: imageURL,
      //   },
      title: 'Classic Tee',
      price: 75,
      imageURL:
        'https://mrdevelopertestassets.s3.ap-southeast-2.amazonaws.com/classic-tee.jpg',
      size: 'L',
      quantity: 8,
    }));
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
