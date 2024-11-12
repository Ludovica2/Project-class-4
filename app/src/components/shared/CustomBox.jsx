import React, { useState } from 'react'

const CustomBox = ({ children, divider = false, title = "" }) => {
    const [isOpenComments, setIsOpenComments] = useState(false);

    const toggleCommentsBox = () => {
        setIsOpenComments((isOpen) => !isOpen);
    }

    return (
        <>
            <div className="m-5 rounded-lg bg-white w-full shadow">
                <div className="rounded-t-lg">
                    <h3 className="p-4">{title}</h3>
                    {divider && <div className="w-full h-[1px] mb-5 bg-slate-100"></div>}
                </div>
                <div className="m-4 p-1 rounded-b-lg">
                    {children}
                </div>
                <div className="flex flex-col mt-6 p-4 border border-slate-100 rounded-b-lg">
                    <div className='flex justify-between'>
                        <div>
                            <button className="p-2 mr-2">
                                <i className="fa-solid fa-camera text-secondaryColor text-xl hover:text-secondaryColor_Hover"></i>
                            </button>
                            <button className="p-2 mr-2">
                                <i className="fa-solid fa-video text-secondaryColor text-xl hover:text-secondaryColor_Hover"></i>
                            </button>
                            <button className="p-2 mr-2">
                                <i className="fa-solid fa-location-dot text-secondaryColor text-xl hover:text-secondaryColor_Hover"></i>
                            </button>
                        </div>
                        <button className="btn" onClick={toggleCommentsBox}>Commenta</button>
                    </div>
                    {
                        isOpenComments && (
                            <div className='p-4 '>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi repellat aliquid, explicabo ipsa adipisci molestias illo temporibus id, cupiditate tempore magnam suscipit! Aut illo veritatis quo. Id dolor explicabo temporibus.</p>
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default CustomBox