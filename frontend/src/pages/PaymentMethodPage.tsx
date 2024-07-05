import React, { useContext, useEffect, useState } from 'react'
import { Store } from '../AppStateContext'
import { useNavigate } from 'react-router-dom'
import CheckoutSteps from '../components/shipping/Checkout';
import { Helmet } from 'react-helmet-async';
import Checkbox from '../components/ui/CheckBox';
import { Button } from '../components/ui/Button';

export default function PaymentMethodPage() {

    const navigate = useNavigate();

    const { 
        state: {
            cart: { 
                shippingAddress, 
                paymentMethod 
            } ,
        }, 
        dispatch,
    } = useContext(Store);

    const [paymentMethodName, setPaymentMethod] = useState(
      paymentMethod || 'PayPal'
    )

    useEffect(() => {
      if (!shippingAddress.address) {
        navigate('/shipping')
      }
    }, [shippingAddress, navigate]);

    const submit = () => {
      dispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethodName })
      localStorage.setItem('paymentMethod', paymentMethodName)
      navigate('/placeorder')
    }

    const options = [
        {key: '10' , label: 'PayPal'},
        {key: '20' , label: 'Visa'},
        {key: '30' , label: 'Other'},      
    ]

    return (
        <>
            <CheckoutSteps step1 step2 step3></CheckoutSteps>
            <Helmet>
                <title>Payment Method</title>
            </Helmet>

            <div className='w-[50%] mx-auto my-5'>
                <div className='text-3xl py-5'> Payment Method </div>
                <Checkbox options={options} setOfState={setPaymentMethod} initOption={paymentMethod}/>
                <Button title='Continue' variant={'primary'} onClick={submit} className='mt-5'/>
            </div>
        </>
    )
}
