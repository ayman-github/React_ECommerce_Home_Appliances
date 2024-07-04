//import React from 'react'
import { Link } from 'react-router-dom'
import AppTheme from '../../AppTheme'
import { useContext } from 'react'
import { Store } from '../../AppStateContext'
import  cartImg  from '../../assets/cart.png'

export default function NavBar() {
  
  const { state: {/*mode,*/ cart, userInfo }, dispatch } = useContext(Store);

  const logout = () => {
    dispatch({ type: 'USER_LOGOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('cartItems');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    window.location.href = '/login'

  }

  return (
    <div className='bg-black text-gray-300 p-3 flex justify-between items-center px-5'>
        <div>Home Appliances</div>
        <section className='flex gap-5'>
          <Link to="/cart" className="">
              <div className='flex gap-1 relative'>
                <span className='text-xl font-semibold text-white'>Cart</span>
                <img src={cartImg} alt='cart'/>

                <div className={`absolute -top-1 right-[6px] text-white text-xs font-semibold 
                    ${cart.cartItems.length > 0 ? 'bg-orange-500' : ''} w-[18px] h-[18px] rounded-full flex justify-center items-center`}>
                  {cart.cartItems.length > 0 && (
                    <div className=''>
                      {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                    </div>
                  )}
                </div>

              </div>
          </Link>
          <div>
            {
              userInfo 
                && <> 
                      {userInfo?.fullName} 
                      <Link to="#logout" onClick={logout}> Logout </Link> 
                   </>
                || <Link to={'/login'}>Login</Link>
            }
          </div>

          <AppTheme />
        </section>

    </div>
  )
}
