import React, { useState } from 'react'
import { motion } from "motion/react";
import sidebar, { renderSidebarItem } from '../../../config/sidebar';
import { useSelector } from 'react-redux'

const Sidebar = ({ children, navbar }) => {
    const [isOpenSidebar, setIsOpenSidebar] = useState(true);
    const { user } = useSelector((state) => state.auth);

    const toggleSidebar = () => {
        setIsOpenSidebar((isOpen) => !isOpen);
    }

    return (
        <div className="overflow-hidden h-screen flex flex-col dark:bg-elements_dark">
            {navbar}
            <div className="w-screen flex-grow overflow-hidden flex flex-col ">
                <div className="flex flex-grow">
                    {
                        isOpenSidebar && (

                            <motion.div className="w-[150px] flex bg-white flex-col justify-between p-4 dark:bg-elements_dark max-xl:flex-row max-xl:fixed max-xl:bottom-0 max-xl:w-full max-xl:z-20 max-xl:shadow-inner max-lg:p-3"
                                initial={{ x: -100 }}
                                animate={{ x: "calc(0vw + 0%)" }}
                            >
                                <div className="flex flex-col dark:text-white max-xl:w-full max-xl:flex-row max-xl:justify-around ">
                                    {
                                        sidebar[`${user.role.toUpperCase()}_SIDEBAR`].map(renderSidebarItem)
                                    }
                                </div>
                            </motion.div>
                        )
                    }
                    <span className='relative max-xl:hidden'>
                        <button onClick={toggleSidebar}>
                            {isOpenSidebar ? (
                                <i className="fa-solid fa-chevron-left text-lg dark:text-white dark:hover:opacity-70 text-primayColor hover:opacity-70 p-2"></i>
                            ) : (
                                <i className="fa-solid fa-chevron-right text-lg dark:text-white dark:hover:opacity-70 text-primayColor hover:opacity-70 p-2"></i>
                            )}
                        </button>
                    </span>
                    <div className="bg-slate-50 flex-grow h-[calc(100vh-65px)] overflow-y-auto dark:bg-bg_dark">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar