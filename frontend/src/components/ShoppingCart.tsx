import useCart from '@/hooks/use-cart'
import styles from '@/styles/components/shopping-cart.module.scss'
import { useState } from "react"

const ShoppingCart = () => {
    const { cartSize } = useCart()
    const [isCartOpen, setIsCartOpen] = useState(false)

    console.log('isCartOpen', isCartOpen)

    return (
        <>
            <button className={styles.cart__button}>
                My Cart {cartSize ? `( ${cartSize} )` : null}
            </button>
        </>
    )
}

export default ShoppingCart;