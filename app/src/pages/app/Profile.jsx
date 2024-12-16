import { useEffect, useState } from "react"
import PostEditing from "../../components/PostEditing";
import Widget from "../../components/shared/Widget";
import { motion } from "framer-motion"
import { Link } from "react-router-dom";
import ImageModal from "../../components/shared/ImageModal";
import { useSelector } from "react-redux";
import CustomActiveSocial from "../../components/shared/CustomActiveSocial";
import { getSocialActive } from "../../utilities/settings";

const widget = {
    events: "events",
    city: "city",
    review: "review"
}

const Profile = ({ isExternal = false }) => {
    const { user, token } = useSelector((state) => state.auth);
    const { social } = useSelector((state) => state.settings);
    const [follow, setFollow] = useState(false);
    const [blockUser, setBlockUser] = useState(false);

    const socialActive = getSocialActive(social);

    const handleFollow = () => {
        setFollow((follow) => !follow);
    }

    const handleBlockUser = () => {
        setBlockUser((blockUser) => !blockUser);
        setFollow(false);
    }

    useEffect(() => {
        document.title = "Profile - Found!";
    }, []);

    return (
        <>
            <div className="flex flex-col my-7 w-full max-w-[1280px] lg:max-w-[1320px]">
                <div className="flex relative bg-white rounded-lg shadow m-5 dark:bg-elements_dark dark:shadow-slate-600">
                    <div className="flex justify-center items-center w-32 h-32 absolute -top-11 -left-3 bg-white rounded-[50%] shadow dark:bg-elements_dark dark:shadow-slate-400">
                        {/* Modal */}
                        {
                            <ImageModal images={[`${user.avatar}?token=${token}`]}>
                                {
                                    (setIsShowModal) => {
                                        return <img crossOrigin="anonymous" className='imgProfile cursor-pointer' onClick={() => setIsShowModal(true)} src={`${user.avatar}?token=${token}`} alt="Profile" />
                                    }
                                }
                            </ImageModal>
                        }
                    </div>
                    <div className="flex flex-col w-full ">
                        <div className="flex justify-between flex-1 w-full pl-32 p-3">
                            <div className="flex flex-col w-full">
                                <div className="flex justify-between mb-3">
                                    <div>
                                        {
                                            user.role == "user" ? (
                                                <h2 className="text-xl dark:text-slate-100">{`${user.first_name} ${user.last_name}`}</h2>
                                            ) : (
                                                <h2 className="text-xl dark:text-slate-100">{user.metadata.company_name}</h2>
                                            )
                                        }
                                        <span className="ml-1  mb-2 text-sm font-bold dark:text-slate-300">@{user.nickname}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="flex gap-1 justify-end">
                                            {
                                                isExternal ? <div className=" mr-2">

                                                    <button className="relative btn-tooltip" onClick={handleBlockUser}>
                                                        {
                                                            blockUser ? <>
                                                                <i className="fa-solid fa-user-check text-text_primaryColor dark:text-gray-500"></i>
                                                                <div className="tooltip-container tooltip-bottom dark:bg-elements_dark dark:text-slate-400">
                                                                    Sblocca Utente
                                                                    <div className="arrow-tooltip arrow-tlt-bottom dark:bg-elements_dark dark:text-elements_dark"></div>
                                                                </div>
                                                            </> : <>
                                                                <i className="fa-solid fa-user-xmark text-text_primaryColor dark:text-gray-500"></i>
                                                                <div className="tooltip-container tooltip-bottom dark:bg-elements_dark dark:text-slate-400">
                                                                    Blocca Utente
                                                                    <div className="arrow-tooltip arrow-tlt-bottom dark:bg-elements_dark dark:text-elements_dark"></div>
                                                                </div>
                                                            </>
                                                        }

                                                    </button>

                                                </div> : <>
                                                    <div className=" mr-2">
                                                        <Link to="/app/profile/editprofile">
                                                            <button className="relative btn-tooltip">
                                                                <i className="fa-solid fa-user-pen text-text_primaryColor dark:text-gray-500"></i>
                                                                <div className="tooltip-container tooltip-bottom dark:bg-elements_dark dark:text-slate-400">
                                                                    Modifica Profilo
                                                                    <div className="arrow-tooltip arrow-tlt-bottom dark:bg-elements_dark dark:text-elements_dark"></div>
                                                                </div>
                                                            </button>
                                                        </Link>
                                                    </div>
                                                    <div className="mr-2">
                                                        <Link to="/app/profile/settingsprofile">
                                                            <button className="relative btn-tooltip">
                                                                <i className="fa-solid fa-gear text-text_primaryColor dark:text-gray-500"></i>
                                                                <div className="tooltip-container tooltip-bottom dark:bg-elements_dark dark:text-slate-400">
                                                                    Impostazioni
                                                                    <div className="arrow-tooltip arrow-tlt-bottom dark:bg-elements_dark dark:text-elements_dark"></div>
                                                                </div>
                                                            </button>
                                                        </Link>
                                                    </div>
                                                </>
                                            }
                                        </div>
                                        <div className="">
                                            <p className="m-2 dark:text-slate-100">Altri Social</p>
                                            <div className="flex gap-1">
                                                {
                                                    socialActive && (
                                                        socialActive.map(({ image, title, content }) => (
                                                            <CustomActiveSocial key={title} src={image} title={title} content={content} />
                                                        ))
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex">
                                    <ul className="flex justify-center w-full">
                                        <li className="border-r border-r-slate-100 px-8 py-4 max-md:p-4">
                                            <div className="flex flex-col justify-center">
                                                <span className="font-bold dark:text-slate-300">Post</span>
                                                <span className="text-center text-dark">20</span>
                                            </div>
                                        </li>
                                        <li className="border-r border-r-slate-100 px-8 py-4 max-md:p-4">
                                            <div className="flex flex-col">
                                                <span className="font-bold dark:text-slate-300">Eventi</span>
                                                <span className="text-center text-dark">5</span>
                                            </div>
                                        </li>
                                        <li className="border-r border-r-slate-100 px-8 py-4 max-md:p-4">
                                            <div className="flex flex-col">
                                                <span className="font-bold dark:text-slate-300">Follower</span>
                                                <span className="text-center text-dark">50</span>
                                            </div>
                                        </li>
                                        <li className="border-r border-r-slate-100 px-8 py-4 max-md:p-4">
                                            <div className="flex flex-col">
                                                <span className="font-bold dark:text-slate-300">Seguiti</span>
                                                <span className="text-center text-dark">50</span>
                                            </div>
                                        </li>
                                        <li className=" px-8 py-4 max-md:p-4">
                                            <div className="flex flex-col">
                                                <span className="font-bold dark:text-slate-300">Luoghi</span>
                                                <span className="text-center text-dark">9</span>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                {
                                    isExternal && (
                                        <div className=" flex my-3">
                                            <button onClick={handleFollow} className="btn w-2/3" disabled={blockUser}>
                                                {
                                                    follow ? <>
                                                        <i className="fa-solid fa-user-minus text-white mr-2"></i>
                                                        <span className="text-white">Non seguire più</span>
                                                    </> : <>
                                                        <i className="fa-solid fa-user-plus text-white mr-2"></i>
                                                        <span className="text-white">Segui</span>
                                                    </>
                                                }
                                            </button>
                                            <Link to={"/app/chat"} target="_blank" className="w-2/3">
                                                <button className="w-full px-4 py-2 end-2.5 bottom-2.5 font-medium border border-slate-300 rounded-lg text-[#767d89] hover:bg-slate-100 ml-3 dark:text-slate-300 dark:bg-zinc-600 dark:hover:bg-zinc-700 dark:hover:border-none">
                                                    <i className="fa-solid fa-comments mr-2 text-secondaryColor"></i>
                                                    Messaggio</button>
                                            </Link>
                                        </div>
                                    )
                                }
                            </div>

                        </div>
                        {
                            user.bio && (
                                <div className="flex flex-col w-full">
                                    <hr className="mx-6 border-slate-100" />
                                    <div className="py-6 px-10 text-dark">
                                        {user.bio}
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className="flex gap-4">
                    {
                        blockUser ? <div className="w-full h-24 flex justify-center items-center text-2xl bg-white rounded-lg shadow m-5 dark:bg-elements_dark dark:shadow-slate-600">
                            <span className="text-slate-600">Sblocca questo utente per vedere i suoi contenuti</span>
                        </div> : <>
                            <div className="w-1/4 max-md:hidden">
                                <Widget title={"Eventi in Programma"} wgt={widget.events} role={user.role} />
                                {
                                    user.role == "user" ? (
                                        <Widget title={"Luoghi Visitati"} wgt={widget.city} />
                                    ) : (
                                        <Widget title={"Recensioni"} wgt={widget.review} role={user.role} val_review={
                                            <span>4,5 <i className="fa-solid fa-star text-yellow-300"></i></span>
                                        } />
                                    )
                                }
                            </div>
                            <div className="w-full">
                                <div className="flex justify-center flex-1">
                                    <PostEditing />
                                </div>
                            </div>
                        </>
                    }
                </div>
            </div>
        </>
    )
}

export default Profile