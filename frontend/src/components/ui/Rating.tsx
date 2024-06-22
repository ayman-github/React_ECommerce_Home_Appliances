import React, { useEffect, useState } from 'react'
import { MdOutlineStarBorder } from "react-icons/md";
import { MdOutlineStar } from "react-icons/md";


export default function Rating( { rating } : { rating : number} ) {
  
  const [ rate, setRate ] = useState(0);

  useEffect(()=>{
    setRate(rating);
  },[]);

  return (
    <div className='flex text-2xl'>

      <span onClick={()=> setRate(1)}> 
        { rate >= 1 ? <MdOutlineStar className='text-amber-500'/> : <MdOutlineStarBorder className='text-amber-500'/> }
      </span>
      <span onClick={()=> setRate(2)}> 
        { rate >= 2 ? <MdOutlineStar className='text-amber-500'/> : <MdOutlineStarBorder className='text-amber-500'/> }
      </span>
      <span onClick={()=> setRate(3)}> 
        { rate >= 3 ? <MdOutlineStar className='text-amber-500'/> : <MdOutlineStarBorder className='text-amber-500'/> }
      </span>
      <span onClick={()=> setRate(4)}> 
        { rate >= 4 ? <MdOutlineStar className='text-amber-500'/> : <MdOutlineStarBorder className='text-amber-500'/> }
      </span>
      <span onClick={()=> setRate(5)}> 
        { rate >= 5 ? <MdOutlineStar className='text-amber-500'/> : <MdOutlineStarBorder className='text-amber-500'/> }
      </span>

    </div>
  )
}
