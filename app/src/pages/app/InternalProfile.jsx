import { useEffect, useState } from "react"
import PostEditing from "../../components/PostEditing";
import Widget from "../../components/shared/Widget";
import { motion } from "framer-motion"
import { Link, useParams } from "react-router-dom";
import ImageModal from "../../components/shared/ImageModal";
import { useDispatch, useSelector } from "react-redux";
import CustomActiveSocial from "../../components/shared/CustomActiveSocial";
import { getSocialActive } from "../../utilities/settings";
import { setCurrentProfileReviews } from "../../store/slices/reviewSlice";
import { setCurrentProfileId } from "../../store/slices/settingsSlice";
import SDK from "../../SDK";
import { toast } from "react-toastify";
import CustomBox from "../../components/shared/CustomBox";
import { useDictionary } from "../../provider/Language";
import { formatRatingNumner } from "../../utilities/formData";


const widget = {
    events: "events",
    city: "city",
    review: "review"
}

const InternalProfile = () => {
    const dispatch = useDispatch();
    const [dictionary] = useDictionary()
    const { user, token } = useSelector((state) => state.auth);
    const { social } = useSelector((state) => state.settings);
    const [posts, setPosts] = useState([]);
    const { currentProfileReviews } = useSelector((state) => state.review);
    const socialActive = getSocialActive(social);

    const fetchPosts = async () => {
        try {
            const _posts = await SDK.post.getAllProfile(user._id, token);
            setPosts(_posts);
        } catch (error) {
            console.log(error);
            toast.error("Post non trovati");
        }
    }

    const fetchReviews = async () => {
        try {
            const reviews = await SDK.profile.getAllReviews(user._id, token);
            dispatch(setCurrentProfileReviews(reviews))
        } catch (error) {
            console.log(error);
            toast.error("Reviews non trovate");
        }
    }

    useEffect(() => {
        if (user) {
            dispatch(setCurrentProfileId(user._id));
            fetchPosts();
            fetchReviews();
        }
    }, [user]);

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
                                                <div className="flex gap-2 items-center">
                                                    <h2 className="text-xl dark:text-slate-100">{user.metadata.company_name}</h2>
                                                    <i className="fa-solid fa-certificate text-primaryColor"></i>
                                                </div>
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
                                                            {dictionary.profile.EDIT_P}
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
                                                            {dictionary.profile.SETTING}
                                                            <div className="arrow-tooltip arrow-tlt-bottom dark:bg-elements_dark dark:text-elements_dark"></div>
                                                        </div>
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="">
                                            <p className="m-2 dark:text-slate-100">{dictionary.settings.TITLE_SOCIAL}</p>
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
                                                <span className="font-bold dark:text-slate-300">Posts</span>
                                                <span className="text-center text-dark">20</span>
                                            </div>
                                        </li>
                                        <li className="border-r border-r-slate-100 px-8 py-4 max-md:px-5 max-md:py-2">
                                            <div className="flex flex-col">
                                                <span className="font-bold dark:text-slate-300">{dictionary.profile.EVENTS}</span>
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
                                                <span className="font-bold dark:text-slate-300">{dictionary.profile.FOLLOWING}</span>
                                                <span className="text-center text-dark">50</span>
                                            </div>
                                        </li>
                                        <li className=" px-8 py-4 max-md:px-5 max-md:py-2">
                                            <div className="flex flex-col">
                                                <span className="font-bold dark:text-slate-300">{dictionary.profile.PLACES}</span>
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
                <div className="flex gap-8 max-lg:flex-col">
                    <div className="w-1/4 max-lg:flex max-lg:w-full max-lg:justify-evenly">
                        <Widget title={dictionary.profile.EVENTS_} wgt={widget.events} role={user.role} />
                        {
                            user.role == "user" ? (
                                <Widget title={dictionary.profile.VISITED} wgt={widget.city} />
                            ) : (
                                <Widget title={dictionary.profile.REVIEWS} show={3} wgt={widget.review} role={user.role} val_review={
                                    <span className="text-dark">{formatRatingNumner(currentProfileReviews?.reduce((prev, curr) => prev + curr.rating, 0) / currentProfileReviews?.length)} <i className="fa-solid fa-star text-yellow-300"></i>
                                        <span className="text-slate-500 ml-1">({currentProfileReviews?.length})</span>
                                    </span>
                                } />
                            )
                        }
                    </div>
                    <div className="w-full">
                        <div className="w-full md:max-w-[640px] xl:max-w-[660px] 2xl:max-w-[830px]">
                            <PostEditing />
                            {
                                posts?.map(post => (
                                    <CustomBox
                                        key={post._id}
                                        imgProfile={post.from.avatar}
                                        nickname={post.from.nickname}
                                        dataPost="5 minuti fa"
                                        post={post}
                                    >
                                        <p className="dark:text-dark w-full post-p" dangerouslySetInnerHTML={{ __html: post.html }}></p>
                                    </CustomBox>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default InternalProfile