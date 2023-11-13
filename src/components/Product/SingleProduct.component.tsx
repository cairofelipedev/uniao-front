/*eslint complexity: ["error", 20]*/
// Imports
import { useState, useEffect } from 'react';

// Utils
import { filteredVariantPrice, paddedPrice } from '@/utils/functions/functions';

// Components
import AddToCart, { IProductRootObject } from './AddToCart.component';
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner.component';

const SingleProduct = ({ product }: IProductRootObject) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedVariation, setSelectedVariation] = useState<number>();

  const placeholderFallBack = 'https://via.placeholder.com/600';

  let DESCRIPTION_WITHOUT_HTML;

  useEffect(() => {
    setIsLoading(false);
    if (product.variations) {
      const firstVariant = product.variations.nodes[0].databaseId;
      setSelectedVariation(firstVariant);
    }
  }, [product.variations]);

  let { description, image, name, onSale, price, regularPrice, salePrice } =
    product;

  // Add padding/empty character after currency symbol here
  if (price) {
    price = paddedPrice(price, 'R$');
  }
  if (regularPrice) {
    regularPrice = paddedPrice(regularPrice, 'R$');
  }
  if (salePrice) {
    salePrice = paddedPrice(salePrice, 'R$');
  }

  // Strip out HTML from description
  if (process.browser) {
    DESCRIPTION_WITHOUT_HTML = new DOMParser().parseFromString(
      description,
      'text/html',
    ).body.textContent;
  }



  return (
    <section className="py-8 bg-white mb-12 sm:mb-2">
      {/* Show loading spinner while loading, and hide content while loading */}
      {isLoading ? (
        <div className="h-56 mt-20">
          <p className="text-2xl font-bold text-center">Carregando produto ...</p>
          <br />
          <LoadingSpinner />
        </div>
      ) : (
        <div className="max-w-screen-lg flex flex-wrap items-center pt-4 pb-12 mx-auto">
          <div className="grid grid-cols-1 gap-4 mt-16 lg:grid-cols-2 xl:grid-cols-2 md:grid-cols-2 sm:grid-cols-2">
            {image && (
              <img
                id="product-image"
                src={image.sourceUrl}
                alt={name}
                className="h-auto p-8 transition duration-500 ease-in-out transform xl:p-2 md:p-2 lg:p-2 hover:grow hover:scale-105"
              />
            )}
            {!image && (
              <img
                id="product-image"
                src={
                  process.env.NEXT_PUBLIC_PLACEHOLDER_LARGE_IMAGE_URL ??
                  placeholderFallBack
                }
                alt={name}
                className="h-auto p-8 transition duration-500 ease-in-out transform xl:p-2 md:p-2 lg:p-2 hover:grow hover:shadow-lg hover:scale-105"
              />
            )}
            <div className="ml-8">
              <p className="text-3xl font-semibold text-left">{name}</p>
              <br />
              {/* Display sale price when on sale */}
              {onSale && (
                <div>
                  <p>A União Calçados garante a sua compra, do pedida à entrega</p>
                  <p className="pt-1 mt-4 text-4xl text-gray-900 font-semibold">
                    {product.variations && filteredVariantPrice(price, '')}
                    {!product.variations && salePrice} no PIX
                  </p>
                  <p className="pt-1 mt-4 text-2xl text-gray-700">
                    Ou {product.variations && filteredVariantPrice(price, 'right')}
                    {!product.variations && regularPrice} à prazo
                  </p>
                </div>
              )}

              <div className="pt-1 mt-2">
                {
                  // Display default AddToCart button if we do not have variations.
                  // If we do, send the variationId to AddToCart button
                }
                {product.variations && (
                  <AddToCart
                    product={product}
                    variationId={selectedVariation}
                  />
                )}
                {!product.variations && <AddToCart product={product} />}
              </div>
            </div>
          </div>
          <p className="pt-1 mt-4 text-2xl text-white">
            {DESCRIPTION_WITHOUT_HTML}
          </p>
        </div>
      )}
    </section>
  );
};

export default SingleProduct;
