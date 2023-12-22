import styles from '@/styles/components/product-view.module.scss'
import useCart from "@/hooks/use-cart";
import { useState } from "react";
import toast from "react-hot-toast";
import clsx from 'clsx';

const AddItemCart = ({ options }: { options: { id: number, label: string }[] }): JSX.Element | null => {
    const [size, setSize] = useState("");
    const { addItemToCart } = useCart();

    if (!options) {
        return null
    }

    return (
        <>
            <p className={styles.size__label}>
                Size <span className="required">*</span> {size ? <span style={{ fontWeight: "bold", color: "var(--grey-900)" }}> {size}</span> : ""}
            </p>
            <ul className={styles.size__list}>
                {options.map(({ id, label }) => (
                    <li key={id}>
                        <button className={clsx(styles.buttonSubtle, size === label ? styles.buttonGhost : "")} onClick={() => {
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

export default AddItemCart;