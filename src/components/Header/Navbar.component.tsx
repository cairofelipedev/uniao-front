import { useState, ChangeEvent, FormEvent } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { GrChat } from "react-icons/gr";

// Components
import Cart from './Cart.component';

// Utils
import useIsMobile from '@/utils/hooks/useIsMobile';

/**
 * Navigation for the application.
 * Includes mobile menu.
 */
const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();
  const isMobile = useIsMobile();

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm.trim() !== '') {
      router.push(`/busca/${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <nav className="bg-green-600 py-1.5">
        <div className="text-white text-center">
          <div className="text-sm">Pague no PIX e ganhe 5% de desconto</div>
        </div>
      </nav>
      <header className="hidden lg:block shadow-md bg-white">
        <div className="mx-auto max-w-screen-xl py-4">
          <div className="flex items-center">
            <div className="hidden md:flex-none md:w-32 md:flex md:items-center">
              <div>
                <Link href="/">
                  <Image src="/logo.png" alt="Vercel Logo" width={131} height={150} />
                </Link>
              </div>
            </div>
            <form onSubmit={handleSearch} className="relative col-span-4 grow px-3">
              <input
                className="w-full rounded-full pl-5 ml-5 py-4 focus:border-green-500 focus:outline-none focus:shadow-outline bg-slate-100"
                type="text"
                placeholder="Busque aqui seu produto"
                value={searchTerm}
                onChange={handleChange}
              />
              <button type="submit" className="absolute inset-y-0 right-0 flex items-center">
                <svg className="h-6 w-6 text-green-700" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </form>
            <div className="flex items-center space-x-3 justify-end w-full col-span-1 md:flex-none md:w-32">
              <div className="flex items-center"><GrChat className='text-red-500 h-6 w-6 mb-2' /></div>
              <div className="flex items-center">{!isMobile && <Cart />}</div>
              <div className="flex sm:hidden">
                <button type="button" className="text-gray-600 hover:text-gray-500 focus:outline-none focus:text-gray-500" aria-label="toggle menu">
                  <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
                    <path fillRule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        <nav className="sm:flex sm:justify-center sm:items-center bg-green-600 py-2">
          <div className="flex flex-col sm:flex-row">
            <div class="group inline-block">
              <button class="inline-flex items-center rounded px-4">
                <span class="mr-1 text-white">FEMININO</span>
                <svg class="h-4 w-4 fill-current text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </button>
              <ul class="absolute left-2 z-10 hidden rounded pt-3 bg-white shadow-md shadow-gray-300 group-hover:block w-[99%]">
                <h1 className="px-10">CALÇADOS</h1>
                <li class="px-2">
                  <a href="https://corridafenae.apcefpi.com.br/">
                    <button class="inline-flex items-center rounded py-2 px-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="#E96708" class="bi bi-chevron-right font-bold" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
                      </svg>
                      <h1 class="ml-2 mr-5 text-xs text-gray-900">
                        Tênis e sapatilhas
                      </h1>
                    </button>
                  </a>
                </li>
                <li class="px-2">
                  <a href="">
                    <button class="inline-flex items-center rounded py-2 px-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="#E96708" class="bi bi-chevron-right font-bold" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
                      </svg>
                      <h1 class="ml-2 mr-5 text-xs text-gray-900">
                        Sandálias
                      </h1>
                    </button>
                  </a>
                </li>
                <li class="px-2">
                  <a href="">
                    <button class="inline-flex items-center rounded py-2 px-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="#E96708" class="bi bi-chevron-right font-bold" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
                      </svg>
                      <h1 class="ml-2 mr-5 text-xs text-gray-900">
                        Tamancos
                      </h1>
                    </button>
                  </a>
                </li>
                <li class="px-2">
                  <a href="">
                    <button class="inline-flex items-center rounded py-2 px-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="#E96708" class="bi bi-chevron-right font-bold" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
                      </svg>
                      <h1 class="ml-2 mr-5 text-xs text-gray-900">
                        Rasteiras e papetes
                      </h1>
                    </button>
                  </a>
                </li>
                <li class="px-2">
                  <a href="">
                    <button class="inline-flex items-center rounded py-2 px-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="#E96708" class="bi bi-chevron-right font-bold" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
                      </svg>
                      <h1 class="ml-2 mr-5 text-xs text-gray-900">
                        Botas
                      </h1>
                    </button>
                  </a>
                </li>
              </ul>
            </div>
            <a className="mt-3 text-white font-semibold hover:underline sm:mx-12 sm:mt-0" href={`/categoria/bolsas`}>
              Masculino
            </a>
            <a className="mt-3 text-white font-semibold hover:underline sm:mx-12 sm:mt-0" href={`/categoria/carteiras`}>
              Esportivo
            </a>
            <a className="mt-3 text-white font-semibold hover:underline sm:mx-12 sm:mt-0" href={`/categoria/kids`}>
              Infantil
            </a>
          </div>
        </nav>
      </header >
    </>
  );
};

export default Navbar;