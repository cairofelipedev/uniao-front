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

// Icons 

import { BiTrash } from "react-icons/bi";

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
      <section>
        <div className="container flex flex-wrap items-center border border-gray-200 rounded-lg bg-white">
          {data?.cart?.contents?.nodes.length ? (
            data.cart.contents.nodes.map((item: IProductRootObject) => (
              <div key={item.key} className='w-full mx-4'>
                <div
                  className="bg-white container mt-4 flex flex-wrap flex-row justify-between items-center content-center">
                  <div className="w-auto flex space-x-2">
                    <img src={item.product.node.image.sourceUrl}
                      alt={item.product.node.name} className="w-20" />
                    <div>
                      <h6 className="font-semibold uppercase text-gray-600">  {item.product.node.name}</h6>
                      <div className="xl:w-1/2 lg:w-1/2  w-auto">
                        <span className="md:w-full lg:w-full xl:w-full flex items-center">
                          X <input
                            className="bg-gray-50  text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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
                    </div>
                  </div>

                  <div className="lg:m-2 xl:m-4 sm:m-2 w-auto flex items-center">
                    <span className="font-semibold text-gray-600 text-xl">{item.subtotal}</span>
                    <div className="lg:m-2 xl:m-4 xl:w-1/6 lg:w-1/6 sm:m-2 w-auto">
                      <span className="inline-block mt-4 w-20 h-12 md:w-full lg:w-full xl:w-full">
                        <Button
                          buttonDisabled={updateCartProcessing}
                          handleButtonClick={() =>
                            handleRemoveProductClick(
                              item.key,
                              data.cart.contents.nodes,
                            )
                          }
                        >
                          <BiTrash />
                        </Button>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mb-6 pb-6 border-b border-gray-200 text-gray-800">
                  <div className="w-full flex mb-3 items-center">
                    <div className="flex-grow">
                      <span className="text-gray-600">Subtotal</span>
                    </div>
                    <div className="pl-3">
                      <span className="font-semibold">{item.subtotal}</span>
                    </div>
                  </div>
                </div>
                <div className="mb-6 pb-6 border-b border-gray-200 md:border-none text-gray-800 text-xl">
                  <div className="w-full flex items-center">
                    <div className="flex-grow">
                      <span className="text-gray-600">Total</span>
                    </div>
                    <div className="pl-3">
                      <span className="font-semibold">{item.subtotal}</span>
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
            <div className="mt-4 mx-auto mb-4">
              <Link href="/finalizar-pedido" passHref>
                <Button>IR PARA PAGAMENTO</Button>
              </Link>
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
};

export default CartContents;
