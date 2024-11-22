import React, { useState } from 'react'
import { Link, useLocation } from "react-router-dom";
import { motion } from "motion/react";

const Sidebar = ({ children, navbar }) => {
    const [isOpenSidebar, setIsOpenSidebar] = useState(true);
    const location = useLocation();

    const toggleSidebar = () => {
        setIsOpenSidebar((isOpen) => !isOpen);
    }

    return (
        <div className="overflow-hidden h-screen flex flex-col">
            {navbar}
            <div className="w-screen flex-grow overflow-hidden flex flex-col">
                <div className="flex flex-grow">
                    {
                        isOpenSidebar && (

                            <motion.div className="w-[150px] flex bg-white flex-col justify-between p-4"
                                initial={{ x: -100 }}
                                animate={{ x: "calc(0vw + 0%)" }}
                            >
                                <div className="flex flex-col">
                                    <h2>Principale</h2>
                                    <div className="mb-4">
                                        <div className={location.pathname.startsWith("/app/feed") && "bg-[#e1e4f5] rounded w-[120px] p-1"}>
                                            <Link to={"/app/feed"} className='flex hover:opacity-70'>
                                                <div className='w-5 mr-1'>
                                                    <i className="fa-regular fa-newspaper text-primayColor"></i>
                                                </div>
                                                <span className=''>Bacheca</span>
                                            </Link>
                                        </div>
                                        <div className={location.pathname.startsWith("/app/profile") && "bg-[#e1e4f5] rounded w-[120px] p-1"}>
                                            <Link to={"/app/profile"} className=' flex hover:opacity-70'>
                                                <div className='w-5 mr-1'>
                                                    <i className="fa-solid fa-passport text-primayColor "></i>
                                                </div>
                                                <span className=''>Profilo</span>
                                            </Link>
                                        </div>
                                        <div className={location.pathname.startsWith("/app/groups") && "bg-[#e1e4f5] rounded w-[120px] p-1"}>
                                            <Link to={"/app/groups"} className=' flex hover:opacity-70'>
                                                <div className='w-5 mr-1'>
                                                    <i className="fa-solid fa-users text-primayColor text-sm"></i>
                                                </div>
                                                <span className=''>Gruppi</span>
                                            </Link>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="flex flex-col mt-4">
                                        <h2>Strumenti</h2>
                                        <div className="">
                                            <div>
                                                <Link to={"/app/chat"} className='flex hover:opacity-70'>
                                                    <div className='w-5 mr-1'>
                                                        <i className="fa-solid fa-comments text-primayColor text-sm"></i>
                                                    </div>
                                                    <span className=''>Chat</span>
                                                </Link>
                                            </div>
                                            <div className={location.pathname.startsWith("/app/calendar") && "bg-[#e1e4f5] rounded w-[120px] p-1"}>
                                                <Link to={"/app/calendar"} className='flex hover:opacity-70'>
                                                    <div className='w-5 mr-1'>
                                                        <i className="fa-solid fa-calendar-days text-primayColor"></i>
                                                    </div>
                                                    <span className=''>Calendario</span>
                                                </Link>
                                            </div>
                                            <div className={location.pathname.startsWith("/app/favorites") && "bg-[#e1e4f5] rounded w-[120px] p-1"}>
                                                <Link to={"/app/favorites"} className='flex hover:opacity-70'>
                                                    <div className='w-5 mr-1'>
                                                        <i className="fa-solid fa-suitcase-rolling text-primayColor"></i>
                                                    </div>
                                                    <span className=''>Preferiti</span>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )
                    }
                    <span className='relative'>
                        <button onClick={toggleSidebar}><i className="fa-regular fa-square-caret-down fa-rotate-90 text-lg text-primayColor"></i></button>
                    </span>
                    <div className="bg-slate-50 flex-grow h-[calc(100vh-65px)] overflow-y-auto">
                        {children}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Sidebar