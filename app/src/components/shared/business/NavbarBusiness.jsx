import { useSelector, useDispatch } from "react-redux"
import { logout } from "../../../store/slices/authSlice";
import { Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "motion/react"
import { useRef } from "react";
import { useEffect } from "react";

const NavbarBusiness = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const [isOpenMenu, setIsOpenMenu] = useState(false);
    const [isOpenNotify, setIsOpenNotify] = useState(false);
    const [isOpenMessage, setIsOpenMessage] = useState(false);

    const menuRef = useRef();
    const notifyRef = useRef();
    const messageRef = useRef();

    const toggleProfileMenu = () => {
        setIsOpenMenu(true);
        setIsOpenNotify(false);
        setIsOpenMessage(false);
    }

    const toggleNotify = () => {
        setIsOpenMenu(false);
        setIsOpenNotify(true);
        setIsOpenMessage(false);
    }

    const toggleMessage = () => {
        setIsOpenMenu(false);
        setIsOpenNotify(false);
        setIsOpenMessage(true);
    }

    const handleLogout = () => {
        dispatch(logout());
    }

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target) && isOpenMenu) {
                setIsOpenMenu(false);
            }
            if (notifyRef.current && !notifyRef.current.contains(e.target) && isOpenNotify) {
                setIsOpenNotify(false);
            }
            if (messageRef.current && !messageRef.current.contains(e.target) && isOpenMessage) {
                setIsOpenMessage(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpenMenu, isOpenNotify, isOpenMessage]);

    return (
        <nav className="flex justify-between items-center h-[65px] pr-[20px]">
            <div className="pl-4">
                <img src="/images/FoundLogoBusiness.png" alt="Logo Found" className="h-[40px] w-auto" />
            </div>

            <form className="w-96 mx-auto">
                <div className="flex items-center border border-gray-300 rounded-lg bg-gray-50 pr-1">
                    <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 rounded-lg bg-gray-50" placeholder="Searched and Found!" required />
                    <button type="submit" className="btn">Search</button>
                </div>
            </form>
            <div className="flex justify-center items-center gap-2">
                <div>
                    <button onClick={toggleMessage}>
                        <div className="flex justify-center items-center">
                            <div className="flex gap-2 items-center justify-center">
                                <i className="fa-solid fa-envelope text-primayColor"></i>
                            </div>
                            {
                                isOpenMessage && (
                                    <motion.div ref={messageRef} className="top-12 right-7 flex flex-col p-4 w-48 bg-white absolute z-10 rounded shadow"
                                        initial={{ y: 100 }}
                                        animate={{ y: "calc(0vw + 10%)" }}
                                    >
                                        <div className="mb-4"><h4>Messaggi</h4></div>
                                        <div className="flex flex-col gap-3 items-start">
                                            <ul>
                                                <li>messaggio</li>
                                                <li>messaggio</li>
                                                <li>messaggio</li>
                                            </ul>
                                        </div>
                                    </motion.div>
                                )
                            }
                        </div>
                    </button>
                </div>

                <div>
                    <button onClick={toggleNotify}>
                        <div className="flex justify-center items-center">
                            <div className="flex gap-2 items-center justify-center">
                                <i className="fa-solid fa-bell-concierge text-primayColor"></i>
                            </div>
                            {
                                isOpenNotify && (
                                    <motion.div ref={notifyRef} className="top-12 right-6 flex flex-col p-4 w-48 bg-white absolute z-10 rounded shadow"
                                        initial={{ y: 100 }}
                                        animate={{ y: "calc(0vw + 10%)" }}
                                    >
                                        <div className="mb-4"><h4>Notifiche</h4></div>
                                        <div className="flex flex-col gap-3 items-start">
                                            <ul>
                                                <li>notifica</li>
                                                <li>notifica</li>
                                                <li>notifica</li>
                                            </ul>
                                        </div>
                                    </motion.div>
                                )
                            }
                        </div>
                    </button>
                </div>


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
                                    <motion.div ref={menuRef} className="top-12 right-5 flex flex-col p-4 w-48 bg-white absolute z-10 rounded shadow"
                                        initial={{ y: 100 }}
                                        animate={{ y: "calc(0vw + 10%)" }}
                                    >
                                        <div className="mb-4"><h4>Ciao {user.first_name}</h4></div>
                                        <div className="flex flex-col gap-3 items-start">
                                            <div>
                                                <Link to={"/app/profile"} className="flex">
                                                    <div className='w-5 mr-1'>
                                                        <i className="fa-solid fa-passport"></i>
                                                    </div>
                                                    <span>Profilo</span>
                                                </Link>
                                            </div>
                                            <div>
                                                <Link className="flex">
                                                    <div className='w-5 mr-1'>
                                                        <i className="fa-solid fa-user-pen text-sm"></i>
                                                    </div>
                                                    <span>Modifica Profilo</span>
                                                </Link>
                                            </div>
                                            <div>
                                                <Link className="flex">
                                                    <div className='w-5 mr-1'>
                                                        <i className="fa-solid fa-gear"></i>
                                                    </div> <span>Impostazioni</span>
                                                </Link>
                                            </div>
                                            <div>
                                                <Link className="flex">
                                                    <div className='w-5 mr-1'>
                                                        <i className="fa-solid fa-shield-halved"></i>
                                                    </div>
                                                    <span>Privacy</span>
                                                </Link>
                                            </div>
                                            <div>
                                                <span onClick={handleLogout}>Esci</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                )
                            }
                        </div>
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default NavbarBusiness