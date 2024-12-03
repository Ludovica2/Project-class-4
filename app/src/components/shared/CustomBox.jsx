import React, { useEffect, useRef, useState } from 'react'
import ContentEditable from "react-contenteditable";
import { motion } from "framer-motion"
import ImageModal from './ImageModal';
import { useClickOutside } from '../../hooks/useClickOutside';

const CustomBox = ({ children, divider = false, profile = "", imgProfile = "", dataPost = "" }) => {
    const [isOpenComments, setIsOpenComments] = useState(false);
    const [field, setField] = useState("Aggiungi un Commento...");
    const [replyComments, setReplyComments] = useState(false);
    const { active: isOpenOptionsMenu, setActive: setIsOpenOptionsMenu, elRef: optionsRef} = useClickOutside(false)

    const handleChange = (event) => {
        setField(event.target.value);
    }

    const toggleCommentsBox = () => {
        setIsOpenComments((isOpen) => !isOpen);
    }

    const toggleReplyComments = () => {
        setReplyComments((isOpen) => !isOpen);
    }

    const toggleOptionsPost = () => {
        setIsOpenOptionsMenu(true);
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
                        <div className="p-2 mr-2 justify-center relative cursor-pointer" onClick={toggleOptionsPost}>
                            <i className="fa-solid fa-ellipsis"></i>
                            {
                                isOpenOptionsMenu && (
                                    <motion.div ref={optionsRef} className="flex flex-col absolute top-9 -left-3 px-2 w-64 bg-white border border-slate-100 z-10"
                                        initial={{ y: -8 }}
                                        animate={{ y: "calc(0vw + 5%)" }}
                                    >
                                        <button className='flex mt-2 border-b border-b-slate-100 group'>
                                            <div>
                                                <i className="fa-regular fa-circle-xmark text-text_secondaryColor text-xl group-hover:text-secondaryColor_Hover"></i>
                                            </div>
                                            <div className='flex flex-col ml-2'>
                                                <h3 className='text-sm font-semibold text-start'>Nascondi Post</h3>
                                                <span className='mb-2 text-xs text-text_secondaryColor group-hover:text-secondaryColor_Hover'>Mostra meno post come questo.</span>
                                            </div>
                                        </button>
                                        <button className='flex mt-2 border-b border-b-slate-100 group'>
                                            <div>
                                                <i className="fa-solid fa-user-minus text-text_secondaryColor text-xl group-hover:text-secondaryColor_Hover"></i>
                                            </div>
                                            <div className='flex flex-col ml-2'>
                                                <h3 className='text-sm font-semibold text-start'>Non seguire più</h3>
                                                <span className='mb-2 text-xs text-text_secondaryColor text-start group-hover:text-secondaryColor_Hover'>Non vedrai più i post di questo utente.</span>
                                            </div>
                                        </button>
                                        <button className='flex mt-2 border-b border-b-slate-100 group'>
                                            <div>
                                                <i className="fa-solid fa-bell text-text_secondaryColor text-xl group-hover:text-secondaryColor_Hover"></i>
                                            </div>
                                            <div className='flex flex-col ml-2'>
                                                <h3 className='text-sm font-semibold text-start'>Attiva Notifiche</h3>
                                                <span className='mb-2 text-xs text-text_secondaryColor text-start group-hover:text-secondaryColor_Hover'>Riceverai notifiche per i nuovi post di questo utente.</span>
                                            </div>
                                        </button>
                                    </motion.div>
                                )
                            }
                        </div>
                    </div>
                </div>
                <div className="w-full h-[1px] mb-5 mt-2 bg-slate-100"></div>
                <div className="m-4 rounded-b-lg">
                    <div>
                        {children}
                    </div>

                    {/* Modal */}
                    <div>
                        {
                            <ImageModal images={["https://images.pexels.com/photos/12893376/pexels-photo-12893376.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", "https://images.pexels.com/photos/8219320/pexels-photo-8219320.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", "https://images.pexels.com/photos/5967959/pexels-photo-5967959.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", "https://images.pexels.com/photos/6617683/pexels-photo-6617683.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"]}> 
                                {
                                    (setIsShowModal) => {
                                        return <button onClick={() => setIsShowModal(true)}>Images</button>;
                                    }
                                }
                            </ImageModal>
                        }
                        
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
                        <button className='group'>
                            <i className="fa-regular fa-compass icon group-hover:text-primayColor"></i>
                            <span className='icon-text group-hover:text-primayColor'>100 Mi Piace</span>
                        </button>
                        <div>
                            <button onClick={toggleCommentsBox} className='group'>
                                <i className="fa-regular fa-comment-dots icon group-hover:text-primayColor"></i>
                                <span className='icon-text group-hover:text-primayColor'>20 Commenti</span>
                            </button>
                            <button className='group'>
                                <i className="fa-solid fa-suitcase-rolling icon group-hover:text-primayColor"></i>
                                <span className='icon-text group-hover:text-primayColor'>Salva</span>
                            </button>
                            <button className='group'>
                                <i className="fa-solid fa-share-nodes icon group-hover:text-primayColor"></i>
                                <span className='icon-text group-hover:text-primayColor'>Condividi</span>
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
                                            <button className='relative btn-reactions group'>
                                                <div className="absolute -top-3 left-[15px] opacity-0 flex bg-white p-1 rounded-md invisible" id='reactions'>
                                                    <motion.i className="fa-solid fa-heart m-1" style={{ color: '#f31212' }}
                                                        whileHover={{ scale: 1.2 }}
                                                    >
                                                    </motion.i>
                                                    <motion.i className="fa-regular fa-thumbs-up m-1" style={{ color: '#74C0FC' }}
                                                        whileHover={{ scale: 1.2 }}
                                                    >
                                                    </motion.i>
                                                    <motion.i className="fa-solid fa-plane-up text-secondaryColor m-1"
                                                        whileHover={{ scale: 1.2 }}
                                                    >
                                                    </motion.i>
                                                    <motion.i className="fa-solid fa-face-laugh-squint m-1" style={{ color: '#FFD43B' }}
                                                        whileHover={{ scale: 1.2 }}
                                                    >
                                                    </motion.i>
                                                    <motion.i className="fa-solid fa-face-surprise m-1" style={{ color: '#FFD43B' }}
                                                        whileHover={{ scale: 1.2 }}
                                                    >
                                                    </motion.i>
                                                    <motion.i className="fa-solid fa-face-grin-hearts m-1" style={{ color: '#FFD43B' }}
                                                        whileHover={{ scale: 1.2 }}
                                                    >
                                                    </motion.i>
                                                    <motion.span className='textSmall-gray'
                                                        whileHover={{ scale: 1.2 }}
                                                    >
                                                        ...
                                                    </motion.span>
                                                </div>
                                                <i className="fa-solid fa-icons icon group-hover:text-primayColor"></i>
                                                <span className='icon-text group-hover:text-primayColor'>Reazioni</span>
                                            </button>
                                            <button onClick={toggleReplyComments} className='group'>
                                                <i className="fa-solid fa-reply icon group-hover:text-primayColor" ></i>
                                                <span className='icon-text group-hover:text-primayColor'>Rispondi...</span>
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
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default CustomBox