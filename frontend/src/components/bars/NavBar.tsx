//import React from 'react'
import AppTheme from '../../AppTheme'

export default function NavBar() {
  return (
    <div className='bg-black text-gray-300 p-3 flex justify-between items-center px-5'>
        <div>Home Appliances</div>
        <div>Profile</div>
        <AppTheme />
    </div>
  )
}
