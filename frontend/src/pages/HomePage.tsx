import React from 'react'
import { sampleProduct } from '../data'
import tvImg from '../assets/tv.webp';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="w-full grid grid-cols-4 gap-2 p-5">
        {
            sampleProduct.map((product, index)=>(
                <Link to={`product/${product.slug}`} >
                    <div key={index} className="bg-gray-200 flex flex-col justify-center">
                        <img className="w-full" src={tvImg}/>
                        <div className="w-full flex justify-center"> {product?.name} </div>
                        <div className="w-full flex justify-center"> {product?.brand} </div>
                        <div className="w-full flex justify-center"> {product?.price} </div>
                    </div>
                </Link>
            ))
        }
  </div>
  )
}
