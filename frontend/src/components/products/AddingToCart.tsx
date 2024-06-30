import { useContext } from "react"
import { Store } from "../../AppStateContext"
import { intoCart } from '../../utils/intoCart';
import { Product } from "../../types/Product";
import { Button } from "../ui/Button";
import { useNavigate } from "react-router-dom";

export default function AddingToCart({product, to} : {product: Product, to?: string}) {
  const navigate = useNavigate()
  const { state, dispatch } = useContext(Store)
  const { cart } = state

  const addToCart = async () => {
    const existItem = cart.cartItems.find((x) => x._id === product!._id)
    const quantity = existItem ? existItem.quantity + 1 : 1
    if (product!.stockCount < quantity) {
      //toast.warn('Sorry. Product is out of stock')
      return
    }
    dispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...intoCart(product!), quantity },
    })
    //toast.success('Product added to the cart')
    to && navigate(to);
  }

  return (
    <div className='mx-3 mb-3'>
      <Button variant={'primary'} title='Add to Cart'
        onClick={addToCart}
      />
    </div>  
  )
}
