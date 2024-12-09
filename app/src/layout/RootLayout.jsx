import { Outlet } from "react-router-dom"
import Footer from "../components/shared/Footer"
import Navbar from "../components/shared/Navbar"

const RootLayout = () => {
  return (
    <div className="flex flex-col h-screen">
        <Navbar />
        <main className="flex-grow dark:bg-bg_dark">
            <Outlet />
        </main>
        <Footer />
    </div>
  )
}

export default RootLayout