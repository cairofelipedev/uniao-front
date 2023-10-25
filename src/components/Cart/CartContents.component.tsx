/*eslint complexity: ["error", 20]*/
// Imports
import { useContext, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';

// State
import { CartContext } from '@/stores/CartProvider';

// Components
import Button from '@/components/UI/Button.component';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner.component';

// Utils
import {
  getFormattedCart,
  getUpdatedItems,
  handleQuantityChange,
  IProductRootObject,
} from '@/utils/functions/functions';

// GraphQL
import { GET_CART } from '@/utils/gql/GQL_QUERIES';
import { UPDATE_CART } from '@/utils/gql/GQL_MUTATIONS';

/**
 * Renders cart contents.
 * @function CartContents
 * @returns {JSX.Element} - Rendered component
 */
const CartContents = () => {
  const router = useRouter();

  const { setCart } = useContext(CartContext);

  const isCheckoutPage = router.pathname === '/finalizar-pedido';

  // Get cart data query
  const { data, refetch } = useQuery(GET_CART, {
    notifyOnNetworkStatusChange: true,
    onCompleted: () => {
      // Update cart in the localStorage.
      const updatedCart = getFormattedCart(data);

      if (!updatedCart && !data.cart.contents.nodes.length) {
        // Clear the localStorage if we have no remote cart

        localStorage.removeItem('woocommerce-cart');
        setCart(null);
        return;
      }

      localStorage.setItem('woocommerce-cart', JSON.stringify(updatedCart));

      // Update cart data in React Context.
      setCart(updatedCart);
    },
  });

  // Update Cart Mutation.
  const [updateCart, { loading: updateCartProcessing }] = useMutation(
    UPDATE_CART,
    {
      onCompleted: () => {
        refetch();
        setTimeout(() => {
          refetch();
        }, 3000);
      },
    },
  );

  const handleRemoveProductClick = (
    cartKey: string,
    products: IProductRootObject[],
  ) => {
    if (products.length) {
      // By passing the newQty to 0 in updateCart Mutation, it will remove the item.
      const newQty = 0;
      const updatedItems = getUpdatedItems(products, newQty, cartKey);

      updateCart({
        variables: {
          input: {
            clientMutationId: uuidv4(),
            items: updatedItems,
          },
        },
      });
    }

    refetch();

    setTimeout(() => {
      refetch();
    }, 3000);
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <>
      <section className="py-8  mt-10">
        <div className="container flex flex-wrap items-center mx-auto">
          {data?.cart?.contents?.nodes.length ? (
            data.cart.contents.nodes.map((item: IProductRootObject) => (
              <div
                className="container mx-auto mt-4 flex flex-wrap flex-row justify-around items-center content-center m-w-[1380px] border border-gray-300 rounded-lg shadow
               "
                key={item.key}
              >
                <div className="lg:m-2 xl:m-4 xl:w-1/6 lg:w-1/6 sm:m-2 w-auto">
                  <span className="block mt-2 font-extrabold">
                    Excluir: <br />
                  </span>
                  <span className="inline-block mt-4 w-20 h-12 md:w-full lg:w-full xl:w-full">
                    <Button
                      color="red"
                      buttonDisabled={updateCartProcessing}
                      handleButtonClick={() =>
                        handleRemoveProductClick(
                          item.key,
                          data.cart.contents.nodes,
                        )
                      }
                    >
                      Excluir
                    </Button>
                  </span>
                </div>
                <div className="lg:m-2 xl:m-4 xl:w-1/6 lg:w-1/6 sm:m-2 w-auto">
                  <span className="block mt-2 font-extrabold">
                    Nome: <br />
                  </span>
                  <span className="inline-block mt-4 w-20 h-12 md:w-full lg:w-full xl:w-full">
                    {item.product.node.name}
                  </span>
                </div>
                <div className="lg:m-2 xl:m-4 xl:w-1/6 lg:w-1/6 sm:m-2 w-auto">
                  <span className="block mt-2 font-extrabold">
                    Quantidade: <br />
                  </span>
                  <span className="inline-block mt-4 w-20 h-12 md:w-full lg:w-full xl:w-full">
                    <input
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(event) => {
                        handleQuantityChange(
                          event,
                          item.key,
                          data.cart.contents.nodes,
                          updateCart,
                          updateCartProcessing,
                        );
                      }}
                    />
                  </span>
                </div>
                <div className="lg:m-2 xl:m-4 xl:w-1/6 lg:w-1/6 sm:m-2 w-auto">
                  <span className="block mt-2 font-extrabold">
                    Total: <br />
                  </span>
                  <span className="inline-block mt-4 w-20 h-12 md:w-full lg:w-full xl:w-full">
                    {item.subtotal}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <h1 className="text-2xl font-bold mx-auto">
              Nenhum produto no carrinho
            </h1>
          )}
          {updateCartProcessing && (
            <div className="mt-4 w-full">
              <div className="text-xl mx-auto text-center">
                Oppdaterer antall, vennligst vent ...
                <LoadingSpinner />
              </div>
            </div>
          )}
          {!isCheckoutPage && data?.cart?.contents?.nodes.length ? (
            <div className="mt-4 mx-auto">
              <Link href="/finalizar-pedido" passHref>
                <Button>IR PARA PAGAMENTO</Button>
              </Link>
            </div>
          ) : null}
        </div>
      </section>
      <div className="h-screen bg-gray-100 pt-20">
        <h1 className="mb-10 text-center text-2xl font-bold">Carrinho de compras</h1>
        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
          <div className="rounded-lg md:w-2/3">
            {data?.cart?.contents?.nodes.length ? (
              data.cart.contents.nodes.map((item: IProductRootObject) => (
                <div key={item.key} className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                  <img src={item.product.node.image.sourceUrl}
                    alt={item.product.node.name} className="w-full rounded-lg sm:w-40" />
                  <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                    <div className="mt-5 sm:mt-0">
                      <h2 className="text-lg font-bold text-gray-900">{item.product.node.name}</h2>
                      <button className="mt-6 w-20 rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">Excluir</button>
                    </div>
                    <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                      <div className="flex items-center border-gray-100">
                        <div>
                          <h2 className="text-lg font-bold text-gray-900">Qtd</h2>
                          <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(event) => {
                              handleQuantityChange(
                                event,
                                item.key,
                                data.cart.contents.nodes,
                                updateCart,
                                updateCartProcessing,
                              );
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <h1 className="text-2xl font-bold mx-auto">
                Nenhum produto no carrinho
              </h1>
            )}
            {updateCartProcessing && (
              <div className="mt-4 w-full">
                <div className="text-xl mx-auto text-center">
                  Oppdaterer antall, vennligst vent ...
                  <LoadingSpinner />
                </div>
              </div>
            )}
            {!isCheckoutPage && data?.cart?.contents?.nodes.length ? (
              <div className="mt-4 mx-auto">
                <Link href="/finalizar-pedido" passHref>
                  <Button>IR PARA PAGAMENTO</Button>
                </Link>
              </div>
            ) : null}
          </div>
          <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
            <div className="mb-2 flex justify-between">
              <p className="text-gray-700">Subtotal</p>
              <p className="text-gray-700">$129.99</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-700">Shipping</p>
              <p className="text-gray-700">$4.99</p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between">
              <p className="text-lg font-bold">Total</p>
              <div className="">
                <p className="mb-1 text-lg font-bold">$134.98 USD</p>
                <p className="text-sm text-gray-700">including VAT</p>
              </div>
            </div>
            <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">Check out</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartContents;
