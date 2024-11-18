import { useSelector, useDispatch } from "react-redux"
import { logout } from "../../../store/slices/authSlice";
import foundLogoFull from "../../../../public/images/FoundLogoFull.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "motion/react"

const Navbar = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const [isOpenMenu, setIsOpenMenu] = useState(false);

    const toggleProfileMenu = () => {
        setIsOpenMenu((isOpen) => !isOpen);
    }

    const handleLogout = () => {
        dispatch(logout());
    }

    return (
        <nav className="flex justify-between items-center h-[50px] pr-[20px] mt-1">
            <div className="pl-4">
                <img src={foundLogoFull} alt="Logo Found" className="h-[40px] w-auto" />
            </div>


            <form className="w-96 mx-auto">
                <div className="flex items-center border border-gray-300 rounded-lg bg-gray-50 pr-1">
                    <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 rounded-lg bg-gray-50" placeholder="Searched and Found!" required />
                    <button type="submit" className="btn">Search</button>
                </div>
            </form>

            <div>
                <button onClick={toggleProfileMenu}>
                    <div className="flex justify-center items-center">
                        <div className="flex gap-2 items-center justify-center">
                            <div className="bg-slate-300 p-1 flex items-center justify-center rounded-full text-slate-800 text-sm">
                                <i className="fa-regular fa-user"></i>
                            </div>
                            <p>{user.first_name} {user.last_name}</p>
                        </div>
                        {
                            isOpenMenu && (
                                <motion.div className="top-12 right-5 flex flex-col p-4 w-48 bg-white absolute"
                                    initial={{ y: -8 }}
                                    animate={{ y: "calc(0vw + 5%)" }}
                                >
                                    <div className="mb-4"><h4>Ciao {user.first_name}</h4></div>
                                    <div className="flex flex-col gap-3 items-start">
                                        <div><Link to={"/app/profile"} className="flex"><div className='w-5 mr-1'><i className="fa-solid fa-passport"></i></div> <span>Profilo</span></Link></div>
                                        <div><Link className="flex"><div className='w-5 mr-1'><i className="fa-solid fa-user-pen text-sm"></i></div> <span>Modifica Profilo</span></Link></div>
                                        <div><Link className="flex"><div className='w-5 mr-1'><i className="fa-solid fa-gear"></i></div> <span>Impostazioni</span></Link></div>
                                        <div><Link className="flex"><div className='w-5 mr-1'><i className="fa-solid fa-shield-halved"></i></div> <span>Privacy</span></Link></div>
                                        <div><span onClick={handleLogout}>Esci</span></div>
                                    </div>
                                </motion.div>
                            )
                        }
                    </div>
                </button>
            </div>
        </nav>
    )
}

export default Navbar