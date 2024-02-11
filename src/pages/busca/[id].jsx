// pages/categoria/[id].tsx

import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { GET_PRODUCTS_FROM_SEARCH } from '@/utils/gql/GQL_QUERIES';
import client from '@/utils/apollo/ApolloClient'; // Importe o cliente Apollo

const Search = () => {
  const router = useRouter();
  const { id } = router.query;

  const { loading, error, data } = useQuery(GET_PRODUCTS_FROM_SEARCH, {
    client, // Utilize o cliente Apollo importado
    variables: { search: id } // Passe o parâmetro da categoria para a consulta GraphQL
  });

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Ocorreu um erro ao carregar os produtos da categoria.</p>;

  // Renderize os produtos da categoria com base nos dados recebidos
  const products = data.products.nodes;

  return (
    <div>
      <h1>Produtos: {id}</h1>
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