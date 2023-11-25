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
      <nav className="sm:flex sm:justify-between sm:items-center bg-gray-800 py-2 px-20">
        <div className="flex text-white">
          <div class="flex space-x-5">
            <div class="text-sm">
              Troque na loja ou no site
            </div>
            <div class="text-sm">
              Compre pelo WhatsApp
            </div>
          </div>
        </div>
        <div className="flex text-white">
          <div class="flex space-x-5">
            <div class="text-sm">
              Troque na loja ou no site
            </div>
            <div class="text-sm">
              Compre pelo WhatsApp
            </div>
          </div>
        </div>
      </nav>
      <header className="hidden lg:block shadow-lg bg-white">
        <div className="mx-auto px-20 py-4">
          <div className="flex items-center">
            <div className="hidden md:flex-none md:w-32 md:flex md:items-center">
              <div>
                <Link href="/">
                  <Image src="/logo.png" alt="Vercel Logo" width={131} height={150} />
                </Link>
              </div>
            </div>
            <div className="relative col-span-4 grow">
              <input className="w-full border shadow rounded-lg pl-5 ml-5 py-4 focus:border-blue-500 focus:outline-none focus:shadow-outline" type="text" placeholder="Busque aqui seu produto" />
              <span className="absolute inset-y-0 right-0 flex items-center">
                <svg className="h-6 w-6 text-green-700" viewBox="0 0 24 24" fill="none">
                  <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </span>
            </div>
            <div className="flex items-center justify-end w-full col-span-1 md:flex-none md:w-32">
              <div className="flex items-center">
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
        <nav className="sm:flex sm:justify-center sm:items-center bg-green-600 py-2">
          <div className="flex flex-col sm:flex-row">
            <a className="mt-3 text-white font-semibold hover:underline sm:mx-12 sm:mt-0" href="#">Esportes</a>
            <a className="mt-3 text-white font-semibold hover:underline sm:mx-12 sm:mt-0" href="#">Homens</a>
            <a className="mt-3 text-white font-semibold hover:underline sm:mx-12 sm:mt-0" href="#">Mulheres</a>
            <a className="mt-3 text-white font-semibold hover:underline sm:mx-12 sm:mt-0" href="#">Crianças</a>
            <a className="mt-3 text-white font-semibold hover:underline sm:mx-12 sm:mt-0" href="#">Calçados</a>
            <a className="mt-3 text-white font-semibold hover:underline sm:mx-12 sm:mt-0" href="#">Roupas</a>
            <a className="mt-3 text-white font-semibold hover:underline sm:mx-12 sm:mt-0" href="#">Acessórios</a>
            <a className="mt-3 text-white font-semibold hover:underline sm:mx-12 sm:mt-0" href="#">Futebol</a>
            <a className="mt-3 text-white font-semibold hover:underline sm:mx-12 sm:mt-0" href="#">Marcas</a>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
