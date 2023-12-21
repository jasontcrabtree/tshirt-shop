import styles from '@/styles/components/navigation.module.scss'
import ShoppingCart from './ShoppingCart'

const NavBar = () => {
    return (
        <header className={styles.navbar__background}>
            <nav className={styles.navbar__content}>
                <ShoppingCart />
            </nav>
        </header>
    )
}

export default NavBar