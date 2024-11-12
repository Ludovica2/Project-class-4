import { useEffect } from "react"
import PostEditing from "../../components/PostEditing";

const Feed = () => {
    useEffect(() => {
        document.title = "Feed - Found!";
}, []);
return (
    <>
        <h1>Feed</h1>
        <p>hello world</p>
        <PostEditing/>
    </>
)
}

export default Feed