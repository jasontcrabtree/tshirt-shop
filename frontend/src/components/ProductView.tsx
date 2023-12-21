import useCart from '@/hooks/use-cart';
import useFetchProduct from '@/hooks/use-fetch-product';
import { CartContext } from '@/pages/_app';
import styles from '@/styles/components/product-view.module.scss'
import { InferGetServerSidePropsType } from 'next';
import Image from 'next/image'
import { useState, useEffect, useContext } from 'react';
import toast from 'react-hot-toast';

interface ProductDataType {
    id?: number;
    title: string;
    description?: string;
    price?: number;
    sizeOptions: {
        id: number;
        label: string;
    }[];
}

interface ProductViewType extends ProductDataType {
    imageURL?: string;
}

const ProductImages = ({ url, alt, width, height }: {
    url: string,
    alt: string,
    width: number,
    height: number
}): JSX.Element => {
    return (
        <Image priority={true} src={url} alt={alt} width={width} height={height} />
    )
}

const AddItemToCart = ({ options }: { options: { id: number, label: string }[] }) => {
    const [size, setSize] = useState("");
    const { addItemToCart } = useCart();

    console.log(options);

    if (!options) {
        return null
    }

    return (
        <>
            <ul className={styles.size__list}>
                {options.map(({ id, label }) => (
                    <li key={id}>
                        <button onClick={() => {
                            console.log('id', label)
                            setSize(label);

                        }}>
                            {label}
                        </button>
                    </li>
                ))
                }
            </ul>
            <button className='button--primary' onClick={() => {
                if (size) {
                    addItemToCart(size);
                } else {
                    toast.error('Please select a size')
                }
            }}>Add to cart</button>
        </>
    );
}

const ProductInformation = ({ title, description, price, sizeOptions }: ProductDataType) => {
    const cart = useContext(CartContext);
    console.log('cart', cart)

    return (
        <section className={styles.product__information}>
            {title
                ? <h1>{title}</h1>
                : "Product"}
            <div className="divider"></div>
            {price
                ? <h2>${price.toFixed(2)}</h2>
                : "$"}
            <div className="divider"></div>
            {description
                ? <p>{description}</p>
                : ""}
            <p className={styles.size__label}>Size <span className="required">*</span></p>
            <AddItemToCart options={sizeOptions} />
        </section>
    )
}

const ProductView = ({ productId }: { productId: string[] }) => {
    const [data, setData] = useState<ProductViewType>()
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        fetch(`/api/products/${productId}`)
            .then((apiRes) => apiRes.json())
            .then((jsonData) => {
                setData(jsonData)
                setLoading(false)
            })
    }, [])

    if (isLoading) {
        return (
            <div>
                Loading
            </div>
        )
    }

    if (!data) {
        return (
            <div>No products found</div>
        )
    }

    const { title, imageURL, description, price, sizeOptions } = data;

    return (
        <section className={styles.product__layout}>
            {imageURL ? <ProductImages url={imageURL} width={400} height={600} alt={title} /> : ""}
            <ProductInformation title={title} description={description} price={price} sizeOptions={sizeOptions} />
        </section>
    )
}

export default ProductView;