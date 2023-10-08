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
      <nav className="fixed top-0 left-0 z-20 w-full border-b border-gray-200 bg-white py-2.5 px-6 sm:px-4">
        <div className="container mx-auto flex max-w-6xl flex-wrap items-center justify-between">
          <Link href="/">
            <Image src="/logo.png" alt="Vercel Logo" width={131} height={150} />
          </Link>
          <div className="mt-2 sm:mt-0 sm:flex md:order-2">
            {/* <button type="button" className="rounde mr-3 hidden border border-green-700 py-1.5 px-6 text-center text-sm font-medium text-green-700 focus:outline-none focus:ring-4 focus:ring-blue-300 md:inline-block rounded-lg">Login</button>
            <button type="button" className="rounde mr-3 hidden bg-green-700 py-1.5 px-6 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 md:mr-0 md:inline-block rounded-lg">Register</button>

            <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 md:hidden" aria-controls="navbar-sticky" aria-expanded="false">
              <span className="sr-only">Open main menu</span>
              <svg className="h-6 w-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
            </button> */}
            {!isMobile && <Cart />}
          </div>
          <div className="hidden w-full items-center justify-between md:order-1 md:flex md:w-auto" id="navbar-sticky">
            {/* <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:text-sm md:font-medium">
              <li>
                <a href="#" className="block rounded bg-green-700 py-2 pl-3 pr-4 text-white md:bg-transparent md:p-0 md:text-green-700" aria-current="page">Home</a>
              </li>
              <li>
                <a href="#" className="block rounded py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-100 md:p-0 md:hover:bg-transparent md:hover:text-green-700">About</a>
              </li>
              <li>
                <a href="#" className="block rounded py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-100 md:p-0 md:hover:bg-transparent md:hover:text-green-700">Services</a>
              </li>
              <li>
                <a href="#" className="block rounded py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-100 md:p-0 md:hover:bg-transparent md:hover:text-green-700">Contact</a>
              </li>
            </ul> */}
            <div className="flex items-center">
              <input type="text"  placeholder="Busque seu produto" className="block py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5  focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" />
              <span className="absolute">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 mx-3 text-gray-400">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* <nav id="header" className="top-0 z-50 w-full py-1 bg-white ">
        <div className="container flex md:flex-wrap flex-col md:flex-row items-center justify-between px-6 py-3 mx-auto mt-0 md:min-w-96">
          <div className="order-2 md:order-1">
            <Link href="/">
              <Image src="/logo.png" alt="Vercel Logo" width={131} height={150} />
            </Link>
          </div>
          <div
            className="flex items-center order-2 md:order-3"
            id="nav-content"
          >
            <div
              className="hidden w-full md:flex md:items-center md:w-auto"
              id="menu"
            >
            </div>
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
            {!isMobile && <Cart />}
          </div>
        </div>
      </nav> */}
    </header>
  );
};

export default Navbar;
