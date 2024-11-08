import { useEffect } from "react"

const Feed = () => {
    useEffect(() => {
        document.title = "Feed - Found!";
}, []);
return (
    <>
        <h1>Feed</h1>
        <p>hello world</p>
    </>
)
}

export default Feed