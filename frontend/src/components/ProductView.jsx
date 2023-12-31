import styles from './../styles/components/product-view.module.scss';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import LoadingSpinner from './LoadingSpinner';
import Link from 'next/link';
import AddItemCart from './AddToCart';

const ProductImages = ({ url, alt, width, height }) => {
  return (
    <Image priority={true} src={url} alt={alt} width={width} height={height} />
  );
};

const ProductInformation = ({
  title,
  description,
  price,
  sizeOptions,
  productData,
}) => {
  return (
    <section className={styles.product__information}>
      {title ? <h1>{title}</h1> : 'Product'}
      <div className="divider"></div>
      {price ? <h2>${price.toFixed(2)}</h2> : '$'}
      <div className="divider"></div>
      {description ? <p>{description}</p> : ''}
      <AddItemCart options={sizeOptions} productData={productData} />
    </section>
  );
};

const ProductView = ({ productId }) => {
  const [data, setData] = useState();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/products/${productId}`)
      .then(apiRes => apiRes.json())
      .then(jsonData => {
        setData(jsonData);
        setLoading(false);
      });
  }, [productId]);

  if (isLoading) {
    return (
      <div className={styles.product__fallback}>
        <LoadingSpinner size={40} />
      </div>
    );
  }

  if (!data) {
    return (
      <div className={styles.product__fallback}>
        <h1>
          No products found, <Link href="/">try a different product</Link>
        </h1>
      </div>
    );
  }

  const { title, imageURL, description, price, sizeOptions } = data;

  return (
    <section className={styles.product__layout}>
      {imageURL ? (
        <ProductImages url={imageURL} width={400} height={600} alt={title} />
      ) : (
        ''
      )}
      <ProductInformation
        title={title}
        description={description}
        price={price}
        sizeOptions={sizeOptions}
        productData={data}
      />
    </section>
  );
};

export default ProductView;
