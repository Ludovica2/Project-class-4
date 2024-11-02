import { Outlet } from "react-router-dom"
import Navbar from "../components/shared/app/Navbar"
import Sidebar from "../components/shared/app/Sidebar"

const AppLayout = () => {
  return (
    <>
        <Sidebar navbar={<Navbar />}>
          <main>
              <Outlet />
          </main>
        </Sidebar>
    </>
  )
}

export default AppLayout