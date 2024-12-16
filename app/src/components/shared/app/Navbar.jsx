import { useSelector, useDispatch } from "react-redux"
import { logout } from "../../../store/slices/authSlice";
import { Link } from "react-router-dom";
import { motion } from "motion/react"
import { useClickOutside } from "../../../hooks/useClickOutside";
import { toggleDarkMode } from "../../../store/slices/settingsSlice";


const Navbar = () => {
    const dispatch = useDispatch();
    const { user, token } = useSelector((state) => state.auth);
    const { darkMode } = useSelector((state) => state.settings);
    const { active: isOpenMenu, setActive: setIsOpenMenu, elRef: menuRef } = useClickOutside(false);
    const { active: isOpenNotify, setActive: setIsOpenNotify, elRef: notifyRef } = useClickOutside(false);
    const { active: isOpenMessage, setActive: setIsOpenMessage, elRef: messageRef } = useClickOutside(false);
    const { active: isOpenSearch, setActive: setIsOpenSearch, elRef: serachRef } = useClickOutside(false);
    const notifications = useSelector((state) => state.notifications.all);

    const toggleProfileMenu = () => {
        setIsOpenMenu(prev => !prev);
        setIsOpenNotify(false);
        setIsOpenMessage(false);
        setIsOpenSearch(false);
    }

    const toggleNotify = () => {
        setIsOpenMenu(false);
        setIsOpenNotify(prev => !prev);
        setIsOpenMessage(false);
        setIsOpenSearch(false);
    }

    const toggleMessage = () => {
        setIsOpenMenu(false);
        setIsOpenNotify(false);
        setIsOpenMessage(prev => !prev);
        setIsOpenSearch(false);
    }

    const toggleSearch = () => {
        setIsOpenMenu(false);
        setIsOpenNotify(false);
        setIsOpenMessage(false);
        setIsOpenSearch(prev => !prev);
    }

    const handleLogout = () => {
        dispatch(logout());
    }

    const toggleSwitchDark = () => {
        dispatch(toggleDarkMode());
    };

    return (
        <nav className="flex justify-between items-center h-[65px] pr-[20px] dark:bg-elements_dark">
            <div className="pl-4">
                {
                    user.role == "user" ? (
                        <>
                            <img src={darkMode ? "/images/LogoFullDark.png" : "/images/FoundLogoFull.png"} alt="Logo Found" className="h-[40px] w-auto max-xs:hidden" />
                            <img src={darkMode ? "/images/LogoDark.png" : "/images/FoundLogoBasic.png"} alt="Logo Found" className="h-[40px] w-auto xs:hidden" />
                        </>
                    ) : (
                        <>
                            <img src={darkMode ? "/images/LogoBusinessDark.png" : "/images/FoundLogoBusiness.png"} alt="Logo Business" className="h-[40px] w-auto max-xs:hidden" />
                            <img src={darkMode ? "/images/LogoBDark.png" : "/images/FoundLogoB.png"} alt="Logo Business" className="h-[40px] w-auto xs:hidden" />
                        </>
                    )
                }
            </div>
            <form className="w-96 mx-auto max-lg:hidden">
                <div className="flex items-center border border-gray-300 rounded-lg bg-gray-50 pr-1  dark:bg-bg_dark dark:border-gray-500">
                    <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 rounded-lg bg-gray-50 input_field dark:bg-elements_dark dark:border-gray-500 dark:focus:bg-gray-800 dark:focus:border-gray-400" placeholder="Searched and Found!" required />
                    <button type="submit" className="btn dark:border-gray-500">Search</button>
                </div>
            </form>
            <div ref={serachRef} className="lg:hidden">
                <button onClick={toggleSearch}>
                    <div className="flex justify-center items-center">
                        <i className="fa-solid fa-magnifying-glass text-primayColor"></i>
                        {
                            isOpenSearch && (
                                <motion.div className="top-11 right-0 flex flex-col p-4 w-full bg-white absolute z-10 rounded shadow dark:bg-elements_dark"
                                    initial={{ y: 30 }}
                                    animate={{ y: "calc(0vw + 15%)" }}
                                >
                                    <form className="w-96 mx-auto max-xs:w-80">
                                        <div className="flex items-center border border-gray-300 rounded-lg bg-gray-50 pr-1  dark:bg-bg_dark dark:border-gray-500">
                                            <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 rounded-lg bg-gray-50 input_field dark:bg-elements_dark dark:border-gray-500 dark:focus:bg-gray-800 dark:focus:border-gray-400" placeholder="Searched and Found!" required />
                                            <button type="submit" className="btn dark:border-gray-500">Search</button>
                                        </div>
                                    </form>
                                </motion.div>
                            )
                        }
                    </div>
                </button>
            </div>

            <div className="flex justify-center items-center gap-4">
                <button onClick={toggleSwitchDark} className="mr-1">
                    {
                        darkMode ? <i className="fa-solid fa-moon text-slate-100"></i> : <i className="fa-solid fa-sun text-yellow-400"></i>
                    }
                </button>
                <div ref={messageRef}>
                    <button onClick={toggleMessage}>
                        <div className="flex justify-center items-center">
                            <div className="flex gap-2 items-center justify-center">
                                <div className='absolute transform translate-x-2 -translate-y-2 flex items-center justify-center rounded-full border-[1px] border-white bg-red-600 text-xs w-5 h-5 text-center text-white font-bold p-[2px]'>
                                    1
                                </div>
                                <i className="fa-solid fa-envelope text-primayColor hover:text-primayColor_Hover"></i>
                            </div>
                        </div>
                    </button>
                </div>

                <div ref={notifyRef}>
                    <button onClick={toggleNotify}>
                        <div className="flex justify-center items-center">
                            <div className="flex gap-2 items-center justify-center">
                                <div className='absolute transform translate-x-2 -translate-y-2 flex items-center justify-center rounded-full border-[1px] border-white bg-red-600 text-xs w-5 h-5 text-center text-white font-bold p-[2px]'>
                                    {notifications.length}
                                </div>
                                <i className="fa-solid fa-bell-concierge text-primayColor hover:text-primayColor_Hover"></i>
                            </div>
                        </div>
                        {
                            isOpenNotify && (
                                <motion.div
                                    className="top-6 right-6 flex flex-col p-4 w-[320px] bg-white absolute z-10 rounded shadow dark:bg-elements_dark"
                                    initial={{ y: 100 }}
                                    animate={{ y: "calc(0vw + 10%)" }}
                                >
                                    <div className="mb-4">
                                        <h4 className="dark:text-slate-100">Notifiche</h4>
                                    </div>
                                    <div className="flex flex-col gap-3 items-start">
                                        <ul className="text-xs">
                                            {notifications.length > 0 ? (
                                                notifications.map((notification) => (
                                                    <li key={notification._id} className="flex items-center gap-2 dark:text-dark">
                                                        <img src={notification.from.avatar} alt="Avatar" className="w-10 h-10 rounded" />
                                                        <strong>{notification.content}</strong>
                                                    </li>
                                                ))
                                            ) : (
                                                <li className="dark:text-dark">Nessuna notifica</li>
                                            )}
                                        </ul>
                                    </div>
                                </motion.div>
                            )
                        }
                    </button>
                </div>
                <div ref={menuRef}>
                    <button onClick={toggleProfileMenu}>
                        <div className="flex justify-center items-center">
                            <div className="flex gap-2 items-center justify-center">
                                <div className="bg-slate-300 p-1 flex items-center justify-center rounded-full text-slate-800 text-sm">
                                    <div style={{ backgroundImage: `url(${user.avatar}?token=${token})` }} className="w-10 h-10 rounded-full max-xs:w-8 max-xs:h-8 bg-cover bg-center"></div>
                                </div>
                                {
                                    user.role == "user" ? (
                                        <p className="dark:text-white hover:opacity-70 max-md:hidden">{user.first_name} {user.last_name}</p>
                                    ) : (
                                        <p className="dark:text-white max-md:hidden">{user.metadata.company_name}</p>
                                    )
                                }

                            </div>
                            {
                                isOpenMenu && (
                                    <motion.div className="top-12 right-5 flex flex-col p-4 w-48 bg-white absolute z-10 rounded shadow dark:bg-elements_dark"
                                        initial={{ y: 100 }}
                                        animate={{ y: "calc(0vw + 10%)" }}
                                    >
                                        <div className="mb-4">
                                            <h4 className="dark:text-slate-100">Ciao {user.first_name}</h4>
                                        </div>
                                        <div className="flex flex-col gap-3 items-start">
                                            <div>
                                                <Link to={"/app/profile"} className="flex">
                                                    <div className='w-5 mr-1'>
                                                        <i className="fa-solid fa-passport dark:text-gray-500"></i>
                                                    </div>
                                                    <span className="dark:text-dark">Profilo</span>
                                                </Link>
                                            </div>
                                            <div>
                                                <Link to={"/app/profile/editprofile"} className="flex">
                                                    <div className='w-5 mr-1'>
                                                        <i className="fa-solid fa-user-pen text-sm dark:text-gray-500"></i>
                                                    </div>
                                                    <span className="dark:text-dark">Modifica Profilo</span>
                                                </Link>
                                            </div>
                                            <div>
                                                <Link to={"/app/profile/settingsprofile"} className="flex">
                                                    <div className='w-5 mr-1'>
                                                        <i className="fa-solid fa-gear dark:text-gray-500"></i>
                                                    </div>
                                                    <span className="dark:text-dark">Impostazioni</span>
                                                </Link>
                                            </div>
                                            <div>
                                                <Link className="flex">
                                                    <div className='w-5 mr-1'>
                                                        <i className="fa-solid fa-shield-halved dark:text-gray-500"></i>
                                                    </div>
                                                    <span className="dark:text-dark">Privacy</span>
                                                </Link>
                                            </div>
                                            <div>
                                                <span onClick={handleLogout} className="dark:text-slate-300">Esci</span>
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

export default Navbar