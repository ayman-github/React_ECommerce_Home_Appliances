import { Outlet } from "react-router-dom"
import NavBar from "./components/bars/NavBar"

function App() {
  
  return (
    <main>

      <div className='bg-white dark:bg-black text-black dark:text-white h-screen'>
          <header className='bg-green-300'>
            <NavBar />
          </header>

          <main>
            <Outlet />
          </main>

          <footer className="w-full flex justify-center">
            the footer
          </footer>             
      </div>
    </main>
  )
}

export default App
