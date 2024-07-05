import React, { ChangeEvent, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Store } from '../AppStateContext'
import { Helmet } from 'react-helmet-async'
import CheckoutSteps from '../components/shipping/Checkout'
import { ShippingAddress } from '../types/Cart'
import { Form, Formik } from 'formik'
import Input from '../components/ui/Input'
import { MdEmail } from 'react-icons/md'
import { Button } from '../components/ui/Button'

export default function ShippingPage() {
    const navigate = useNavigate()
    const { state : { userInfo, cart: { shippingAddress } }, dispatch } = useContext(Store)

    const shippingInfo: ShippingAddress = {
        fullName: shippingAddress.fullName || '',
        address: shippingAddress.address || '',
        city: shippingAddress.city || '',
        postalCode: shippingAddress.postalCode || '',
        country: shippingAddress.country || '',
    }

    const [ shipping, setShipping ] = useState(shippingInfo);

    const {
        fullName, 
        address, 
        city, 
        country, 
        postalCode
    } = shipping;

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setShipping({ ...shipping, [name]: value });
        //console.log("name: " + name + " value: " + value);
    };

    useEffect(() => {
      if (!userInfo) {
        navigate('/login?redirect=/shipping')
      }
    }, [userInfo, navigate]);

    const submit = async () => {
        dispatch({
          type: 'SAVE_SHIPPING_ADDRESS',
          payload: {
            fullName,
            address,
            city,
            postalCode,
            country,
           // location: shippingAddress.location,
          },
        })
        localStorage.setItem(
          'shippingAddress',
          JSON.stringify({
            fullName,
            address,
            city,
            postalCode,
            country,
           // location: shippingAddress.location,
          })
        );
        navigate('/payment')
    }

    return (
        <>
            <Helmet>
                <title> Shipping </title>
            </Helmet>
            <CheckoutSteps step1 step2></CheckoutSteps>

            <div className="border-solid bg-white dark:bg-black p-5 w-[50%] mx-auto mt-3">
                <div className="mt-2 mb-5 text-2xl font-bold dark:text-gray-300"> Shipping Address</div>

                <Formik 
                enableReinitialize 
                initialValues={shippingInfo}
                //validationSchema={loginValidation}
                onSubmit={submit}
                >
                    <Form>
                        <Input
                            type="text"
                            name="fullName"
                            label="Full Name"
                            placeholder="Full Name"
                            icon= {<MdEmail />}
                            onInput={handleChange} 
                        />
                        <Input
                            type="text"
                            name="address"
                            label="Address"
                            placeholder="Address"
                            onInput={handleChange}
                            icon= {< MdEmail  />}
                        />
                        <Input
                            type="text"
                            name="city"
                            label="City"
                            placeholder="City"
                            onInput={handleChange}
                            icon= {< MdEmail  />}
                        />
                        {/* <Input
                            type="text"
                            name="city"
                            label="City"
                            placeholder="City"
                            onInput={handleChange}
                            icon= {< MdEmail  />}
                        /> */}
                        <Input
                            type="text"
                            name="country"
                            label="Country"
                            placeholder="Country"
                            onInput={handleChange}
                            icon= {< MdEmail  />}
                        />
                        <Input
                            type="text"
                            name="postalCode"
                            label="Postal Code"
                            placeholder="Postal Code"
                            onInput={handleChange}
                            icon= {< MdEmail  />}
                        />
                        <Button type="submit" title="Continue" variant={'primary'} className='mt-3' />
                    </Form>
                </Formik>
            </div>

        </>
    )
}
