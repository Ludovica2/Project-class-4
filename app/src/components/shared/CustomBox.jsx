import React, { useState } from 'react'
<<<<<<< HEAD

const CustomBox = ({ children, divider = false, title = "" }) => {
    const [isOpenComments, setIsOpenComments] = useState(false);
=======
import ContentEditable from "react-contenteditable";
import { motion } from "framer-motion"

const CustomBox = ({ children, divider = false, profile = "", imgProfile = "", dataPost = "" }) => {
    const [isOpenComments, setIsOpenComments] = useState(false);
    const [field, setField] = useState("Aggiungi un Commento...");
    const [replyComments, setReplyComments] = useState(false);

    const handleChange = (event) => {
        setField(event.target.value);
    }
>>>>>>> origin/ludovica

    const toggleCommentsBox = () => {
        setIsOpenComments((isOpen) => !isOpen);
    }

<<<<<<< HEAD
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
=======
    const toggleReplyComments = () => {
        setReplyComments((isOpen) => !isOpen);
    }

    return (
        <>
            <div className="m-5 p-4 rounded-lg bg-white w-full shadow">
                <div className='flex'>
                    <div>
                        <img className='imgProfile-post' src={imgProfile} alt="Profile" />
                    </div>
                    <div className="rounded-t-lg flex flex-col flex-1 justify-center ml-4">
                        <h3 className="">{profile}</h3>
                        <span className='textSmall-gray'>{dataPost}</span>
                    </div>
                    <div className='flex'>
                        <button className="p-2 mr-2 justify-center">
                            <i className="fa-solid fa-ellipsis"></i>
                        </button>
                    </div>
                </div>
                {/* divider &&  */<div className="w-full h-[1px] mb-5 mt-2 bg-slate-100"></div>}
                <div className="m-4 rounded-b-lg">
                    <div>
                        {children}
                    </div>
                    <div className='flex mt-4'>
                        <ul className='flex mr-1'>
                            <li>
                                <img className='img-LikesProf' src="https://images.pexels.com/photos/12893376/pexels-photo-12893376.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Mario Rossi" />
                            </li>
                            <li className='-ml-4'>
                                <img className='img-LikesProf' src="https://images.pexels.com/photos/8219320/pexels-photo-8219320.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Anna Bianchi" />
                            </li>
                            <li className='-ml-4'>
                                <img className='img-LikesProf' src="https://images.pexels.com/photos/5967959/pexels-photo-5967959.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Luigi Verdi" />
                            </li>
                            <li className='-ml-4'>
                                <img className='img-LikesProf' src="https://images.pexels.com/photos/6617683/pexels-photo-6617683.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Sara Gialli" />
                            </li>
                        </ul>
                        <span className='font-bold text-sm mr-1 mt-2'>Mario Rossi </span> <span className='mt-2 textSmall-gray'> e altri 99 hanno messo Mi Piace</span>
                    </div>
                </div>
                <div className="flex flex-col mt-5 pt-3 border-t border-slate-100 rounded-b-lg">
                    <div className='flex justify-between'>
                        <button className='hover:text-primayColor'>
                            <i className="fa-regular fa-compass icon"></i>
                            <span className='icon-text'>100 Mi Piace</span>
                        </button>
                        <div>
                            <button onClick={toggleCommentsBox}>
                                <i className="fa-regular fa-comment-dots icon"></i>
                                <span className='icon-text'>20 Commenti</span>
                            </button>
                            <button>
                                <i className="fa-solid fa-suitcase-rolling icon"></i>
                                <span className='icon-text'>Salva</span>
                            </button>
                            <button>
                                <i className="fa-solid fa-share-nodes icon"></i>
                                <span className='icon-text'>Condividi</span>
                            </button>
                        </div>
                    </div>
                    {
                        isOpenComments && (
                            <div className='flex flex-col'>
                                <div className='p-4 mt-3 border-t border-slate-100'>
                                    <div className='flex'>
                                        <img className='img-CommentsProf' src={"https://images.pexels.com/photos/2287129/pexels-photo-2287129.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"} alt="Profile" />
                                        <div className="rounded-t-lg flex ml-4 items-center">
                                            <h3 className="">Alex Bryan</h3>
                                            <span className='textSmall-gray ml-2'>2 minuti fa</span>
                                        </div>
                                    </div>
                                    <div className=' mt-2 ml-4 p-2 text-sm bg-slate-100 rounded-b-lg'>
                                        <p>"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi repellat aliquid, explicabo ipsa adipisci molestias illo temporibus id, cupiditate tempore magnam suscipit! Aut illo veritatis quo. Id dolor explicabo temporibus."</p>
                                        <div className='ml-3 mt-2'>
                                            <button className='relative btn-reactions'>
                                                <div className="absolute -top-3 left-[15px] opacity-0 flex bg-white p-1 rounded-md invisible" id='reactions'>
                                                    <motion.i className="fa-solid fa-heart m-1" style={{ color: '#f31212' }}
                                                        whileHover={{scale: 1.2}}
                                                    >
                                                    </motion.i>
                                                    <motion.i className="fa-regular fa-thumbs-up m-1" style={{ color: '#74C0FC' }}
                                                        whileHover={{scale: 1.2}}
                                                    >
                                                    </motion.i>
                                                    <motion.i className="fa-solid fa-plane-up text-secondaryColor m-1"
                                                        whileHover={{scale: 1.2}}
                                                    >
                                                    </motion.i>
                                                    <motion.i className="fa-solid fa-face-laugh-squint m-1" style={{ color: '#FFD43B' }}
                                                        whileHover={{scale: 1.2}}
                                                    >
                                                    </motion.i>
                                                    <motion.i className="fa-solid fa-face-surprise m-1" style={{ color: '#FFD43B' }}
                                                        whileHover={{scale: 1.2}}
                                                    >
                                                    </motion.i>
                                                    <motion.i className="fa-solid fa-face-grin-hearts m-1" style={{ color: '#FFD43B' }}
                                                        whileHover={{scale: 1.2}}
                                                    >
                                                    </motion.i>
                                                    <motion.span  className='textSmall-gray'
                                                        whileHover={{scale: 1.2}}
                                                    >
                                                        ...
                                                    </motion.span>
                                                </div>
                                                <i className="fa-solid fa-icons icon"></i>
                                                <span className='icon-text'>Reazioni</span>
                                            </button>
                                            <button onClick={toggleReplyComments}>
                                                <i className="fa-solid fa-reply icon"></i>
                                                <span className='icon-text'>Rispondi...</span>
                                            </button>
                                        </div>
                                    </div>
                                    {
                                        replyComments && (
                                            <div className='flex mt-4 ml-4'>
                                                <img className='img-CommentsProf' src={imgProfile} alt="Profile" />
                                                <div className="flex flex-1 justify-between items-center ml-3 p-1 h-14 border border-slate-100 rounded-md ">
                                                    <ContentEditable onChange={handleChange} disabled={false} html={field} className="outline-none textSmall-gray" />
                                                    <motion.button className="btn"
                                                        whileTap={{ scale: 0.95 }}
                                                    >
                                                        Invia
                                                    </motion.button>
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                                <div className='flex mt-4'>
                                    <img className='img-CommentsProf' src={imgProfile} alt="Profile" />
                                    <div className="flex flex-1 justify-between items-center ml-3 p-1 h-16 border border-slate-100 rounded-md ">
                                        <ContentEditable onChange={handleChange} disabled={false} html={field} className="outline-none textSmall-gray" />
                                        <motion.button className="btn"
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            Invia
                                        </motion.button>
                                    </div>
                                </div>
>>>>>>> origin/ludovica
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default CustomBox