import { Product } from '../../types/Product'
import { Link } from 'react-router-dom'
import tvImg from '../../assets/tv.webp';
import Rating from '../ui/Rating';
// import { Button } from '../ui/Button';
// import { useContext } from 'react';
// import { Store } from '../../AppStateContext';
// import { CartItem } from '../../types/Cart';
// import { intoCart } from '../../utils/intoCart';
import AddingToCart from './AddingToCart';

export default function ProductCard ({product} : {product: Product}) {

    //const { state, dispatch: xDispatch } = useContext(Store);
    //const { cart: { cartItems }, } = state;

    // const addToCart = async (item: CartItem) => {
    //   const existItem = cartItems.find((x) => x._id === product._id)
    //   const quantity = existItem ? existItem.quantity + 1 : 1
    //   if (product.stockCount < quantity) {
    //       //toast.warn('Sorry. Product is out of stock')
    //       return
    //   }
    //   xDispatch({
    //       type: 'CART_ADD_ITEM',
    //       payload: { ...item, quantity },
    //   })
    //     //toast.success('Product added to the cart')
    // }

  return (
    <>
      <Link to={`product/${product._id}`} >
          <div  className=" flex flex-col justify-start mx-4">
              <img className="w-full my-3" src={tvImg}/>
              <div className="w-full text-xl"> {product?.name} {product?.brand}</div>
              <div className="w-full"> {product.currency} {product?.price} </div>
          </div>
      </Link>
      <div className="w-full flex justify-start mx-2"> 
          <Rating rating={product?.rating}/> 
          <span className='text-amber-500 font-semibold'> {product?.reviews} Reviews</span>
      </div>
      {/* <div className='m-2'>
          <Button variant={'primary'} title='Add to Cart'
            onClick={()=>addToCart(intoCart(product))}
          />
      </div> */}
      <AddingToCart product={product}/>
    </>
  )
}
