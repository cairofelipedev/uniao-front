/*eslint complexity: ["error", 20]*/
import Link from 'next/link';
import { v4 as uuidv4 } from 'uuid';

import { filteredVariantPrice, paddedPrice } from '@/utils/functions/functions';

interface Image {
  __typename: string;
  sourceUrl?: string;
}

interface Node {
  __typename: string;
  price: string;
  regularPrice: string;
  salePrice?: string;
}

interface Variations {
  __typename: string;
  nodes: Node[];
}

interface RootObject {
  __typename: string;
  databaseId: number;
  name: string;
  onSale: boolean;
  slug: string;
  image: Image;
  price: string;
  regularPrice: string;
  salePrice?: string;
  variations: Variations;
}

interface IDisplayProductsProps {
  products: RootObject[];
}

/**
 * Displays all of the products as long as length is defined.
 * Does a map() over the props array and utilizes uuidv4 for unique key values.
 * @function DisplayProducts
 * @param {IDisplayProductsProps} products Products to render
 * @returns {JSX.Element} - Rendered component
 */

const DisplayProducts = ({ products }: IDisplayProductsProps) => (
  <section className="container mx-auto bg-white">
    <div id="product-container" className="flex flex-wrap items-center">
      {products ? (
        products.map(
          ({
            databaseId,
            name,
            price,
            regularPrice,
            salePrice,
            onSale,
            slug,
            image,
            variations,
          }) => {
            // Add padding/empty character after currency symbol here
            if (price) {
              price = paddedPrice(price, 'kr');
            }
            if (regularPrice) {
              regularPrice = paddedPrice(regularPrice, 'kr');
            }
            if (salePrice) {
              salePrice = paddedPrice(salePrice, 'kr');
            }

            return (
              <div
                key={uuidv4()}
                className="flex flex-col p-6 md:w-1/2 xl:w-1/4"
              >
                <Link
                  href={`/produto/${encodeURIComponent(
                    slug,
                  )}?id=${encodeURIComponent(databaseId)}`}
                >
                  <div className="mx-auto mt-11 w-80 transform overflow-hidden rounded-lg bg-white shadow-md duration-300 hover:scale-105 hover:shadow-lg">
                    <span>
                      {image ? (
                        <img
                          id="product-image"
                          className="transition duration-500 ease-in-out transform cursor-pointer hover:grow hover:shadow-lg hover:scale-105 h-72 w-full"
                          alt={name}
                          src={image.sourceUrl}
                        />
                      ) : (
                        <img
                          id="product-image"
                          className="transition duration-500 ease-in-out transform cursor-pointer hover:grow hover:shadow-lg hover:scale-105 h-40 w-full"
                          alt={name}
                          src={
                            process.env.NEXT_PUBLIC_PLACEHOLDER_SMALL_IMAGE_URL
                          }
                        />
                      )}
                    </span>
                    <div className="p-4">
                      <h2 className="mb-2 text-lg font-medium  text-gray-900">{name}</h2>
                      {onSale && (
                        <div className="flex items-center">
                          <p className="mr-2 text-lg font-semibold text-gray-900">
                            {variations && filteredVariantPrice(price, '')}
                            {!variations && salePrice}
                          </p>
                          <p className="text-base  font-medium text-gray-500 line-through">
                            {variations && filteredVariantPrice(price, 'right')}
                            {!variations && regularPrice}
                          </p>
                          {/* <p className="ml-auto text-base font-medium text-green-500">20% off</p> */}
                        </div>
                      )}
                      {/* Display regular price when not on sale */}
                      {!onSale && (
                        <p className="pt-1 text-center text-gray-900">{price}</p>
                      )}
                    </div>
                  </div>
                </Link>
              </div>
            );
          },
        )
      ) : (
        <div className="mx-auto text-xl font-bold text-center text-gray-800 no-underline uppercase">
          Ingen produto funnet
        </div>
      )}
    </div>
  </section>
);

export default DisplayProducts;
