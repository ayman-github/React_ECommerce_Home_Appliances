//import React from 'react'
import { /*useNavigate,*/ useParams } from 'react-router-dom'
import { useProduct } from '../services/api/useProducts';
import { Helmet } from 'react-helmet-async'
import productImg from '../assets/tv.webp'
import Rating from '../components/ui/Rating';
import ProductItem from '../components/products/ProductItem';
import AddingToCart from '../components/products/AddingToCart';

export default function ProductPage() {
  const {id} = useParams();

  const {data: ProductData} = useProduct(id!);

  const price = ProductData?.currency + '' + ProductData?.price;

  return (
    <>
      <Helmet> <title> Product </title> </Helmet>
      <div className='flex w-[95%] mx-auto mt-5 gap-5'>

        <section key={1} className='w-full'>
          <img src={productImg} alt='productImg'></img>
        </section>

        <section key={2} className='w-full'>
          <div className='text-4xl my-5'>{ProductData?.name}</div>
          <Rating rating={ProductData?.rating ? ProductData?.rating : 0}/>
          <div className='divide-y-[1px] divide-y-gray-300 mt-5'>
            <ProductItem name='Category' value={ProductData?.category}/>
            <ProductItem name='Brand' value={ProductData?.brand}/>
            <ProductItem name='Descriptions' value={ProductData?.descriptions}/>
            <ProductItem name='Stock Count' value={ProductData?.stockCount }/>
            <ProductItem name='Price' value={price}/>
            <ProductItem name='Reviews' value={ProductData?.reviews}/>
          </div>
        </section>

        <section key={3} className='w-full h-fit border-[1px] border-solid border-gray-300 bg-gray-50 dark:bg-gray-900 rounded-lg '>
          <div className='divide-y-gray-300 mt-3 mb-3 px-5 divide-y-[1px] divide-y-gray-300'>
            <ProductItem name='Price' value={price}/>
            <ProductItem name='Status' value='In Stock'/>
          </div>
          <AddingToCart product={ProductData!} to={'/cart'}/>
        </section>
        
      </div>

    </>
    
  )
}
