import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom"

const Navbar = () => {
  const location = useLocation();
  const { darkMode} = useSelector((state) => state.settings);

  const title = location.pathname == "/login-business" || location.pathname == "/signup-business";

  return (
    <>
      {
        (
          !title &&
            <nav className="flex justify-center p-2 dark:bg-bg_dark">
                <img src={ darkMode? "/images/LogoFullDark.png" : "/images/FoundLogoFull.png"} alt="logo" className="logo-login" />
            </nav>
        )
      }
    </>
  )
}

export default Navbar