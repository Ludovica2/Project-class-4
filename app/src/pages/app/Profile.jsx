import { useEffect } from "react"
import PostEditing from "../../components/PostEditing";
import Widget from "../../components/shared/Widget";
import { motion } from "framer-motion"

const Profile = () => {
    useEffect(() => {
        document.title = "Profile - Found!";
    }, []);
    return (
        <>
            <div className="flex flex-col my-7">
                <div className="flex relative bg-white rounded-lg shadow m-5">
                    <div className="flex justify-center items-center w-32 h-32 absolute -top-11 -left-3 bg-white rounded-[50%] shadow">
                        <img className='imgProfile' src="https://images.pexels.com/photos/670741/pexels-photo-670741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Profile" />
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
                                <p className="m-2">Altri Social</p>
                                <div className="flex col-span-4 gap-1">
                                    <motion.button className="w-5 h-5"
                                        whileHover={{ scale: 1.2 }}
                                    >
                                        <img src="/images/instagram.png" alt="instagram"/>
                                    </motion.button>
                                    <motion.button className="w-5 h-5"
                                        whileHover={{ scale: 1.2 }}
                                    >
                                        <img src="/images/facebook.png" alt="facebook"/>
                                    </motion.button>
                                    <motion.button className="w-5 h-5"
                                        whileHover={{ scale: 1.2 }}
                                    >
                                        <img src="/images/tiktok.png" alt="tiktok"/>
                                    </motion.button>
                                    <motion.button className="w-5 h-5"
                                        whileHover={{ scale: 1.2 }}
                                    >
                                        <img src="/images/threads.png" alt="threads"/>
                                    </motion.button>
                                    <motion.button className="w-5 h-5"
                                        whileHover={{ scale: 1.2 }}
                                    >
                                        <img src="/images/youtube.png" alt="youtube"/>
                                    </motion.button>
                                    <motion.button className="w-5 h-5"
                                        whileHover={{ scale: 1.2 }}
                                    >
                                        <img src="/images/pinterest.png" alt="pinterest"/>
                                    </motion.button>
                                    <motion.button className="w-5 h-5"
                                        whileHover={{ scale: 1.2 }}
                                    >
                                        <img src="/images/twitter.png" alt="twitter"/>
                                    </motion.button>
                                    <motion.button className="w-5 h-5"
                                        whileHover={{ scale: 1.2 }}
                                    >
                                        <img src="/images/linkedin.png" alt="linkedin"/>
                                    </motion.button>
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