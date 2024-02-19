import Head from 'next/head';

import Navbar from './Navbar.component';

interface IHeaderProps {
  title: string;
}

/**
 * Renders header for each page.
 * @function Header
 * @param {string} title - Title for the page. Is set in <title>{title}</title>
 * @returns {JSX.Element} - Rendered component
 */

const Header = ({ title }: IHeaderProps) => (
  <>
    <Head>
      <title>União Calçados - {title}</title>
      <link rel="icon" href="/icon.png" />
      <meta name="description" content="União Calçados" />
      <meta name="keywords" content="Calçados, Esporte, Moda, Roupa" />
      <meta property="og:title" content="União Calçados" />
      <meta property="og:url" content="" />
      <meta property="og:image" content="" />
    </Head>
    <Navbar />
  </>
);

export default Header;
