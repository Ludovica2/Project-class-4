import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from "react-router-dom";

const Sidebar = ({ children, navbar }) => {
    const { user } = useSelector((state) => state.auth);

    return (
        <div className="overflow-hidden h-screen flex flex-col">
            {navbar}
            <div className="w-screen flex-grow overflow-hidden flex flex-col p-3">
                <div className="flex flex-grow">
                    <div className="w-[150px] flex bg-white flex-col justify-between">
                        <div className="flex flex-col">
                            <h2>Main</h2>
                            <div className="mb-4">
                                <p><Link to={"/app/feed"}>Feed</Link></p>
                                <p><Link to={"/app/profile"}>Profile</Link></p>
                                <p><Link to={"/app/groups"}>Groups</Link></p>
                            </div>
                            <hr />
                            <div className="flex flex-col mt-4">
                                <h2>Featured</h2>
                                <div className="">
                                    <p>Chat</p>
                                    <p><Link to={"/app/calendar"}>Calendar</Link></p>
                                    <p><Link to={"/app/favorites"}>Favorites</Link></p>
                                </div>
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