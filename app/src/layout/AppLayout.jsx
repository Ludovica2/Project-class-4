import { Outlet, useLocation } from "react-router-dom"
import Navbar from "../components/shared/app/Navbar"
import Sidebar from "../components/shared/app/Sidebar"

const AppLayout = () => {
  const location = useLocation()

  if (location.pathname == "/app/chat") {
    return (
      <main>
        <Outlet />
      </main>
    )
  }

  return (
    <>
      <Sidebar navbar={<Navbar />}>
        <main className="flex justify-center dark:bg-bg_dark max-xl:mb-14">
          <Outlet />
        </main>
      </Sidebar>
    </>
  )
}

export default AppLayout