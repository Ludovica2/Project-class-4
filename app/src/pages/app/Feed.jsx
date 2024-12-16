import { useEffect } from "react"
import PostEditing from "../../components/PostEditing";
import CustomBox from "../../components/shared/CustomBox";
import Widget from "../../components/shared/Widget";
import { useDispatch, useSelector } from "react-redux";
import SDK from "../../SDK";
import { setAllPosts } from "../../store/slices/postSlice";

const widget = {
    events: "events",
}

const Feed = () => {
    const dispatch = useDispatch();
    const { user, token } = useSelector((state) => state.auth);
    const { all: allPosts } = useSelector((state) => state.posts);

    const fetchAllPosts = async () => {
        try {
            const posts = await SDK.post.getAll(token);

            dispatch(setAllPosts(posts));
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        document.title = "Feed - Found!";

        fetchAllPosts();
    }, []);

    return (
        <>
            <div className="flex gap-6">
                <div className="w-full md:max-w-[640px] xl:max-w-[660px] 2xl:max-w-[830px]">
                    <PostEditing onNewPost={fetchAllPosts} />
                    {
                        allPosts.map(post => (
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
                <div className="w-full lg:max-w-[360px] 2xl:max-w-[450px]">
                    <div className="sticky top-4">
                        <Widget title={"Eventi Suggeriti"} wgt={widget.events} role={user.role}/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Feed