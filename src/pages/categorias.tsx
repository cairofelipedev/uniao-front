import { NextPage, InferGetStaticPropsType, GetStaticProps } from 'next';
import Categories from '@/components/Category/Categories.component';
import Layout from '@/components/Layout/Layout.component';
import client from '@/utils/apollo/ApolloClient';
import { FETCH_ALL_CATEGORIES_QUERY } from '@/utils/gql/GQL_QUERIES';

interface Category {
  id: string;
  name: string;
  slug: string;
}

/**
 * Category page displays all of the categories
 */
const Categorias: NextPage = ({
  categories,
}: InferGetStaticPropsType<typeof getStaticProps>) => (
  <Layout title="Categorias">
    {categories && <Categories categories={categories.filter((category: Category) => category.name !== 'Sem categoria')} />}
  </Layout>
);

export default Categorias;

export const getStaticProps: GetStaticProps = async () => {
  const result = await client.query({
    query: FETCH_ALL_CATEGORIES_QUERY,
  });

  return {
    props: {
      categories: result.data.productCategories.nodes,
    },
    revalidate: 10,
  };
};
