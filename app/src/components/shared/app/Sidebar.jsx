import React from 'react'
import { useSelector } from 'react-redux'

const Sidebar = ({ children, navbar }) => {
    const { user } = useSelector((state) => state.auth);

    return (
        <div className="overflow-hidden h-screen flex flex-col">
            {navbar}
            <div className="w-screen flex-grow overflow-hidden flex flex-col">
                <div className="flex flex-grow">
                    <div className="w-[200px] flex bg-white flex-col justify-between">
                        <div className="flex flex-col">
                            <h2>Sidebar</h2>
                            <div className="">
                                <p>Feed</p>
                                <p>Profile</p>
                                <p>Groupes</p>
                            </div>
                        </div>
                        <div className="flex justify-center items-center">
                            <div className="flex gap-2 items-center justify-center">
                                <div className="bg-slate-300 p-1 flex items-center justify-center rounded-full text-slate-800 text-sm">
                                    <i className="fa-regular fa-user"></i>
                                </div>
                                <p>{user.first_name} {user.last_name}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-slate-50 flex-grow">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar