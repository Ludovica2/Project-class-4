import { useEffect, useState } from "react"
import PostEditing from "../../components/PostEditing";
import Widget from "../../components/shared/Widget";
import { motion } from "framer-motion"
import { Link, useParams } from "react-router-dom";
import ImageModal from "../../components/shared/ImageModal";
import { useDispatch, useSelector } from "react-redux";
import CustomActiveSocial from "../../components/shared/CustomActiveSocial";
import { getSocialActive } from "../../utilities/settings";
import SDK from "../../SDK";
import { toast } from "react-toastify";
import CustomBox from "../../components/shared/CustomBox";
import { setRooms } from "../../store/slices/chatSlice";
import Drawer from "../../components/shared/Drawer";
import { setCurrentProfileReviews } from "../../store/slices/reviewSlice";
import { setCurrentProfileId } from "../../store/slices/settingsSlice";

const widget = {
    events: "events",
    city: "city",
    review: "review"
}

const ExternalProfile = () => {
    const dispatch = useDispatch();
    const { nickname } = useParams();
    const { rooms } = useSelector((state) => state.chat);
    const { currentProfileReviews } = useSelector((state) => state.review);
    const { token, user: currentUser } = useSelector((state) => state.auth);
    const { social } = useSelector((state) => state.settings);
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [follow, setFollow] = useState(false);
    const [blockUser, setBlockUser] = useState(false);

    const socialActive = getSocialActive(social);

    const formatRatingNumner = (number) => {
        return number.toFixed(1).replace(".", ",");
    }

    const handleFollow = async () => {
        try {
            if (follow) {
                await SDK.followers.unfollow(user._id, token);
                setFollow(false);
            } else {
                await SDK.followers.follow(user._id, token);
                setFollow(true);
            }
        } catch (error) {
            console.log(error);
            toast.error("Errore durante l'operazione");
        }
    }

    const handleBlockUser = () => {
        setBlockUser((blockUser) => !blockUser);
        setFollow(false);
    }

    const fetchUser = async () => {
        try {
            const user = await SDK.users.getUser(nickname, token);
            setUser(user);
        } catch (error) {
            console.log(error);
            toast.error("Utente non trovato");
        }
    }

    const fetchPosts = async () => {
        try {
            const _posts = await SDK.post.getAllProfile(user._id, token);
            setPosts(_posts);
        } catch (error) {
            console.log(error);
            toast.error("Post non trovati");
        }
    }

    const fetchData = async () => {
        await fetchUser();
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

    const fetchRooms = async () => {
        // fetch rooms from the server
        const rooms = await SDK.chat.getRooms(token);

        dispatch(setRooms(rooms));
    }

    const handleCreateRoom = async () => {
        const room = rooms.find(({ users }) => {
            return users.includes(user._id) && users.includes(currentUser._id);
        });

        try {

            if (!room) {
                await SDK.chat.createRoom({ to: user._id }, token);
                await fetchRooms();
            }

            window.open("/app/chat", "__blank");
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    useEffect(() => {
        document.title = "Profile - Found!";

        fetchData();
    }, []);

    useEffect(() => {
        if (user) {
            dispatch(setCurrentProfileId(user._id));
            const isFollowing = user.followers.find(follower => follower.follower._id == currentUser._id);
            setFollow(isFollowing);
            fetchPosts();
            fetchReviews();
        }
    }, [user]);

    return (
        <>
            {
                user && (
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
                                <div className="flex justify-between flex-1 ml-32 p-3">
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
                                                    <div className=" mr-2">

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
                                        <div className=" flex w-3/4 my-3 gap-3 max-md:w-full">
                                            <button onClick={handleFollow} className="btn w-1/2" disabled={blockUser}>
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
                                            <Link to={"/app/chat"} target="_blank" className="w-1/2">
                                                <button onClick={handleCreateRoom} className="w-full px-4 py-2 end-2.5 bottom-2.5 font-medium border border-slate-300 rounded-lg text-[#767d89] hover:bg-slate-100  dark:text-slate-300 dark:bg-zinc-600 dark:hover:bg-zinc-700 dark:hover:border-none">
                                                    <i className="fa-solid fa-comments mr-2 text-secondaryColor"></i>
                                                    Messaggio
                                                </button>
                                            </Link>
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
                            {
                                blockUser ? <div className="w-full h-24 flex justify-center items-center text-2xl bg-white rounded-lg shadow m-5 dark:bg-elements_dark dark:shadow-slate-600">
                                    <span className="text-slate-600">Sblocca questo utente per vedere i suoi contenuti</span>
                                </div> : <>
                                    <div className="w-1/4 max-lg:w-full">
                                        <div className="sticky top-4 max-lg:flex max-lg:justify-evenly">
                                            <Widget title={"Eventi in Programma"} wgt={widget.events} role="user" />
                                            {
                                                user.role == "user" ? (
                                                    <Widget title={"Luoghi Visitati"} wgt={widget.city} />
                                                ) : (
                                                    <Widget title={"Recensioni"} show={3} wgt={widget.review} role={user.role} val_review={
                                                        <span>{formatRatingNumner(currentProfileReviews?.reduce((prev, curr) => prev + curr.rating, 0) / currentProfileReviews?.length)} ({currentProfileReviews?.length}) <i className="fa-solid fa-star text-yellow-300"></i></span>
                                                    } />
                                                )
                                            }
                                        </div>
                                    </div>
                                    <div className="w-full">
                                        <div className="w-full md:max-w-[640px] xl:max-w-[660px] 2xl:max-w-[830px]">
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
                                </>
                            }
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default ExternalProfile