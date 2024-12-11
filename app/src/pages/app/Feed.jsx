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
                    <CustomBox profile="Ludovica Spinelli" imgProfile="https://images.pexels.com/photos/12421204/pexels-photo-12421204.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" nickname="_luvi_" dataPost="5 minuti fa">
                        <p className="dark:text-dark">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum minus delectus, sed magni nemo debitis ipsam blanditiis saepe impedit veritatis maiores quaerat reiciendis eligendi nam quam error, tenetur accusantium officiis.</p>
                    </CustomBox>
                    {
                        allPosts.map(post => (
                            <CustomBox 
                                profile={post.from.first_name + " " + post.from.last_name} 
                                imgProfile="https://images.pexels.com/photos/12421204/pexels-photo-12421204.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                                nickname="_luvi_" 
                                dataPost="5 minuti fa"
                            >
                                <p className="dark:text-dark w-full break-all post-p" dangerouslySetInnerHTML={{ __html: post.html }}></p>
                            </CustomBox>
                        ))
                    }
                </div>
                <div className="w-full lg:max-w-[360px] 2xl:max-w-[450px]">
                    <Widget title={"Eventi Suggeriti"} wgt={widget.events} role={user.role}/>
                </div>
            </div>
        </>
    )
}

export default Feed