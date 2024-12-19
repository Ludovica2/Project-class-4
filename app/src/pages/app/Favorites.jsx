import { useEffect, useState } from "react"
import PostEditing from "../../components/PostEditing";
import CustomBox from "../../components/shared/CustomBox";
import Widget from "../../components/shared/Widget";
import { useDispatch, useSelector } from "react-redux";
import SDK from "../../SDK";
import { setAllPosts } from "../../store/slices/postSlice";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useDictionary } from "../../provider/Language";

const widget = {
    events: "events",
}

const Favorites = () => {
    const [dictionary] = useDictionary()
    const { user, token } = useSelector((state) => state.auth);
    const [posts, setPosts] = useState(null);

    const fetchFavoritePosts = async () => {
        try {
            const results = await SDK.post.favorites.getAll(token);
            console.log(results)
            setPosts(results);
        } catch (error) {
            console.log(error);
            toast.error("Posts non trovati");
        }
    }

    useEffect(() => {
        document.title = "Favorites - Found!";

        fetchFavoritePosts();
    }, []);

    return (
        <>
        {
            posts && posts.map(({ post }) => (
                <div className="flex gap-6">
                    <div className="w-full min-w-[640px] md:max-w-[640px] xl:max-w-[660px] 2xl:max-w-[830px]">
                        <CustomBox
                            key={post._id}
                            profile={post.from.first_name + " " + post.from.last_name} 
                            imgProfile={post.from.avatar}
                            nickname={post.from.nickname} 
                            dataPost="5 minuti fa"
                            post={post}
                        >
                            <p className="dark:text-dark w-full post-p" dangerouslySetInnerHTML={{ __html: post.html }}></p>
                        </CustomBox>
                    </div>
                    <div className="w-full lg:max-w-[360px] 2xl:max-w-[450px] opacity-0 invisible pointer-events-none">
                        <Widget title={dictionary.profile.SUGG_EVENTS} wgt={widget.events} role={user.role}/>
                    </div>
                </div>
            ))
        }
            
        </>
    )
}

export default Favorites;