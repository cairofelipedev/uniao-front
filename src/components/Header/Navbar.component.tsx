// Imports
import Link from 'next/link';
import Image from 'next/image'
// Components
import Cart from './Cart.component';
import AlgoliaSearchBox from '../AlgoliaSearch/AlgoliaSearchBox.component';
import MobileSearch from '../AlgoliaSearch/MobileSearch.component';

// Utils
import useIsMobile from '@/utils/hooks/useIsMobile';

/**
 * Navigation for the application.
 * Includes mobile menu.
 */
const Navbar = () => {
  const isMobile = useIsMobile();
  return (
    <header>
      <nav id="header" className="top-0 z-50 w-full py-1 bg-white ">
        <div className="container flex md:flex-wrap flex-col md:flex-row items-center justify-between px-6 py-3 mx-auto mt-0 md:min-w-96">
          <div
            className="order-3 hidden w-full md:flex md:items-center md:w-auto md:order-1"
            id="menu"
          >
            <ul className="items-center justify-between pt-4 text-base text-gray-700 md:flex md:pt-0">
              <li>
                <Link href="/produtos">
                  <span className="inline-block py-2 pr-4 text-xl font-bold no-underline hover:underline">
                    Produtos
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/categorias">
                  <span className="inline-block py-2 pr-4 text-xl font-bold no-underline hover:underline">
                    Categorias
                  </span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="order-1 md:order-2">
            <Link href="/">
              <Image src="/logo.png" alt="Vercel Logo" width={131} height={150} />
            </Link>
          </div>
          <div
            className="flex items-center order-2 md:order-3"
            id="nav-content"
          >
            <AlgoliaSearchBox />
            <MobileSearch />
            {!isMobile && <Cart />}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
