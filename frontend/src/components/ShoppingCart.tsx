import useCart from '@/hooks/use-cart'
import { CartContext } from '@/pages/_app'
import styles from '@/styles/components/shopping-cart.module.scss'
import clsx from 'clsx'
import { useContext, useEffect, useState } from "react"
import Image from 'next/image'

const cart = [{
    title: "Classic Tee",
    price: 75,
    imageURL: 'https://mrdevelopertestassets.s3.ap-southeast-2.amazonaws.com/classic-tee.jpg',
    size: 'S',
    quantity: 1
},
{
    title: "Classic Tee",
    price: 75,
    imageURL: 'https://mrdevelopertestassets.s3.ap-southeast-2.amazonaws.com/classic-tee.jpg',
    size: 'L',
    quantity: 3
}
]

const ShoppingCart = () => {
    const [isCartOpen, setIsCartOpen] = useState(false)

    const cartContext = useContext(CartContext);
    console.log('cartContext, cartContext', cartContext)
    const cartResponse = useCart();

    const cartSize = '4'

    return (
        <div className={styles.cart__group}>
            <button className={clsx(styles.cart__button, isCartOpen ? styles.cartButtonActive : "")} onClick={() => {
                setIsCartOpen(!isCartOpen)
            }}>
                My Cart {cartSize ? `( ${cartSize} )` : null}
            </button>
            {isCartOpen
                ? (
                    <div className={styles.cart__wrapper}>
                        {cart.map((cartItem, index) => {
                            console.log('', cartItem)

                            if (cartItem.quantity <= 0) {
                                return null
                            }

                            return (
                                <div key={index} className={styles.cart__item}>
                                    <Image src={cartItem.imageURL} alt={cartItem.title} width={70} height={104} />
                                    <div>
                                        <p>
                                            {cartItem.title ? cartItem.title : "Product"}
                                        </p>
                                        <p>
                                            {cartItem.quantity}x{" "}
                                            {cartItem.price ? (<span>${cartItem.price.toFixed(2)}</span>) : ""}
                                        </p>
                                        <p className={styles.cart__size}>
                                            Size: {cartItem.size ? cartItem.size : ""}
                                        </p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )
                : ""}
        </div>
    )
}

export default ShoppingCart;