import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { motion } from "motion/react";

const Sidebar = ({ children, navbar }) => {
    const [isOpenSidebar, setIsOpenSidebar] = useState(true);

    const toggleSidebar = () => {
        setIsOpenSidebar((isOpen) => !isOpen);
    }

    return (
        <div className="overflow-hidden h-screen flex flex-col">
            {navbar}
            <div className="w-screen flex-grow overflow-hidden flex flex-col p-3">
                <div className="flex flex-grow">
                    {
                        isOpenSidebar && (
                            
                            <motion.div className="w-[150px] flex bg-white flex-col justify-between"
                                initial={{ x: -100 }}
                                animate={{ x: "calc(0vw + 0%)" }}
                            >
                                <div className="flex flex-col">
                                    <h2>Principale</h2>
                                    <div className="mb-4">
                                        <div><Link to={"/app/feed"} className='hover:text-secondaryColor flex'><div className='w-5 mr-1'><i className="fa-regular fa-newspaper text-primayColor "></i></div> <span>Bacheca</span></Link></div>
                                        <div><Link to={"/app/profile"} className=' flex'><div className='w-5 mr-1'><i className="fa-solid fa-passport text-primayColor"></i></div> <span>Profilo</span></Link></div>
                                        <div><Link to={"/app/groups"} className=' flex'><div className='w-5 mr-1'><i className="fa-solid fa-users text-primayColor  text-sm"></i></div> <span>Gruppi</span></Link></div>
                                    </div>
                                    <hr />
                                    <div className="flex flex-col mt-4">
                                        <h2>Strumenti</h2>
                                        <div className="">
                                            <div><Link to={"/app/chat"} className=' flex'><div className='w-5 mr-1'><i className="fa-solid fa-comments text-primayColor  text-sm"></i></div> <span>Chat</span></Link></div>
                                            <div><Link to={"/app/calendar"} className=' flex'><div className='w-5 mr-1'><i className="fa-solid fa-calendar-days text-primayColor "></i></div> <span>Calendario</span></Link></div>
                                            <div><Link to={"/app/favorites"} className=' flex'><div className='w-5 mr-1'><i className="fa-solid fa-suitcase-rolling text-primayColor "></i></div> <span>Preferiti</span></Link></div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )
                    }
                    <span className='relative'>
                        <button onClick={toggleSidebar}><i className="fa-regular fa-square-caret-down fa-rotate-90 text-lg text-primayColor"></i></button>
                    </span>
                    <div className="bg-slate-50 flex-grow">
                        {children}
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Sidebar