//import React from 'react'
import { Link } from 'react-router-dom'
import AppTheme from '../../AppTheme'
import { useContext } from 'react'
import { Store } from '../../AppStateContext'

export default function NavBar() {
  
  const { state: {mode, cart}, dispatch } = useContext(Store);

  return (
    <div className='bg-black text-gray-300 p-3 flex justify-between items-center px-5'>
        <div>Home Appliances</div>
        <section>
          <Link to="/cart" className="">
               Cart
               {cart.cartItems.length > 0 && (
                 <div className=''>
                   {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                 </div>
               )}
          </Link>
        </section>
        <div>Profile</div>
        <AppTheme />
    </div>
  )
}
