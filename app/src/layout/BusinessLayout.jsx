import { Outlet } from "react-router-dom"

import NavbarBusiness from "../components/shared/business/NavbarBusiness"
import SidebarBusiness from "../components/shared/business/SidebarBusiness"

const BusinessLayout = () => {
  return (
    <>
        <NavbarBusiness />
        <main>
            <Outlet className="flex justify-center"/>
        </main>
        <SidebarBusiness />
    </>
  )
}

export default BusinessLayout