/*eslint complexity: ["error", 20]*/
// Imports
import { useState, useContext, useEffect } from 'react';
import { useQuery, useMutation, ApolloError } from '@apollo/client';

// Components
import Billing from './Billing.component';
import CartContents from '../Cart/CartContents.component';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner.component';

// GraphQL
import { GET_CART } from '@/utils/gql/GQL_QUERIES';
import { CHECKOUT_MUTATION } from '@/utils/gql/GQL_MUTATIONS';
import { CartContext } from '@/stores/CartProvider';

// Utils
import {
  getFormattedCart,
  createCheckoutData,
  ICheckoutDataProps,
} from '@/utils/functions/functions';

export interface IBilling {
  firstName: string;
  lastName: string;
  address1: string;
  city: string;
  postcode: string;
  email: string;
  phone: string;
}

export interface IShipping {
  firstName: string;
  lastName: string;
  address1: string;
  city: string;
  postcode: string;
  email: string;
  phone: string;
}

export interface ICheckoutData {
  clientMutationId: string;
  billing: IBilling;
  shipping: IShipping;
  shipToDifferentAddress: boolean;
  paymentMethod: string;
  isPaid: boolean;
  transactionId: string;
}

const CheckoutForm = () => {
  const { cart, setCart } = useContext(CartContext);
  const [orderData, setOrderData] = useState<ICheckoutData | null>(null);
  const [requestError, setRequestError] = useState<ApolloError | null>(null);
  const [orderCompleted, setorderCompleted] = useState<boolean>(false);

  // Get cart data query
  const { data, refetch } = useQuery(GET_CART, {
    notifyOnNetworkStatusChange: true,
    onCompleted: () => {
      // Update cart in the localStorage.
      const updatedCart = getFormattedCart(data);

      if (!updatedCart && !data.cart.contents.nodes.length) {
        localStorage.removeItem('woo-session');
        localStorage.removeItem('wooocommerce-cart');
        setCart(null);
        return;
      }

      localStorage.setItem('woocommerce-cart', JSON.stringify(updatedCart));

      // Update cart data in React Context.
      setCart(updatedCart);
    },
  });

  // Checkout GraphQL mutation
  const [checkout, { loading: checkoutLoading }] = useMutation(
    CHECKOUT_MUTATION,
    {
      variables: {
        input: orderData,
      },
      onCompleted: () => {
        localStorage.removeItem('woo-session');
        localStorage.removeItem('wooocommerce-cart');
        setorderCompleted(true);
        setCart(null);
        refetch();
      },
      onError: (error) => {
        setRequestError(error);
        refetch();
      },
    },
  );

  useEffect(() => {
    if (null !== orderData) {
      // Perform checkout mutation when the value for orderData changes.
      checkout();
      setTimeout(() => {
        refetch();
      }, 2000);
    }
  }, [checkout, orderData, refetch]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleFormSubmit = (submitData: ICheckoutDataProps) => {
    const checkOutData = createCheckoutData(submitData);

    setOrderData(checkOutData);
    setRequestError(null);
  };

  return (
    <>
      {cart && !orderCompleted ? (
        <div className="container mx-auto">

          {/*	Order*/}
          <div class="w-full bg-white border-t border-b border-gray-200 px-5 py-10 text-gray-800">
            <div class="w-full">
              <div class="-mx-3 md:flex items-start">
                <div class="px-3 md:w-7/12 lg:pr-10">
                  <CartContents />

                </div>
                <div class="px-3 md:w-5/12">
                  <Billing handleFormSubmit={handleFormSubmit} />
                  <div class="w-full mx-auto rounded-lg bg-white border border-gray-200 text-gray-800 font-light mb-6">
                    <div class="w-full p-3 border-b border-gray-200">
                      <div class="mb-5">
                        <label for="type1" class="flex items-center cursor-pointer">
                          <input type="radio" class="form-radio h-5 w-5 text-indigo-500" name="type" id="type1" checked />
                          <img src="https://leadershipmemphis.org/wp-content/uploads/2020/08/780370.png" class="h-6 ml-3" />
                        </label>
                      </div>
                      <div>
                        <div class="mb-3">
                          <label class="text-gray-600 font-semibold text-sm mb-2 ml-1">Name on card</label>
                          <div>
                            <input class="w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors" placeholder="John Smith" type="text" />
                          </div>
                        </div>
                        <div class="mb-3">
                          <label class="text-gray-600 font-semibold text-sm mb-2 ml-1">Card number</label>
                          <div>
                            <input class="w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors" placeholder="0000 0000 0000 0000" type="text" />
                          </div>
                        </div>
                        <div class="mb-3 -mx-2 flex items-end">
                          <div class="px-2 w-1/4">
                            <label class="text-gray-600 font-semibold text-sm mb-2 ml-1">Expiration date</label>
                            <div>
                              <select class="form-select w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer">
                                <option value="01">01 - January</option>
                                <option value="02">02 - February</option>
                                <option value="03">03 - March</option>
                                <option value="04">04 - April</option>
                                <option value="05">05 - May</option>
                                <option value="06">06 - June</option>
                                <option value="07">07 - July</option>
                                <option value="08">08 - August</option>
                                <option value="09">09 - September</option>
                                <option value="10">10 - October</option>
                                <option value="11">11 - November</option>
                                <option value="12">12 - December</option>
                              </select>
                            </div>
                          </div>
                          <div class="px-2 w-1/4">
                            <select class="form-select w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer">
                              <option value="2020">2020</option>
                              <option value="2021">2021</option>
                              <option value="2022">2022</option>
                              <option value="2023">2023</option>
                              <option value="2024">2024</option>
                              <option value="2025">2025</option>
                              <option value="2026">2026</option>
                              <option value="2027">2027</option>
                              <option value="2028">2028</option>
                              <option value="2029">2029</option>
                            </select>
                          </div>
                          <div class="px-2 w-1/4">
                            <label class="text-gray-600 font-semibold text-sm mb-2 ml-1">Security code</label>
                            <div>
                              <input class="w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors" placeholder="000" type="text" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="w-full p-3">
                      <label for="type2" class="flex items-center cursor-pointer">
                        <input type="radio" class="form-radio h-5 w-5 text-indigo-500" name="type" id="type2" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" width="80" class="ml-3" />
                      </label>
                    </div>
                  </div>
                  <div>
                    <button class="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-2 font-semibold"><i class="mdi mdi-lock-outline mr-1"></i> PAY NOW</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <CartContents />
          {/*Payment Details*/}
          {/*Error display*/}
          {requestError && (
            <div className="h-32 text-xl text-center text-red-600">
              En feil har oppstått.
            </div>
          )}
          {/* Checkout Loading*/}
          {checkoutLoading && (
            <div className="text-xl text-center">
              Behandler ordre, vennligst vent ...
              <LoadingSpinner />
            </div>
          )}
        </div>
      ) : (
        <>
          {!cart && !orderCompleted && (
            <h1 className="text-2xl m-12 mt-24 font-bold text-center">
              Nenhum produto no carrinho
            </h1>
          )}
          {orderCompleted && (
            <div className="container h-24 m-12 mx-auto mt-24 text-xl text-center">
              Takk for din ordre!
            </div>
          )}
        </>
      )}
    </>
  );
};

export default CheckoutForm;
