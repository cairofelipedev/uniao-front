interface ILinks {
  id: number;
  title: string;
  href: string;
}

const LINKS: ILinks[] = [
  {
    id: 0,
    title: 'Home',
    href: '/',
  },
  {
    id: 1,
    title: 'Produtos',
    href: '/Produtos`',
  },
  {
    id: 2,
    title: 'Categorias',
    href: '/categorias',
  },
];

export default LINKS;
