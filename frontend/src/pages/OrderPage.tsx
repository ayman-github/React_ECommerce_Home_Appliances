import React, { useContext } from 'react'
import { useGetOrder } from '../services/api/useOrder'
import { useNavigate, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async';
import CheckoutSteps from '../components/shipping/Checkout';
import { Store } from '../AppStateContext';
import ReviewCard from '../components/shipping/ReviewCard';
import { getError } from '../utils/error';
import { Button } from '../components/ui/Button';

export default function OrderPage() {

    const { id: orderId } = useParams();

    const navigate = useNavigate();

    const { state: { cart }, dispatch } = useContext(Store);

    const {
      data: orderData,
      isPending,
      isError,
      error,
      refetch,
    } = useGetOrder(orderId!);


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
                    isPaid={false}
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
                        <Button 
                            title='pay' 
                            variant={'primary'} 
                            //onClick={submit}
                            isLoading={isPending ? true : false}
                        />  
                    </div>
                </div>

            </section>

            </div>
    </>
  )
}
