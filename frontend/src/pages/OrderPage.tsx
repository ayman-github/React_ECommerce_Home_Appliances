import { useEffect } from 'react'
import { useGetOrder } from '../services/api/useOrder'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async';
import CheckoutSteps from '../components/shipping/Checkout';
//import { Store } from '../AppStateContext';
import ReviewCard from '../components/shipping/ReviewCard';
import { getError } from '../utils/error';
import { Button } from '../components/ui/Button';
import { useGetPaypalKey, usePaypalPay } from '../services/api/usePay';
import { 
    DISPATCH_ACTION, 
    PayPalButtons, 
    PayPalButtonsComponentProps, 
    SCRIPT_LOADING_STATE, 
    usePayPalScriptReducer 
} from '@paypal/react-paypal-js';

import { ApiError } from '../types/ApiError';
import Spinner from '../assets/spinner/Spinner';

export default function OrderPage() {

    const { id: orderId } = useParams();

    //const navigate = useNavigate();

    //const { state: { cart }, dispatch } = useContext(Store);

    const {
      data: orderData,
      //isPending: isOrderPending,
      isError,
      error,
      refetch,
    } = useGetOrder(orderId!);

    const {mutateAsync: payOrder, isPending: isPayLoading} = usePaypalPay();
    const [{isPending, isRejected}, paypalDispatch ] = usePayPalScriptReducer();
    const { data: paypalKey } = useGetPaypalKey();

    const testPay = async () => {
        await payOrder({ orderId: orderId! })
        refetch();
    }

    useEffect(() => {
        if (paypalKey && paypalKey.clientId) {
          const loadPaypalScript = async () => {
            paypalDispatch({
              type: DISPATCH_ACTION.RESET_OPTIONS,
              value: {
                'clientId': paypalKey!.clientId,
                currency: 'USD',
              },
            })
            paypalDispatch({
              type: DISPATCH_ACTION.LOADING_STATUS, 
              value: SCRIPT_LOADING_STATE.PENDING,
            })
          }
          loadPaypalScript()
        }
      }, [paypalKey]);

      const paypalButtonTransactionProps: PayPalButtonsComponentProps = {
        style: { layout: 'vertical' },
        async createOrder(data, actions) {
          return actions.order
            .create({
              intent: "CAPTURE",
              purchase_units: [
                {
                  amount: {
                    value: orderData!.totalPrice?.toString(), 
                    currency_code: 'USD',
                  },
                },
              ],
            })
            .then((orderID: string) => {
              return orderID
            })
        },
        async onApprove (data, actions)  {
          return actions.order!.capture().then(async (details) => {
            try {
              await payOrder({ orderId: orderId!, ...details })
              refetch()
              //toast.success('Order is paid')
              console.log('Order is paid');
            } catch (error) {
              //toast.error(getError(err as ApiError))
              console.log(getError(error as ApiError));
            }
          })
        },
        onError: (error: unknown) => {
          //toast.error(getError(err as ApiError))
          console.log(getError(error as ApiError));
        },
    }

  return (

    <>
        <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
        <Helmet>
            <title>Order</title>
        </Helmet>
        <h1 className="w-[90%] mx-auto text-4xl my-5">Order {orderId}</h1>

        <div className='flex w-[90%] mx-auto gap-5'>
            <section key={1} className='w-[60%]'>
                <ReviewCard 
                    title= 'Shipping Address' 
                    name= {orderData?.shippingAddress[0].fullName} 
                    address={orderData?.shippingAddress[0].address}
                    isDelivery={false}
                />
                <ReviewCard 
                    title= 'Payment Method' 
                    name= {orderData?.paymentMethod}
                    isPaid={orderData?.isPaid}
                    paidAt={orderData?.isPaid ? orderData?.paidAt : ''}
                />
                <ReviewCard 
                    title= 'Items Order'
                    orderItems={orderData?.orderItems}
                />
            </section>

            <section key={2} className='w-[40%]'>
                <div className='my-2 w-full p-2
                        rounded-md border-solid border-[0.5px] border-gray-300 dark:border-gray-700'>
                    <h1 className="w-[95%] mx-auto text-xl my-5">Order Summary</h1>

                    <div className="w-[95%] mx-auto divide-y-[0.5px] divide-gray-300 dark:divide-gray-700">
                            <div className='py-2 grid grid-cols-2'>
                                <div>Items</div>
                                <div>${orderData?.itemsPrice}</div>  
                            </div>
                            <div className='py-2 grid grid-cols-2'>
                                <div>Shipping Cost</div>
                                <div>${orderData?.shippingPrice}</div>
                            </div>
                            <div className='py-2 grid grid-cols-2'>
                                <div>Tax</div>
                                <div>${orderData?.taxPrice}</div>
                            </div>
                            <div className='py-2 grid grid-cols-2 font-bold'>
                                <div>Total Amount</div>
                                <div>${orderData?.totalPrice}</div>
                            </div>
                    </div>

                    <div className='w-[95%] mx-auto mt-3'>
                        {
                            isError && <div className='text-red-600 p-2'>{getError(error)}</div>
                        }

                        { !orderData?.isPaid && <>
                            { isPending 
                                ? <Spinner />
                                : isRejected 
                                ? <div className='text-red-500'>Error in connecting to PayPal</div>
                                : <div>
                                    <PayPalButtons
                                    {...paypalButtonTransactionProps}
                                    ></PayPalButtons>

                                  </div>
                            }
                            {/* {isPayLoading && <Spinner />} */}
                            <Button 
                                onClick={testPay} 
                                title='Test Pay' 
                                variant={'primary'}
                                isLoading={isPayLoading ? true : false}
                            />
                        </>}

                    </div>
                </div>

            </section>

        </div>
    </>
  )
}
