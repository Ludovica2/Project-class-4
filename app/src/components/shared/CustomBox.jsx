import React, { useEffect, useRef, useState } from 'react'
import ContentEditable from "react-contenteditable";
import { motion } from "framer-motion"
import ImageModal from './ImageModal';
import { useClickOutside } from '../../hooks/useClickOutside';
import PopUpModal from './PopUpModal';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { formatDistance } from 'date-fns';
import { it } from 'date-fns/locale';
import { config } from '../../config/config';

const CustomBox = ({ children, post, imgProfile = "", dataPost = "", nickname = "" }) => {
    const { token, user } = useSelector((state) => state.auth);
    const [isOpenComments, setIsOpenComments] = useState(false);
    const [field, setField] = useState("Aggiungi un Commento...");
    const [replyComments, setReplyComments] = useState(false);
    const { active: isOpenOptionsMenu, setActive: setIsOpenOptionsMenu, elRef: optionsRef } = useClickOutside(false)

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

    const formatPostAuthorName = (post) => {
        return post.from.role == "user" ? `${post.from.first_name} ${post.from.last_name}` : post.from?.metadata?.company_name;
    }

    return (
        <>
            <div className="m-5 p-4 rounded-lg bg-white w-full shadow dark:bg-elements_dark dark:shadow-slate-600 max-lg:mx-4 max-md:max-w-[600px] max-lg:max-w-[700px]">
                <div className='flex'>
                    <div>
                        <Link className="cursor-pointer flex items-center justify-center" to={`/app/profile/${nickname.replace("@", "")}`}>
                            <div style={{ backgroundImage: `url(${imgProfile}?token=${token})` }} className="imgProfile-post bg-cover bg-center"></div>
                        </Link>
                    </div>
                    <div className="rounded-t-lg flex flex-col flex-1 justify-center ml-4">
                        <div className='flex'>
                            <Link className="cursor-pointer flex items-center justify-center" to={`/app/profile/${nickname.replace("@", "")}`}>
                                <h3 className="dark:text-white">
                                    {formatPostAuthorName(post)} - <span className='text-xs text-black font-bold self-end ml-1 mb-[2px] dark:text-slate-300'> @{nickname}</span>
                                    {
                                        post.from.role == "business" && (
                                            <i className="fa-solid fa-certificate text-primaryColor ml-2"></i>
                                        )
                                    }
                                </h3>
                            </Link>
                        </div>
                        <span className='textSmall-gray dark:text-slate-300'>{formatDistance(post.createdAt, new Date(), { locale: it, addSuffix: true })}</span>
                    </div>
                    <div className='flex'>
                        <div className="p-2 mr-2 justify-center relative cursor-pointer" onClick={toggleOptionsPost}>
                            <i className="fa-solid fa-ellipsis dark:text-gray-500"></i>
                            {
                                isOpenOptionsMenu && (
                                    <motion.div ref={optionsRef} className="flex flex-col absolute top-9 -left-3 px-2 min-w-52 bg-white border border-slate-100 z-10 dark:bg-elements_dark  dark:shadow dark:shadow-slate-400 dark:border-none
                                    max-lg:-left-36"
                                        initial={{ y: -8 }}
                                        animate={{ y: "calc(0vw + 5%)" }}
                                    >
                                        {
                                            user._id == post.from._id ? (
                                                <>
                                                    <button className='flex mt-2 mb-2 group' >
                                                        <div>
                                                            <i className="fa-solid fa-pen-to-square text-text_secondaryColor text-xl group-hover:text-secondaryColor_Hover"></i>
                                                        </div>
                                                        <h3 className='text-sm ml-2 mt-1 font-semibold align-middle text-start dark:text-slate-300'>Modifica Post</h3>
                                                    </button>
                                                    <button className='flex mt-2 mb-2 group' >
                                                        <div>
                                                            <i className="fa-solid fa-trash text-text_secondaryColor text-xl group-hover:text-secondaryColor_Hover"></i>
                                                        </div>
                                                        <h3 className='text-sm ml-2 mt-1 font-semibold align-middle text-start dark:text-slate-300'>Elimina Post</h3>
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <button className='flex mt-2 border-b border-b-slate-100 group'>
                                                        <div>
                                                            <i className="fa-regular fa-circle-xmark text-text_secondaryColor text-xl group-hover:text-secondaryColor_Hover"></i>
                                                        </div>
                                                        <div className='flex flex-col ml-2'>
                                                            <h3 className='text-sm font-semibold text-start dark:text-slate-300'>Nascondi Post</h3>
                                                            <span className='mb-2 text-xs text-start text-text_secondaryColor group-hover:text-secondaryColor_Hover text-dark'>Mostra meno post come questo.</span>
                                                        </div>
                                                    </button>
                                                    <button className='flex mt-2 border-b border-b-slate-100 group'>
                                                        <div>
                                                            <i className="fa-solid fa-user-minus text-text_secondaryColor text-xl group-hover:text-secondaryColor_Hover"></i>
                                                        </div>
                                                        <div className='flex flex-col ml-2'>
                                                            <h3 className='text-sm font-semibold text-start dark:text-slate-300'>Non seguire più</h3>
                                                            <span className='mb-2 text-xs text-start text-text_secondaryColor group-hover:text-secondaryColor_Hover text-dark'>Non vedrai più i post di questo utente.</span>
                                                        </div>
                                                    </button>
                                                    <button className='flex mt-2 border-b border-b-slate-100 group'>
                                                        <div>
                                                            <i className="fa-solid fa-bell text-text_secondaryColor text-xl group-hover:text-secondaryColor_Hover"></i>
                                                        </div>
                                                        <div className='flex flex-col ml-2'>
                                                            <h3 className='text-sm font-semibold text-start dark:text-slate-300'>Attiva Notifiche</h3>
                                                            <span className='mb-2 text-xs text-text_secondaryColor text-start group-hover:text-secondaryColor_Hover text-dark'>Riceverai notifiche per i nuovi post di questo utente.</span>
                                                        </div>
                                                    </button>
                                                </>
                                            )
                                        }
                                        {
                                            <PopUpModal title={"Condividi"} sizeModal={"md"}
                                                showBtn={(openModal) => {
                                                    return <button className='flex mt-2 mb-2 group' onClick={() => openModal(true)}>
                                                        <div>
                                                            <i className="fa-solid fa-share-nodes text-text_secondaryColor text-xl group-hover:text-secondaryColor_Hover"></i>
                                                        </div>

                                                        <h3 className='text-sm ml-2 mt-1 font-semibold align-middle text-start dark:text-slate-300'>Condividi Post</h3>


                                                    </button>;
                                                }}
                                            >
                                                {
                                                    <>
                                                        <div className="flex items-center w-full mb-8 gap-5">
                                                            <div className='w-12 h-12 cursor-pointer'>
                                                                <img src="https://img.icons8.com/?size=100&id=16713&format=png&color=000000" alt="whatsApp" />
                                                            </div>
                                                            <div className='w-12 h-12 cursor-pointer'>
                                                                <img src="https://img.icons8.com/color/48/telegram-app--v1.png" alt="telegram" />
                                                            </div>
                                                            <div className='w-12 h-12 cursor-pointer'>
                                                                <img src="https://img.icons8.com/color/48/instagram-new--v1.png" alt="instagram" />
                                                            </div>
                                                            <div className='w-12 h-12 cursor-pointer'>
                                                                <img src="https://img.icons8.com/color/48/facebook-new.png" alt="facebook" />
                                                            </div>
                                                            <div className='w-12 h-12 cursor-pointer'>
                                                                <img src="https://img.icons8.com/color/48/pinterest--v1.png" alt="pinterest" />
                                                            </div>
                                                            <div className='w-12 h-12 cursor-pointer flex items-center'>
                                                                <i className="fa-solid fa-ellipsis text-3xl dark:text-gray-500"></i>
                                                            </div>
                                                        </div>
                                                        <div className='relative'>
                                                            <input type="text" value={`${config.CLIENT_URL}/app/feed/${post._id}`} className="w-full input_field h-14" readOnly />
                                                            <button className="btn absolute bottom-2 right-2">Copia</button>
                                                        </div>
                                                    </>
                                                }
                                            </PopUpModal>

                                        }

                                    </motion.div>
                                )
                            }
                        </div>
                    </div>
                </div>
                <div className="w-full h-[1px] mb-5 mt-2 bg-slate-100"></div>
                <div className="m-4 rounded-b-lg">
                    <div>
                        {
                            post?.locality && (
                                 <div className='mb-4'>
                                     <i className="fa-solid fa-location-dot text-secondaryColor text-lm"></i>
                                     <span className='ml-1 text-dark'>{post.locality}</span>
                                 </div>
                            )
                        }
                        {children}
                        <div className="w-full my-4">
                            {
                                // IMAGES
                                Array.isArray(post?.images) && post?.images.length > 0 && (
                                    <ImageModal images={post.images} token={token}>
                                        {
                                            (setIsShowModal) => {
                                                if (post.images.length == 1) {
                                                    return (
                                                        <div className="w-full h-auto max-h-[350px] flex justify-center items-center overflow-hidden">
                                                            <img className="w-full h-auto cursor-pointer" src={`${post.images[0]}?token=${token}`} alt="Post image" onClick={() => setIsShowModal(true)} />
                                                        </div>
                                                    )
                                                } else {
                                                    return (
                                                        <div className="w-full h-auto flex-wrap flex gap-[1%]">
                                                            {
                                                                post.images.slice(0, 3).map((img, i) => {
                                                                    if (post.images.length <= 3) {
                                                                        return (
                                                                            <div
                                                                                key={img}
                                                                                style={{
                                                                                    width: `32.33%`,
                                                                                    backgroundImage: `url(${img}?token=${token})`,
                                                                                    backgroundRepeat: "no-repete",
                                                                                    backgroundSize: "cover",
                                                                                    backgroundPosition: "center center"
                                                                                }}
                                                                                className={`h-auto min-h-[250px] cursor-pointer`}
                                                                                onClick={() => setIsShowModal(true)}
                                                                            />
                                                                        )
                                                                    } else {
                                                                        if (i < 2) {
                                                                            return (
                                                                                <div
                                                                                    key={img}
                                                                                    style={{
                                                                                        width: `32.33%`,
                                                                                        backgroundImage: `url(${img}?token=${token})`,
                                                                                        backgroundRepeat: "no-repete",
                                                                                        backgroundSize: "cover",
                                                                                        backgroundPosition: "center center"
                                                                                    }}
                                                                                    className={`h-auto min-h-[250px] cursor-pointer`}
                                                                                    onClick={() => setIsShowModal(true)}
                                                                                />
                                                                            )
                                                                        } else {
                                                                            return (
                                                                                <div
                                                                                    key={img}
                                                                                    style={{
                                                                                        width: `${(100 / post.images.slice(0, 3).length) - 1}%`,
                                                                                        backgroundImage: `url(${img}?token=${token})`,
                                                                                        backgroundRepeat: "no-repete",
                                                                                        backgroundSize: "cover",
                                                                                        backgroundPosition: "center center"
                                                                                    }}
                                                                                    className={`h-auto min-h-[250px] cursor-pointer relative`}
                                                                                    onClick={() => setIsShowModal(true)}
                                                                                >
                                                                                    <div className="w-full h-full absolute bg-black bg-opacity-70 flex justify-center items-center text-white font-extrabold text-3xl top-0 left-0">
                                                                                        +{post.images.length - 2}
                                                                                    </div>
                                                                                </div>
                                                                            )
                                                                        }
                                                                    }
                                                                })
                                                            }
                                                        </div>
                                                    )
                                                }
                                            }
                                        }
                                    </ImageModal>
                                )
                            }
                        </div>
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
                                <img className='img-LikesProf' src="https://images.pexels.com/photos/5967959/pexels-photo-5967959.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Gino Fluffy" />
                            </li>
                            <li className='-ml-4'>
                                <img className='img-LikesProf' src="https://images.pexels.com/photos/6617683/pexels-photo-6617683.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Sara Gialli" />
                            </li>
                        </ul>
                        <span className='font-bold text-sm mr-1 mt-2 text-dark'>Mario Rossi </span> <span className='mt-2 textSmall-gray'> e altri 99 hanno messo Mi Piace</span>
                    </div>
                </div>
                <div className="flex flex-col mt-5 pt-3 border-t border-slate-100 rounded-b-lg">
                    <div className='flex justify-between'>
                        <button className='group'>
                            <i className="fa-regular fa-compass icon group-hover:text-primaryColor"></i>
                            <span className='icon-text group-hover:text-primaryColor'>100 Mi Piace</span>
                        </button>
                        <div>
                            <button onClick={toggleCommentsBox} className='group'>
                                <i className="fa-regular fa-comment-dots icon group-hover:text-primaryColor"></i>
                                <span className='icon-text group-hover:text-primaryColor'>20 Commenti</span>
                            </button>
                            {
                                post.post_type === "event" && (
                                    <button className='group'>
                                        <i className="fa-regular fa-calendar-days icon group-hover:text-primaryColor"></i>
                                        <span className='icon-text group-hover:text-primaryColor'>Aggiungi</span>
                                    </button>
                                )
                            }
                            <button className='group'>
                                <i className="fa-solid fa-suitcase-rolling icon group-hover:text-primaryColor"></i>
                                <span className='icon-text group-hover:text-primaryColor'>Salva</span>
                            </button>
                            {
                                <PopUpModal title={"Invia a..."} sizeModal={"md"}
                                    showBtn={(openModal) => {
                                        return <button onClick={() => openModal(true)} className="group">
                                            <i className="fa-regular fa-paper-plane icon group-hover:text-primaryColor"></i>
                                            <span className='icon-text group-hover:text-primaryColor'>Invia</span>
                                        </button>;
                                    }}
                                >
                                    {
                                        <>
                                            {
                                                <div className=' flex'>
                                                    {user.following.map((item) => {
                                                        return <Link key={item._id} to={`/app/chat?share=http://localhost:5173/app/feed/${post._id}&recipient=${item._id}`} target="_blank" className='flex flex-col items-center w-1/3 cursor-pointer'>
                                                            <div className="flex justify-center items-center w-[90px] h-[90px] bg-white rounded-full shadow dark:bg-elements_dark dark:shadow-slate-400">
                                                                <img className='w-20 h-20 rounded-full' crossOrigin="anonymous" src={`${item.user.avatar}?token=${token}`} alt="Profile" />
                                                            </div>
                                                            <span className='max-w-24 truncate'>{item.user.nickname}</span>
                                                        </Link>;
                                                    })}
                                                </div>
                                            }
                                        </>
                                    }
                                </PopUpModal>
                            }
                        </div>
                    </div>
                    {
                        isOpenComments && (
                            <div className='flex flex-col'>
                                <div className='p-4 mt-3 border-t border-slate-100'>
                                    <div className='flex'>
                                        <img className='img-CommentsProf' src={"https://images.pexels.com/photos/2287129/pexels-photo-2287129.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"} alt="Profile" />
                                        <div className="rounded-t-lg flex ml-4 items-center">
                                            <h3 className="dark:text-slate-300">Alex Bryan</h3>
                                            <span className='textSmall-gray ml-2'>2 minuti fa</span>
                                        </div>
                                    </div>
                                    <div className=' mt-2 ml-4 p-2 text-sm bg-slate-100 rounded-b-lg dark:bg-elements_dark'>
                                        <p className='text-dark'>"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi repellat aliquid, explicabo ipsa adipisci molestias illo temporibus id, cupiditate tempore magnam suscipit! Aut illo veritatis quo. Id dolor explicabo temporibus."</p>
                                        <div className='ml-3 mt-2'>
                                            <button className='relative btn-reactions group'>
                                                <div className="absolute -top-3 left-[15px] opacity-0 flex bg-white p-1 rounded-md invisible dark:bg-elements_dark dark:shadow dark:shadow-slate-400" id='reactions'>
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
                                                <i className="fa-solid fa-icons icon group-hover:text-primaryColor"></i>
                                                <span className='icon-text group-hover:text-primaryColor'>Reazioni</span>
                                            </button>
                                            <button onClick={toggleReplyComments} className='group'>
                                                <i className="fa-solid fa-reply icon group-hover:text-primaryColor" ></i>
                                                <span className='icon-text group-hover:text-primaryColor'>Rispondi...</span>
                                            </button>
                                        </div>
                                    </div>
                                    {
                                        replyComments && (
                                            <div className='flex mt-4 ml-4'>
                                                <img className='img-CommentsProf' crossOrigin="anonymous" src={`${user.avatar}?token=${token}`} alt="Profile" />
                                                <div className="flex flex-1 justify-between items-center ml-3 p-1 h-14 border border-slate-100 rounded-md ">
                                                    <textarea onChange={handleChange} disabled={false} value={field} placeholder="Rispondi al commento..." className="outline-none w-full h-full border-0 focus:ring-0 textSmall-gray"></textarea>
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
                                    <img className='img-CommentsProf' crossOrigin="anonymous" src={`${user.avatar}?token=${token}`} alt="Profile" />
                                    <div className="flex flex-1 justify-between items-center ml-3 p-1 h-16 border border-slate-100 rounded-md ">
                                        <textarea onChange={handleChange} disabled={false} value={field} placeholder="Aggiungi un commento..." className="outline-none w-full h-full border-0 focus:ring-0 textSmall-gray"></textarea>
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