import { useContext, useEffect } from 'react'
import { getError } from '../utils/error'
import { useCreateOrder } from '../services/api/useOrder'
import { useNavigate } from 'react-router-dom'
import { Store } from '../AppStateContext';
import { Order } from '../types/Order';
import CheckoutSteps from '../components/shipping/Checkout';
import { Helmet } from 'react-helmet-async';
import ReviewCard from '../components/shipping/ReviewCard';
import { Button } from '../components/ui/Button';

export default function PlaceOrderPage() {

    const navigate = useNavigate();

    const { state: { cart, userInfo }, dispatch } = useContext(Store);

    const round2 = (num: number) => Math.round(num * 100 + Number.EPSILON) / 100;
    cart.itemsPrice = round2(
      cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
    );
    cart.shippingPrice = cart.itemsPrice > 100 ? round2(0) : round2(10);
    cart.taxPrice = round2(0.15 * cart.itemsPrice);
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

    const { 
        mutateAsync: createOrder, 
        isPending,
        error,
        isError,
    } = useCreateOrder();

    const userUnknown = userInfo || { email: '',fullName:'', password:''};

    const order: Order = {
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
        user: userUnknown,
    };

    const submit = async () => {
      try {
        const data = await createOrder({
            order: order,
        })
        dispatch({ type: 'CART_CLEAR' })
        localStorage.removeItem('cartItems')
        navigate(`/order/${data.order._id}`)
      } catch (error) {
        //toast.error(getError(err as ApiError))
      }
    }

    useEffect(() => {
      if (!cart.paymentMethod) {
        navigate('/payment')
      }
    }, [cart, navigate]);

  return (
    <>
        <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
        <Helmet>
            <title>Preview Order</title>
        </Helmet>
        <h1 className="w-[90%] mx-auto text-4xl my-5">Preview Order</h1>

        <div className='flex w-[90%] mx-auto gap-5'>

            <section key={1} className='w-[60%]'>
                <ReviewCard 
                    title= 'Shipping Address' 
                    name= {userUnknown.fullName} 
                    address={order?.shippingAddress.address}
                    editLink='shipping'
                />
                <ReviewCard 
                    title= 'Payment Method' 
                    name= {order?.paymentMethod}
                    editLink='payment'
                />
                <ReviewCard 
                    title= 'Items Order'
                    orderItems={cart.cartItems}
                    editLink='cart'
                />
            </section>

            <section key={2} className='w-[40%]'>
                <div className='my-2 w-full p-2
                        rounded-md border-solid border-[0.5px] border-gray-300 dark:border-gray-700'>
                    <h1 className="w-[95%] mx-auto text-xl my-5">Order Summary</h1>

                    <div className="w-[95%] mx-auto divide-y-[0.5px] divide-gray-300 dark:divide-gray-700">
                        <div className='py-2 grid grid-cols-2'>
                            <div>Items</div>
                            <div>${order.itemsPrice}</div>  
                        </div>
                        <div className='py-2 grid grid-cols-2'>
                            <div>Shipping Cost</div>
                            <div>${order.shippingPrice}</div>
                        </div>
                        <div className='py-2 grid grid-cols-2'>
                            <div>Tax</div>
                            <div>${order.taxPrice}</div>
                        </div>
                        <div className='py-2 grid grid-cols-2 font-bold'>
                            <div>Total Amount</div>
                            <div>${order.totalPrice}</div>
                        </div>
                    </div>

                    <div className='w-[95%] mx-auto mt-3'>
                        {
                            isError && <div className='text-red-600 p-2'>{getError(error)}</div>
                        }
                        <Button 
                            title='Place Order' 
                            variant={'primary'} 
                            onClick={submit}
                            isLoading={isPending ? true : false}
                        />  
                    </div>
                </div>

            </section>

        </div>

    </>
  )
}
