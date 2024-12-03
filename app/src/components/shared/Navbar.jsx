import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom"

const Navbar = () => {
  const location = useLocation();
  const title = location.pathname == "/login-business" || location.pathname == "/signup-business";


  return (
    <>
      {
        (
          !title &&
            <nav className="flex justify-center p-2 dark:bg-container_dark dark:text-white">
                <img src="/images/FoundLogoFull.png" alt="logo" className="logo-login" />
            </nav>
        )
      }
    </>
  )
}

export default Navbar