import { Outlet } from "react-router-dom"

function App() {

  return (
    <>
        <header className='bg-green-300'>
          Home Appliances  
        </header>

        <main>
          <Outlet />
        </main>

        <footer className="w-full flex justify-center">
          the footer
        </footer>             
    </>
  )
}

export default App
