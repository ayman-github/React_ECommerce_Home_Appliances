import { CartItem } from "../../types/Cart";
import tvImg from '../../assets/tv.webp';
import { useNavigate } from 'react-router-dom'
import { MdEdit } from "react-icons/md";

interface ICard {
    title: string;
    name?: string;
    address?: string;
    orderItems?: CartItem[];
    editLink?: string;
}
export default function ReviewCard(props: ICard) {
    const navigate = useNavigate();
  return (
    <div className={`
        relative
        my-2 w-full p-5
        rounded-md border-solid border-[0.5px] border-gray-300 dark:border-gray-700
    `}>
        <div className="text-xl mb-3">{props?.title}</div>
        <div>{props?.name}</div>
        <div>{props?.address}</div>

        { props.editLink &&
            <div className="absolute top-5 right-5 
                 flex gap-2 items-center 
                text-blue-500 cursor-pointer"
                onClick={()=> navigate('/'+props?.editLink || '/')}>
                <MdEdit /> Edit
            </div>
        }

        { props.orderItems && 
            <div className="divide-y-[0.5px] divide-gray-300 dark:divide-gray-700">
                {
                    props.orderItems.map((item: CartItem, index: number)=>(
                        <div key={index} className="grid grid-cols-3">
                            <div className="flex items-center gap-2">
                                <img className="my-3" src={tvImg} width={55}/>
                                {item.name}
                            </div>
                            <div className="flex items-center">{item.quantity} item</div>
                            <div className="flex items-center">{item.currency}{item.price}</div>
                        </div>
                    ))   
                }
            </div>   
        }
    </div>
  )
}

