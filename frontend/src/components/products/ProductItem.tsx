
interface IItem {
    name: string;
    value: string | number | undefined;
}

export default function ProductItem({name, value}: IItem) {
  return (
    <div className={`text-black dark:text-gray-300 text-lg mb-0 w-full mx-auto py-1.5 grid grid-cols-2 `}>
            <div className='col-span-1'>
                {name}
            </div>
            <div className='col-span-1'>
                {value}
            </div>
    </div>
  )
}
