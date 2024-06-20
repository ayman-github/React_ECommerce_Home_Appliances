import { sampleProduct } from "./data"
import tvImg from './assets/tv.webp';

function App() {

  return (
    <>
        <header className='bg-green-300'>
          Home Appliances  
        </header>

        <main>
          <div className="w-full grid grid-cols-4 gap-2 p-5">
            {
              sampleProduct.map((product, index)=>(
                <div key={index} className="bg-gray-200 flex flex-col justify-center">
                  <img className="w-full" src={tvImg}/>
                  <div className="w-full flex justify-center"> {product?.name} </div>
                  <div className="w-full flex justify-center"> {product?.brand} </div>
                  <div className="w-full flex justify-center"> {product?.price} </div>
                </div>
              ))
            }
          </div>
        </main>
                  
    </>
  )
}

export default App
