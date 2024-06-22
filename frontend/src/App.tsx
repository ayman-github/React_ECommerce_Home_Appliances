import { Outlet } from "react-router-dom"
import NavBar from "./components/bars/NavBar"

function App() {

  return (
    <>
        <header className='bg-green-300'>
          <NavBar />
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
