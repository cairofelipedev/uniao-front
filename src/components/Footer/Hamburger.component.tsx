import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
// import LINKS from '@/utils/constants/LINKS';
import FadeLeftToRight from '@/components/Animations/FadeLeftToRight.component';
import FadeLeftToRightItem from '@/components/Animations/FadeLeftToRightItem.component';

import { LiaBarsSolid } from "react-icons/lia";
import { VscClose } from "react-icons/vsc";

/**
 * Hamburger component used in mobile menu. Animates to a X when clicked
 * @function Hamburger
 * @param {MouseEventHandler<HTMLButtonElement>} onClick - onClick handler to respond to clicks
 * @param {boolean} isExpanded - Should the hamburger animate to a X?
 * @returns {JSX.Element} - Rendered component
 */

const Hamburger = () => {
  const [isExpanded, setisExpanded] = useState(false);
  const [hidden, setHidden] = useState('invisible');

  useEffect(() => {
    if (isExpanded) {
      setHidden('');
    } else {
      setTimeout(() => {
        setHidden('invisible');
      }, 1000);
    }
  }, [isExpanded]);

  const handleMobileMenuClick = useCallback(() => {
    /**
     * Anti-pattern: setisExpanded(!isExpanded)
     * Even if your state updates are batched and multiple updates to the enabled/disabled state are made together
     * each update will rely on the correct previous state so that you always end up with the result you expect.
     */
    setisExpanded((prevExpanded) => !prevExpanded);
  }, [setisExpanded]);

  return (
    <div className="z-50 md:hidden lg:hidden xl:hidden">
      <button
        className="flex flex-col w-16 rounded items-center group"
        data-cy="hamburger"
        data-testid="hamburger"
        onClick={handleMobileMenuClick}
        aria-expanded={isExpanded}
        type="button"
      >
        <span className="sr-only text-white text-2xl">Hamburger</span>
        {isExpanded ? <VscClose size={35} color='green' /> : <LiaBarsSolid size={35} color='green' />}
      </button>
      <FadeLeftToRight
        delay={0.2}
        staggerDelay={0.2}
        animateNotReverse={isExpanded}
      >
        <div
          id="mobile-menu"
          aria-hidden={!isExpanded}
          className={`absolute left-0 top-19 mt-2 z-10 w-full text-center text-black bg-white ${hidden}`}
        >
          <ul className='bg-green-600 text-white'>
            <FadeLeftToRightItem cssClass="block">
              <li id="mobile-li" className="w-full p-2">
                <div className="grid grid-cols-2 mb-4 mt-4">
                  <Link href="/" className="uppercase font-bold hover:border-gray-400">
                    Página Inicial
                  </Link>
                  <Link
                    href="/quem-somos"
                    className="uppercase font-bold hover:border-gray-400"
                  >
                    Quem Somos
                  </Link>
                </div>
                <div className="grid grid-cols-2 p-5 gap-5">
                  <div>
                    <h1 className="text-md text-gray-600 pb-2 text-white font-bold flex items-center">
                      <span className="uppercase">Feminino</span>
                    </h1>
                    <Link href="#">
                      <div className="text-white flex items-center ml-2">
                        <span className="hover:border-b-2 border-b-2 border-transparent hover:border-bc text-sm">
                          Calçados
                        </span>
                      </div>
                    </Link>
                    <Link href="#">
                      <div className="text-white flex items-center ml-2">
                        <span className="hover:border-b-2 border-b-2 border-transparent hover:border-bc text-sm">
                          Linha Confortável
                        </span>
                      </div>
                    </Link>
                    <Link href="#">
                      <div className="text-white flex items-center ml-2">
                        <span className="hover:border-b-2 border-b-2 border-transparent hover:border-bc text-sm">
                          Acessórios
                        </span>
                      </div>
                    </Link>
                  </div>
                  <div>
                    <h1 className="text-md text-gray-600 pb-2 text-white font-bold flex items-center">
                      <span className="uppercase">Masculino</span>
                    </h1>
                    <Link href="#">
                      <div className="text-white flex items-center">
                        <span className="hover:border-b-2 border-b-2 border-transparent hover:border-bc text-sm">
                          Calçados
                        </span>
                      </div>
                    </Link>
                    <Link href="#">
                      <div className="text-white flex items-center">
                        <span className="hover:border-b-2 border-b-2 border-transparent hover:border-bc text-sm">
                          Acessórios
                        </span>
                      </div>
                    </Link>
                  </div>
                  <div className="pt-4">
                    <h1 className="text-md text-gray-600 pb-2 text-white font-bold flex items-center">
                      <span className="uppercase">Esporte</span>
                    </h1>
                    <Link href="#">
                      <div className="text-white flex items-center ml-2">
                        <span className="hover:border-b-2 border-b-2 border-transparent hover:border-bc text-sm">
                          Tênis
                        </span>
                      </div>
                    </Link>
                    <Link href="#">
                      <div className="text-white flex items-center ml-2">
                        <span className="hover:border-b-2 border-b-2 border-transparent hover:border-bc text-sm">
                          Corrida e Crossfit
                        </span>
                      </div>
                    </Link>
                    <Link href="#">
                      <div className="text-white flex items-center ml-2">
                        <span className="hover:border-b-2 border-b-2 border-transparent hover:border-bc text-sm">
                          Chuteiras
                        </span>
                      </div>
                    </Link>
                    <Link href="#">
                      <div className="text-white flex items-center ml-2">
                        <span className="hover:border-b-2 border-b-2 border-transparent hover:border-bc text-sm">
                          Roupas Esportivas
                        </span>
                      </div>
                    </Link><Link href="#">
                      <div className="text-white flex items-center ml-2">
                        <span className="hover:border-b-2 border-b-2 border-transparent hover:border-bc text-sm">
                          Acessórios
                        </span>
                      </div>
                    </Link>
                  </div>
                  <div className="pt-4">
                    <h1 className="text-md text-gray-600 text-white font-bold flex items-center">
                      <span className="uppercase">Infantil</span>
                    </h1>
                    <Link href="#">
                      <div className="text-white flex items-center">
                        <span className="hover:border-b-2 border-b-2 border-transparent hover:border-bc text-sm">
                          Masculino
                        </span>
                      </div>
                    </Link>
                    <Link href="#">
                      <div className="text-white flex items-center">
                        <span className="hover:border-b-2 border-b-2 border-transparent hover:border-bc text-sm">
                          Feminino
                        </span>
                      </div>
                    </Link>
                  </div>
                </div>
              </li>
            </FadeLeftToRightItem>
          </ul>
        </div>
      </FadeLeftToRight>
    </div>
  );
};

export default Hamburger;
