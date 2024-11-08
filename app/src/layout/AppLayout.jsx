import { Outlet } from "react-router-dom"
import Navbar from "../components/shared/app/Navbar"
import Sidebar from "../components/shared/app/Sidebar"
import Footer from "../components/shared/app/Footer"

const AppLayout = () => {
  return (
    <>
      <Sidebar navbar={<Navbar />}>
        <main>
          <Outlet />
        </main>
      </Sidebar>
      <Footer />
    </>
  )
}

export default AppLayout