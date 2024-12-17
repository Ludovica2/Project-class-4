import { useEffect, useState } from "react"
import PostEditing from "../../components/PostEditing";
import Widget from "../../components/shared/Widget";
import { motion } from "framer-motion"
import { Link, useParams } from "react-router-dom";
import ImageModal from "../../components/shared/ImageModal";
import { useSelector } from "react-redux";
import CustomActiveSocial from "../../components/shared/CustomActiveSocial";
import { getSocialActive } from "../../utilities/settings";

const widget = {
    events: "events",
    city: "city",
    review: "review"
}

const InternalProfile = () => {
    const { user, token } = useSelector((state) => state.auth);
    const { social } = useSelector((state) => state.settings);
    const socialActive = getSocialActive(social);

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
                            <ImageModal images={[user.avatar]} token={token}>
                                {
                                    (setIsShowModal) => {
                                        return <div style={{ backgroundImage: `url(${user.avatar}?token=${token})` }} onClick={() => setIsShowModal(true)} className="imgProfile cursor-pointer bg-cover bg-center"></div>
                                    }
                                }
                            </ImageModal>
                        }
                    </div>
                    <div className="flex flex-col w-full ">
                        <div className="flex justify-between flex-1 pl-32 p-3">
                            <div className="flex flex-col w-full gap-2">
                                <div className="flex justify-between">
                                    <div className="flex flex-col">
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
                                            <div className="mr-2">
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
                                    <ul className="flex w-full">
                                        <li className="border-r border-r-slate-100 px-8 py-4 max-md:px-5 max-md:py-2">
                                            <div className="flex flex-col justify-center">
                                                <span className="font-bold dark:text-slate-300">Post</span>
                                                <span className="text-center text-dark">20</span>
                                            </div>
                                        </li>
                                        <li className="border-r border-r-slate-100 px-8 py-4 max-md:px-5 max-md:py-2">
                                            <div className="flex flex-col">
                                                <span className="font-bold dark:text-slate-300">Eventi</span>
                                                <span className="text-center text-dark">5</span>
                                            </div>
                                        </li>
                                        <li className="border-r border-r-slate-100 px-8 py-4 max-md:px-5 max-md:py-2">
                                            <div className="flex flex-col">
                                                <span className="font-bold dark:text-slate-300">Follower</span>
                                                <span className="text-center text-dark">50</span>
                                            </div>
                                        </li>
                                        <li className="border-r border-r-slate-100 px-8 py-4 max-md:px-5 max-md:py-2">
                                            <div className="flex flex-col">
                                                <span className="font-bold dark:text-slate-300">Seguiti</span>
                                                <span className="text-center text-dark">50</span>
                                            </div>
                                        </li>
                                        <li className=" px-8 py-4 max-md:px-5 max-md:py-2">
                                            <div className="flex flex-col">
                                                <span className="font-bold dark:text-slate-300">Luoghi</span>
                                                <span className="text-center text-dark">9</span>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
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
                <div className="flex gap-4 max-lg:flex-col">
                    <div className="w-1/4 max-lg:flex max-lg:w-full max-lg:justify-evenly">
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
                </div>
            </div >
        </>
    )
}

export default InternalProfile