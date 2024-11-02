import { Outlet } from "react-router-dom"
import Footer from "../components/shared/Footer"
import Navbar from "../components/shared/Navbar"

const RootLayout = () => {
  return (
    <>
        <Navbar />
        <main>
            <Outlet />
        </main>
        <Footer />
    </>
  )
}

export default RootLayout