import { useContext, useState, useEffect } from 'react';
import Link from 'next/link';

import { CartContext } from '@/stores/CartProvider';

interface ICartProps {
  stickyNav?: boolean;
}

/**
 * Displays the shopping cart contents.
 * Displays amount of items in cart.
 */
const Cart = ({ stickyNav }: ICartProps) => {
  const { cart } = useContext(CartContext);
  const [productCount, setProductCount] = useState<number | null | undefined>();

  useEffect(() => {
    if (cart) {
      setProductCount(cart.totalProductsCount);
    } else {
      setProductCount(null);
    }
  }, [cart]);

  return (
    <>
      <Link href="/carrinho">
        <span className="text-red-500 "
          aria-label="Carrinho"
        >
          <svg
            className={`${stickyNav ? 'fill-green-600' : 'fill-current'}`}
            xmlns="https://www.w3.org/2000/svg"
            width="50"
            height="50"
            viewBox="0 0 30 30"
            aria-label="Carrinho"
          >
            <path
              d="M21,7H7.462L5.91,3.586C5.748,3.229,5.392,3,5,3H2v2h2.356L9.09,15.414C9.252,15.771,9.608,16,10,16h8 c0.4,0,0.762-0.238,0.919-0.606l3-7c0.133-0.309,0.101-0.663-0.084-0.944C21.649,7.169,21.336,7,21,7z M17.341,14h-6.697L8.371,9 h11.112L17.341,14z"
              aria-label="Carrinho"
            />
            <circle cx="10.5" cy="18.5" r="1.5" aria-label="Carrinho" />
            <circle cx="17.5" cy="18.5" r="1.5" aria-label="Carrinho" />
          </svg>
        </span>
      </Link>

      {productCount && (
        <span
          className={`w-5 h-5 -mt-2 text-center rounded-full text-sm        
          ${stickyNav ? 'text-white bg-red-500' : 'text-white bg-red-500'}`}
        >
          {productCount}
        </span>
      )}
    </>
  );
};

export default Cart;
