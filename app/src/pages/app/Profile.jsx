import { useEffect, useRef } from "react"
import PostEditing from "../../components/PostEditing";
import Widget from "../../components/shared/Widget";
import { motion } from "framer-motion"
import { Link } from "react-router-dom";
import ImageModal from "../../components/shared/ImageModal";

const Profile = () => {
    const modalElement = useRef();
    const modalImage = useRef();

    const closeModal = () => {
        modalElement.current.style.display = "none";
    }

    useEffect(() => {
        document.title = "Profile - Found!";
    }, []);

    return (
        <>
            <div className="flex flex-col my-7 w-full max-w-[1280px] lg:max-w-[1320px]">
                <div className="flex relative bg-white rounded-lg shadow m-5">
                    <div className="flex justify-center items-center w-32 h-32 absolute -top-11 -left-3 bg-white rounded-[50%] shadow">
                        {/* Modal */}
                        {
                           <ImageModal images={["https://images.pexels.com/photos/670741/pexels-photo-670741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"]}>
                            {
                                (setIsShowModal) => {
                                    return <img className='imgProfile cursor-pointer' onClick={() => setIsShowModal(true)} src="https://images.pexels.com/photos/670741/pexels-photo-670741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Profile"/>
                                }
                            }
                            </ImageModal>
                        }
                    </div>
                    <div className="flex flex-col w-full ">
                        <div className="flex justify-between ml-32 p-3">
                            <div className="flex flex-col">
                                <h2 className="text-xl mb-2">Ilaria Mammana</h2>
                                <div className="flex">
                                    <ul className="flex justify-center w-full">
                                        <li className="border-r border-r-slate-100 px-8 py-4">
                                            <div className="flex flex-col justify-center">
                                                <span className="font-bold">Post</span>
                                                <span className="text-center">20</span>
                                            </div>
                                        </li>
                                        <li className="border-r border-r-slate-100 px-8 py-4">
                                            <div className="flex flex-col">
                                                <span className="font-bold">Città</span>
                                                <span className="text-center">9</span>
                                            </div>
                                        </li>
                                        <li className="border-r border-r-slate-100 px-8 py-4">
                                            <div className="flex flex-col">
                                                <span className="font-bold">Eventi</span>
                                                <span className="text-center">5</span>
                                            </div>
                                        </li>
                                        <li className="border-r border-r-slate-100 px-8 py-4">
                                            <div className="flex flex-col">
                                                <span className="font-bold">Amici</span>
                                                <span className="text-center">50</span>
                                            </div>
                                        </li>
                                        <li className="px-8 py-4">
                                            <div className="flex flex-col">
                                                <span className="font-bold">Attrazioni</span>
                                                <span className="text-center">22</span>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <div className="flex justify-end mr-2">
                                    <Link to="/app/profile/editprofile">
                                        <button className="relative btn-tooltip">
                                            <i className="fa-solid fa-user-pen text-text_primaryColor"></i>
                                            <div className="tooltip-container tooltip-bottom">
                                                Modifica Profilo
                                                <div className="arrow-tooltip arrow-tlt-bottom"></div>
                                            </div>
                                        </button>
                                    </Link>
                                </div>
                                <div className="">
                                    <p className="m-2">Altri Social</p>
                                    <div className="flex gap-1">
                                        <motion.button className="w-5 h-5 relative btn-tooltip"
                                            whileHover={{ scale: 1.2 }}
                                        >
                                            <img src="/images/instagram.png" alt="instagram" />
                                            <div className="tooltip-container tooltip-bottom">
                                                Instagram
                                                <div className="arrow-tooltip arrow-tlt-bottom"></div>
                                            </div>
                                        </motion.button>
                                        <motion.button className="w-5 h-5 relative btn-tooltip"
                                            whileHover={{ scale: 1.2 }}
                                        >
                                            <img src="/images/facebook.png" alt="facebook" />
                                            <div className="tooltip-container tooltip-bottom">
                                                Facebook
                                                <div className="arrow-tooltip arrow-tlt-bottom"></div>
                                            </div>
                                        </motion.button>
                                        <motion.button className="w-5 h-5 relative btn-tooltip"
                                            whileHover={{ scale: 1.2 }}
                                        >
                                            <img src="/images/tiktok.png" alt="tiktok" />
                                            <div className="tooltip-container tooltip-bottom">
                                                TikTok
                                                <div className="arrow-tooltip arrow-tlt-bottom"></div>
                                            </div>
                                        </motion.button>
                                        <motion.button className="w-5 h-5 relative btn-tooltip"
                                            whileHover={{ scale: 1.2 }}
                                        >
                                            <img src="/images/threads.png" alt="threads" />
                                            <div className="tooltip-container tooltip-bottom">
                                                Threads
                                                <div className="arrow-tooltip arrow-tlt-bottom"></div>
                                            </div>
                                        </motion.button>
                                        <motion.button className="w-5 h-5 relative btn-tooltip"
                                            whileHover={{ scale: 1.2 }}
                                        >
                                            <img src="/images/youtube.png" alt="youtube" />
                                            <div className="tooltip-container tooltip-bottom">
                                                YouTube
                                                <div className="arrow-tooltip arrow-tlt-bottom"></div>
                                            </div>
                                        </motion.button>
                                        <motion.button className="w-5 h-5 relative btn-tooltip"
                                            whileHover={{ scale: 1.2 }}
                                        >
                                            <img src="/images/pinterest.png" alt="pinterest" />
                                            <div className="tooltip-container tooltip-bottom">
                                                Pinterest
                                                <div className="arrow-tooltip arrow-tlt-bottom"></div>
                                            </div>
                                        </motion.button>
                                        <motion.button className="w-5 h-5 relative btn-tooltip"
                                            whileHover={{ scale: 1.2 }}
                                        >
                                            <img src="/images/twitter.png" alt="twitter" />
                                            <div className="tooltip-container tooltip-bottom">
                                                Twitter
                                                <div className="arrow-tooltip arrow-tlt-bottom"></div>
                                            </div>
                                        </motion.button>
                                        <motion.button className="w-5 h-5 relative btn-tooltip"
                                            whileHover={{ scale: 1.2 }}
                                        >
                                            <img src="/images/linkedin.png" alt="linkedin" />
                                            <div className="tooltip-container tooltip-bottom">
                                                Linkedin
                                                <div className="arrow-tooltip arrow-tlt-bottom"></div>
                                            </div>
                                        </motion.button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex"></div>
                <div className="flex gap-4">
                    <div className="w-1/4">
                        <Widget />
                    </div>
                    <div className="flex justify-center flex-1">
                        <PostEditing />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile