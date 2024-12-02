import { useEffect } from "react"
import ButtonBack from "../../components/ButtonBack";

const Chat = () => {
    useEffect(() => {
        document.title = "Chat - Found!";
}, []);
return (
    <>
        <ButtonBack to={"/app/feed"} />
        <h1>Chat</h1>
        <p>hello world</p>
    </>
)
}

export default Chat