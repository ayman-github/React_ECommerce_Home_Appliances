import { useContext } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'
import { useOrderHistory } from '../services/api/useOrder'
import { Order } from '../types/Order'
import { Store } from '../AppStateContext'
import { Button } from '../components/ui/Button'

export default function OrderHistoryPage() {

    const navigate = useNavigate();

    const { state: { userInfo } } = useContext(Store);

    const { data: orders } = useOrderHistory(userInfo?._id ? userInfo?._id.toString() : '');

  return (
    <>
      <Helmet>
        <title>Order History</title>
      </Helmet>
      <div className='w-[90%] text-3xl mx-auto' >Order History</div>
      
      <table className='w-[90%] mx-auto text-start'>
            <thead>
              <tr>
                <th className='text-start'>ID</th>
                <th className='text-start'>DATE</th>
                <th className='text-start'>TOTAL</th>
                <th className='text-start'>PAID</th>
                <th className='text-start'>DELIVERED</th>
                <th className='text-start'>ACTIONS</th>
              </tr>
            </thead>
          <tbody>
            {orders?.map((order: Order, index: number) => (
                   <tr key={index}>
                     <td>{order._id}</td>
                     <td>{order.createdAt.substring(0, 10)}</td>
                     <td>{order.totalPrice.toFixed(2)}</td>
                     <td>{order.isPaid ? order?.paidAt?.substring(0, 10) : 'No'}</td>
                     <td>
                       {order.isDelivered
                         ? order?.deliveredAt?.substring(0, 10)
                         : 'No'}
                     </td>
                     <td>
                       <Button
                         type="button"
                         variant="primary"
                         size={'sm'}
                         title='Details'
                         onClick={() => {
                           navigate(`/order/${order._id}`)
                         }}
                       />
                     </td>
                   </tr>
                 ))}

          </tbody>
        </table>
    </>
  )
}
