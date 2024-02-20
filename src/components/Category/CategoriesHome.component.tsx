import Link from 'next/link';


const Categories = () => (
  <section className="mx-auto max-w-screen-xl bg-white">
    <div className="grid gap-2 px-2 pt-2 pb-2 lg:px-0 xl:px-0 md:px-0 lg:grid-cols-6 sm:grid-cols-2 md:grid-cols-3 xs:grid-cols-3 grid-cols-2">
      <Link
        href={`/categoria/chuteiras`}
        passHref
      >
        <div className="p-6 cursor-pointer">
          <img src="/images/categoria1.png" className="lg:h-40 lg:w-40 w-32 h-32 rounded-full" />
          <p className="text-center">Chuteiras</p>
        </div>
      </Link>
      <Link
        href={`/categoria/bolsas`}
        passHref
      >
        <div className="p-6 cursor-pointer">
          <img src="/images/bolsas.png" className="lg:h-40 lg:w-40 w-32 h-32 rounded-full" />
          <p className="text-center">Bolsas</p>
        </div>
      </Link>
      <Link
        href={`/categoria/chinelos`}
        passHref
      >
        <div className="p-6 cursor-pointer">
          <img src="/images/chinelos.png" className="lg:h-40 lg:w-40 w-32 h-32 rounded-full" />
          <p className="text-center">Chinelos</p>
        </div>
      </Link>
      <Link
        href={`/categoria/tenis`}
        passHref
      >
        <div className="p-6 cursor-pointer">
          <img src="/images/tenis.png" className="lg:h-40 lg:w-40 w-32 h-32 rounded-full" />
          <p className="text-center">Tênis</p>
        </div>
      </Link>
      <Link
        href={`/categoria/sandalias`}
        passHref
      >
        <div className="p-6 cursor-pointer">
          <img src="/images/sandalias.png" className="lg:h-40 lg:w-40 w-32 h-32 rounded-full" />
          <p className="text-center">Sandálias</p>
        </div>
      </Link>
      <Link
        href={`/categoria/rasteiras`}
        passHref
      >
        <div className="p-6 cursor-pointer">
          <img src="/images/rasteiras.png" className="lg:h-40 lg:w-40 w-32 h-32 rounded-full" />
          <p className="text-center">Rasteiras</p>
        </div>
      </Link>
    </div>
  </section>
);

export default Categories;
