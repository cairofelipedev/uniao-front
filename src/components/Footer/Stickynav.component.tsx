import Link from 'next/link';

import Cart from '@/components/Header/Cart.component';
import Image from 'next/image'

import Hamburger from './Hamburger.component';

/**
 * Navigation for the application.
 * Includes mobile menu.
 */
const Stickynav = () => (
  <nav
    id="footer"
    className="fixed top-0 z-50 w-full md:hidden lg:hidden xl:hidden"
  >
    <div className="container flex flex-wrap items-center justify-between px-6 py-3 mx-auto mt-0 md:min-w-96 bg-white shadow-md">
      <Hamburger />
      <Link href="/">
        <Image src="/logo.png" alt="Vercel Logo" width={131} height={150} />
      </Link>
      <div
        className="order-3 hidden w-full md:flex md:items-center md:w-auto md:order-1"
        id="menu"
      >
        <ul className="items-center justify-between pt-4 text-base text-gray-700 md:flex md:pt-0">
          <li>
            <Link href="#">
              <span className="inline-block py-2 pr-4 text-xl font-bold no-underline hover:underline">
                Produtos
              </span>
            </Link>
          </li>
          <li>
            <Link href="/categorias">
              <span className="inline-block py-2 pr-4 text-xl font-bold no-underline hover:underline">
                Catregorias
              </span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="flex items-center order-2 md:order-3" id="nav-content">
        <Cart stickyNav />
      </div>
    </div>
  </nav>
);

export default Stickynav;
