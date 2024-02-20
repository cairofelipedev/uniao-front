// pages/categoria/[id].tsx

import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { GET_PRODUCTS_FROM_SEARCH, GET_PRODUCTS_FROM_SKU } from '@/utils/gql/GQL_QUERIES';
import client from '@/utils/apollo/ApolloClient'; // Importe o cliente Apollo
import Layout from '@/components/Layout/Layout.component';
import Link from 'next/link';
import { filteredVariantPrice } from '@/utils/functions/functions';

const Search = () => {
  const router = useRouter();
  const { id } = router.query;

  // Consulta GraphQL para busca por termo
  const { loading: loadingSearch, error: errorSearch, data: searchData } = useQuery(GET_PRODUCTS_FROM_SEARCH, {
    client, // Utilize o cliente Apollo importado
    variables: { search: id } // Passe o parâmetro da pesquisa para a consulta GraphQL
  });

  // Consulta GraphQL para busca por SKU
  const { loading: loadingSKU, error: errorSKU, data: skuData } = useQuery(GET_PRODUCTS_FROM_SKU, {
    client, // Utilize o cliente Apollo importado
    variables: { sku: id } // Passe o parâmetro do SKU para a consulta GraphQL
  });

  if (loadingSearch || loadingSKU);
  if (errorSearch || errorSKU) return <p>Ocorreu um erro ao carregar os produtos.</p>;

  // Renderize os produtos com base nos dados recebidos
  const searchProducts = searchData?.products.nodes || [];
  const skuProducts = skuData?.products.nodes || [];
  const products = [...searchProducts, ...skuProducts];

  return (
    <Layout title="Busca">
      <div className="mx-auto max-w-screen-xl">
        <h1 className='text-xl mt-10 mb-10'>Resultados da pesquisa para {id}</h1>
        <div id="product-container" className="grid lg:grid-cols-4 grid-cols-2 p-2">
          {products.map(product => (
            <div key={product.id}>
              {product.image ? (
                <img
                  id="product-image"
                  className="transition duration-500 ease-in-out transform cursor-pointer hover:grow hover:shadow-lg hover:scale-105 h-72 w-full"
                  alt={product.name}
                  src={product.image.sourceUrl}
                />
              ) : (
                <img
                  id="product-image"
                  className="transition duration-500 ease-in-out transform cursor-pointer hover:grow hover:shadow-lg hover:scale-105 h-40 w-full"
                  alt={product.name}
                  src={
                    process.env.NEXT_PUBLIC_PLACEHOLDER_SMALL_IMAGE_URL
                  }
                />
              )}
              <Link
                href={`/produto/${encodeURIComponent(
                  product.slug,
                )}?id=${encodeURIComponent(product.databaseId)}`}
              >
                <div className="p-4">
                  <h2 className="mb-2 text-lg font-medium  text-gray-900">{product.name}</h2>
                  {product.onSale && (
                    <div className="flex items-center">
                      <p className="mr-2 text-lg font-semibold text-gray-900">
                        {product.variations && filteredVariantPrice(product.price, '')}
                        {!product.variations && product.salePrice}
                      </p>
                      <p className="text-base  font-medium text-gray-500 line-through">
                        {product.variations && filteredVariantPrice(product.price, 'right')}
                        {!product.variations && product.regularPrice}
                      </p>
                      {/* <p className="ml-auto text-base font-medium text-green-500">20% off</p> */}
                    </div>
                  )}
                  {/* Display regular price when not on sale */}
                  {!product.onSale && (
                    <p className="pt-1 text-center text-gray-900">{product.price}</p>
                  )}
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Search;
