// Imports
import Link from 'next/link';
import Image from 'next/image'
// Components
import Cart from './Cart.component';


// Utils
import useIsMobile from '@/utils/hooks/useIsMobile';

/**
 * Navigation for the application.
 * Includes mobile menu.
 */
const Navbar = () => {
  const isMobile = useIsMobile();
  return (
    <>
      <nav className="sm:flex sm:justify-center sm:items-center bg-green-600 py-2">
        <div className="flex flex-col sm:flex-row text-white">
          Aproveite nossos maiores descontos de Halloween
        </div>
      </nav>
      <header className="hidden lg:block shadow">
        <div className="mx-auto max-w-7xl px-6 py-5">
          <div className="grid grid-cols-5">
            <div className="hidden w-full md:flex md:items-center">
              <svg className="h-5 w-5 text-red-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M16.2721 10.2721C16.2721 12.4813 14.4813 14.2721 12.2721 14.2721C10.063 14.2721 8.27214 12.4813 8.27214 10.2721C8.27214 8.06298 10.063 6.27212 12.2721 6.27212C14.4813 6.27212 16.2721 8.06298 16.2721 10.2721ZM14.2721 10.2721C14.2721 11.3767 13.3767 12.2721 12.2721 12.2721C11.1676 12.2721 10.2721 11.3767 10.2721 10.2721C10.2721 9.16755 11.1676 8.27212 12.2721 8.27212C13.3767 8.27212 14.2721 9.16755 14.2721 10.2721Z" fill="currentColor" /><path fill-rule="evenodd" clip-rule="evenodd" d="M5.79417 16.5183C2.19424 13.0909 2.05438 7.39409 5.48178 3.79417C8.90918 0.194243 14.6059 0.054383 18.2059 3.48178C21.8058 6.90918 21.9457 12.6059 18.5183 16.2059L12.3124 22.7241L5.79417 16.5183ZM17.0698 14.8268L12.243 19.8965L7.17324 15.0698C4.3733 12.404 4.26452 7.97318 6.93028 5.17324C9.59603 2.3733 14.0268 2.26452 16.8268 4.93028C19.6267 7.59603 19.7355 12.0268 17.0698 14.8268Z" fill="currentColor" />
              </svg>
              <span className="mx-1 text-sm">Teresina, PI</span>
              <div className="pl-4">
                <Link href="/">
                  <Image src="/logo.png" alt="Vercel Logo" width={131} height={150} />
                </Link>
              </div>
            </div>
            <div className="relative col-span-2">
              <input className="w-full border shadow rounded-full pl-5 ml-5 py-3 focus:border-blue-500 focus:outline-none focus:shadow-outline" type="text" placeholder="Busque aqui seu produto" />
              <span className="absolute inset-y-0 right-0 flex items-center">
                <svg className="h-6 w-6 text-green-700" viewBox="0 0 24 24" fill="none">
                  <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </span>
            </div>
            <div className="flex items-center justify-end w-full col-span-2">
              <div className="flex items-center">
                <button className="px-8 py-3 bg-green-600 text-white text-sm font-medium rounded-full hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500">CENTRAL DE ATENDIMENTO</button>
                {!isMobile && <Cart />}
              </div>
              <div className="flex sm:hidden">
                <button type="button" className="text-gray-600 hover:text-gray-500 focus:outline-none focus:text-gray-500" aria-label="toggle menu">
                  <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
                    <path fill-rule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
