import React from 'react'
import { Link } from 'react-router-dom'
import tvImg from '../../assets/tv.webp';
import Rating from '../ui/Rating';

import { Product } from '../../types/Product';
import { useProducts } from '../../services/api/useProducts';

export default function Products( ) {
    const { data: productData } = useProducts();

  return (

    <div className="w-full grid grid-cols-4 gap-2 p-5">
        { productData && 
            productData?.map((product: Product, index: number)=>(
                <div className='bg-gray-200'>
                    <Link to={`product/${product.slug}`} >
                        <div key={index} className=" flex flex-col justify-center">
                            <img className="w-full" src={tvImg}/>
                            <div className="w-full flex justify-center"> {product?.name} </div>
                            <div className="w-full flex justify-center"> {product?.brand} </div>
                            <div className="w-full flex justify-center"> {product?.price} </div>
                        </div>
                    </Link>
                    <div className="w-full flex justify-center"> 
                        <Rating rating={product?.rating}/> 
                        <span className='text-amber-500 font-semibold'> {product?.reviews} Reviews</span>
                    </div>
                </div>
            ))
        }
    </div>
  )
}
