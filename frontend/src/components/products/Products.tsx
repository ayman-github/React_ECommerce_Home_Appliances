//import React from 'react'
import { Product } from '../../types/Product';
import { useProducts } from '../../services/api/useProducts';
import ProductCard from './ProductCard';

export default function Products( ) {
    const { data: productData } = useProducts();

  return (

    <div className="w-full grid grid-cols-4 gap-2 p-5">
        { productData && 
            productData?.map((product: Product, index: number)=>(
                <div key={index} className='bg-gray-200 dark:bg-gray-900'>
                    <ProductCard product={product}/>                 
                </div>
            ))
        }
    </div>
  )
}
