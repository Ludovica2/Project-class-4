import React, { useState } from 'react'
import { Link, useLocation } from "react-router-dom";
import { motion } from "motion/react";
import SidebarItem from '../SidebarItem';
import sidebar, { renderSidebarItem } from '../../../config/sidebar';

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
                                    {
                                        sidebar.USER_SIDEBAR.map(renderSidebarItem)
                                    }
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