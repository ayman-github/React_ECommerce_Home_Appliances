//import React from 'react'
import { useContext } from 'react'
import { Helmet } from 'react-helmet-async'
import { Store } from '../AppStateContext'
import { CartItem } from '../types/Cart';
import { Link, useNavigate } from 'react-router-dom';
import productImg from '../assets/tv.webp'

import { FaMinusCircle, FaPlusCircle, /*FaRegTrashAlt*/ } from "react-icons/fa";
import { Button } from '../components/ui/Button';


export default function CartPage() {

  const { state: { cart: { cartItems } }, dispatch } = useContext(Store);
  const navigate = useNavigate();

  const updateCart = async (item: CartItem, quantity: number) => {
    if (item.countInStock < quantity) {
      //toast.warn('Sorry. Product is out of stock')
      return
    }
    dispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    })
  }

  const removeItem = (item: CartItem) => {
    dispatch({ type: 'CART_REMOVE_ITEM', payload: item })
  }

  return (
    <div className='w-[90%] mx-auto'>
        <Helmet> <title>Shopping Cart</title></Helmet>
        <h1 className='mt-5 text-3xl font-semibold'>Shopping Cart</h1>


            <div className='flex gap-10 mt-5'>
                <section key={1} className='w-full h-fit border-[1px] border-solid border-gray-300 bg-gray-50 dark:bg-gray-800 rounded-lg '>
                    {cartItems.length === 0 ? (
                        <div className='p-5 flex gap-2'>
                            <span>Shopping Cart is empty.</span> 
                            <Link to="/" className='text-blue-500'>Go to Shopping</Link>
                        </div>
                    ) : (
                        <div className='divide-y-gray-300 mt-3 mb-3 px-5 divide-y-[1px] divide-gray-300 dark:divide-gray-600'>
                            {cartItems.map((item: CartItem, index: number) => (
                                <div key={index} className='grid grid-cols-4 gap-5 items-center py-3'>
                                    <div className='flex gap-3 whitespace-nowrap items-center'>
                                        <img src={productImg} alt={item.name} width={100} />
                                        <Link to={`/product/${item._id}`}>{item.name}</Link>
                                    </div>

                                    <div className='grid grid-cols-3 place-items-center place-content-center gap-2 w-[50%] mx-auto'>
                                        <button
                                            disabled={item.quantity === 1} 
                                            onClick={() => updateCart(item, item.quantity - 1)}
                                        ><FaMinusCircle className='text-xl hover:ring-4 hover:ring-red-500 rounded-full'/></button>                      
                                        <div>{item.quantity}</div>
                                        <button
                                            disabled={item.quantity === item.countInStock}  
                                            onClick={() => updateCart(item, item.quantity + 1)}
                                        ><FaPlusCircle className='text-xl hover:ring-4 hover:ring-blue-500 rounded-full'/></button> 
                                    </div>

                                    <div className='flex justify-center'>{item.currency}{item.price} </div>
                                    {/* <div className='flex justify-end'> <FaRegTrashAlt /> </div> */}
                                    <Button 
                                        title='Delete' 
                                        variant={'danger'}
                                        onClick={() => removeItem(item)}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </section>

                <section key={2} className='w-full h-fit border-[1px] border-solid border-gray-300 bg-gray-50 dark:bg-gray-800 rounded-lg '>
                    <h3 className='p-3'>
                        Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}{' '}
                        items) : $
                        {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
                    </h3>
                    <div className='p-3'>
                        <Button 
                            disabled={cartItems.length === 0}
                            variant={'primary'} 
                            title='Checkout'
                            onClick={()=>{navigate('/login?redirect=/cart')}}
                        />
                    </div>
                    
                </section>

            </div>
    </div>
  )
}
