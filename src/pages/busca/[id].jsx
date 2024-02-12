// pages/categoria/[id].tsx

import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { GET_PRODUCTS_FROM_SEARCH, GET_PRODUCTS_FROM_SKU } from '@/utils/gql/GQL_QUERIES';
import client from '@/utils/apollo/ApolloClient'; // Importe o cliente Apollo

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

  if (loadingSearch || loadingSKU) return <p>Carregando...</p>;
  if (errorSearch || errorSKU) return <p>Ocorreu um erro ao carregar os produtos.</p>;

  // Renderize os produtos com base nos dados recebidos
  const searchProducts = searchData?.products.nodes || [];
  const skuProducts = skuData?.products.nodes || [];
  const products = [...searchProducts, ...skuProducts];

  return (
    <div>
      <h1>Resultados da pesquisa para "{id}" e SKU "{id}"</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
