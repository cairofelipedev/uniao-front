import Link from 'next/link';


const Categories = () => (
    <section className="container mx-auto bg-white">
        <div className="grid gap-2 px-2 pt-2 pb-2 lg:px-0 xl:px-0 md:px-0 lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 xs:grid-cols-3 grid-cols-2">
            <Link
                href={`/categoria/`}
                passHref
            >
                <div className="p-6 cursor-pointer">
                    <img src="/images/Prancheta_14.webp" className="lg:h-80 lg:w-80 lg:rounded-full" />
                </div>
            </Link>
            <Link
                href={`/categoria/`}
                passHref
            >
                <div className="p-6 cursor-pointer">
                    <img src="/images/Prancheta_2.webp" className="lg:h-80 lg:w-80 lg:rounded-full" />
                </div>
            </Link>
            <Link
                href={`/categoria/`}
                passHref
            >
                <div className="p-6 cursor-pointer">
                    <img src="/images/Prancheta_7.webp" className="lg:h-80 lg:w-80 lg:rounded-full" />
                </div>
            </Link>
            <Link
                href={`/categoria/`}
                passHref
            >
                <div className="p-6 cursor-pointer">
                    <img src="/images/Prancheta_8.webp" className="lg:h-80 lg:w-80 lg:rounded-full" />
                </div>
            </Link>
        </div>
    </section>
);

export default Categories;
